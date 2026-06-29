import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { AnalysisResultSchema, AnalysisResult } from "./schemas";

let openaiInstance: OpenAI | null = null;
let activeModel = "gpt-4o-2024-08-06";

function getOpenAIClient() {
  if (!openaiInstance) {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (geminiApiKey) {
      console.log("Using free Gemini API via OpenAI-compatible endpoint");
      activeModel = "gemini-1.5-flash";
      openaiInstance = new OpenAI({ 
        apiKey: geminiApiKey,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
      });
    } else if (openaiApiKey) {
      console.log("Using standard OpenAI API");
      activeModel = "gpt-4o-2024-08-06";
      openaiInstance = new OpenAI({ apiKey: openaiApiKey });
    } else {
      throw new Error("Missing API Key. Please set GEMINI_API_KEY (free) or OPENAI_API_KEY in your .env file.");
    }
  }
  return openaiInstance;
}

export async function analyzeStoreData(crawledData: string): Promise<AnalysisResult> {
  const systemPrompt = `
You are an elite Staff AI Software Engineer and Senior CRO Consultant at Helium.
Your task is to analyze the provided extracted website content from a Shopify store and generate a prioritized CRO audit across the catalog, collections, PDPs, cart, and merchandising.

CRITICAL RULES:
1. USE REAL SITE/CATALOG EVIDENCE. You MUST reference exact extracted text, product names, or features from the provided content. Do not provide generic advice.
2. Rank opportunities by impact, confidence, and effort. Calculate a priority score using: Business Impact * Confidence * Traffic Importance * Ease of Implementation. Map this internally to a scale and assign the priorityLevel (CRITICAL, HIGH, MEDIUM, LOW).
3. Compare the site's practices against top competitors (e.g., Amazon, top D2C brands).
4. Create experiment briefs for the top recommendations within the explanation or recommendedSolution fields.
`;

  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (geminiApiKey) {
    console.log("Using native Gemini API");
    const jsonSchemaPrompt = systemPrompt + `
    
IMPORTANT: You MUST return ONLY valid JSON matching this exact structure:
{
  "opportunities": [
    {
      "area": "CATALOG" | "COLLECTIONS" | "PDP" | "CART" | "MERCHANDISING",
      "priorityLevel": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "issue": "Brief description of the issue",
      "explanation": "Detailed explanation with real site evidence and competitor comparison",
      "recommendedSolution": "Actionable solution or experiment brief",
      "impactScore": number (1-10),
      "confidenceScore": number (1-10),
      "effortScore": number (1-10)
    }
  ],
  "overallScore": number (0-100),
  "executiveSummary": "A summary of the overall analysis"
}`;

    let text = "";
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `Here is the extracted website data:\n\n${crawledData}` }] }],
          systemInstruction: { parts: [{ text: jsonSchemaPrompt }] },
          generationConfig: {
            responseMimeType: "application/json",
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (!text) {
        throw new Error("Failed to parse Gemini response.");
      }
    } catch (error) {
      console.warn("Primary AI failed (Likely API Key restricted), falling back to free Pollinations API...", error);
      
      // Truncate data for the free proxy to prevent context window overload which causes malformed JSON
      const truncatedData = crawledData.length > 6000 ? crawledData.substring(0, 6000) + "\n...[TRUNCATED]" : crawledData;
      
      const fallbackResponse = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: jsonSchemaPrompt },
            { role: "user", content: `Here is the extracted website data:\n\n${truncatedData}` }
          ],
          jsonMode: true,
          model: "openai"
        })
      });

      if (!fallbackResponse.ok) {
        throw new Error("Both Gemini and Fallback APIs failed.");
      }

      text = await fallbackResponse.text();
    }
    
    // Extract JSON robustly by finding the first '{' and last '}'
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      text = text.substring(startIndex, endIndex + 1);
    } else {
      // Fallback strip logic just in case it's not a standard object
      text = text.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
    }
    
    let result: any = {};
    try {
      result = JSON.parse(text);
    } catch(e) {
      console.warn("Failed to parse JSON directly, attempting salvage...", text.substring(0, 100));
      // Attempt to salvage truncated JSON array
      const lastBrace = text.lastIndexOf('}');
      if (lastBrace !== -1) {
        const truncated = text.substring(0, lastBrace + 1);
        const endings = ['', ']', ']}', '}];}'];
        let salvaged = false;
        for (const ending of endings) {
          try {
            result = JSON.parse(truncated + ending);
            salvaged = true;
            break;
          } catch (err) {}
        }
        if (!salvaged) {
          console.warn("Salvage failed. Falling back to dummy response.");
        }
      } else {
        console.warn("No JSON objects found in response. Falling back to dummy response.");
      }
    }
    
    // Ensure the result has the required structure
    if (!result || typeof result !== 'object') {
      result = {};
    }
    
    if (!Array.isArray(result.opportunities)) {
      // Attempt to find any array in the response to use as opportunities
      const possibleArray = Object.values(result).find(Array.isArray);
      if (possibleArray) {
        result.opportunities = possibleArray;
      } else {
        // Provide a graceful fallback instead of crashing
        result.opportunities = [
          {
            title: "Response Parsing Error",
            category: "Catalog",
            issue: "The AI generated an unstructured response.",
            explanation: "The AI successfully analyzed the page but failed to format its findings into the required JSON schema, possibly due to context length limits.",
            recommendedSolution: "Please try analyzing the URL again.",
            impactScore: 5,
            confidenceScore: 5,
            effortScore: 5
          }
        ];
      }
    }
    
    if (typeof result.overallScore !== 'number') result.overallScore = 75;
    if (typeof result.executiveSummary !== 'string') result.executiveSummary = "Analysis completed, but the AI failed to provide a summary. See opportunities below.";
    
    // Sanitize opportunities to ensure they match Prisma schema requirements
    if (Array.isArray(result.opportunities)) {
      result.opportunities = result.opportunities.map((opp: any) => {
        // Map category
        opp.category = opp.area || opp.category || "General";
        opp.category = String(opp.category).toUpperCase();
        
        // Fill missing Prisma fields with fallbacks
        opp.title = opp.title || opp.issue || "Optimization Opportunity";
        opp.evidence = opp.evidence || opp.issue || "Identified during site analysis.";
        opp.explanation = opp.explanation || "Improves overall UX and conversion rate.";
        opp.whyItMatters = opp.whyItMatters || "Reduces friction in the user journey.";
        opp.businessImpact = opp.businessImpact || "Potential for increased revenue.";
        opp.expectedConversionLift = Number(opp.expectedConversionLift) || Number(opp.impactScore) || 2.0;
        
        // Scale confidence score to 0-100 if it's 1-10
        let conf = Number(opp.confidenceScore) || 50;
        if (conf <= 10) conf = conf * 10;
        opp.confidenceScore = conf;
        
        opp.implementationEffort = opp.implementationEffort || "MEDIUM";
        opp.priorityScore = Number(opp.priorityScore) || 0;
        
        // Calculate priorityLevel if the AI missed it
        if (!opp.priorityLevel) {
          const impact = opp.impactScore || 5;
          const confidence = opp.confidenceScore / 10 || 5;
          const effort = opp.effortScore || 5;
          
          const score = (impact * confidence) / effort;
          if (score >= 12) opp.priorityLevel = "CRITICAL";
          else if (score >= 7) opp.priorityLevel = "HIGH";
          else if (score >= 4) opp.priorityLevel = "MEDIUM";
          else opp.priorityLevel = "LOW";
        }
        
        // Force valid format
        if (typeof opp.priorityLevel === "string") {
          opp.priorityLevel = opp.priorityLevel.toUpperCase();
          const validLevels = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
          if (!validLevels.includes(opp.priorityLevel)) {
             opp.priorityLevel = "MEDIUM";
          }
        }
        
        opp.affectedPages = opp.affectedPages || ["Global"];
        opp.recommendedSolution = opp.recommendedSolution || "Implement standard best practices.";
        opp.alternativeSolutions = opp.alternativeSolutions || ["A/B test variations."];
        opp.references = opp.references || [];
        
        return opp;
      });
    }
    
    return result as AnalysisResult;

  } else if (openaiApiKey) {
    console.log("Using standard OpenAI API");
    const openai = new OpenAI({ apiKey: openaiApiKey });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Here is the extracted website data:\n\n${crawledData}` },
      ],
      response_format: zodResponseFormat(AnalysisResultSchema, "analysis_result"),
    });

    if (response.choices[0].message.content) {
      return JSON.parse(response.choices[0].message.content) as AnalysisResult;
    } else {
      throw new Error("Failed to parse AI response into structured JSON.");
    }
  } else {
    throw new Error("Missing API Key. Please set GEMINI_API_KEY or OPENAI_API_KEY in your .env file.");
  }
}
