"use server";

import { prisma } from "@/lib/prisma";

export async function generateExperimentBrief(opportunityId: string) {
  const opportunity = await prisma.opportunity.findUnique({
    where: { id: opportunityId }
  });

  if (!opportunity) throw new Error("Opportunity not found");

  const existing = await prisma.experimentBrief.findFirst({
    where: { opportunityId }
  });

  if (existing) return { success: true, brief: existing };

  const systemPrompt = `
You are a Senior CRO Consultant. Generate a professional A/B test experiment brief based on the given opportunity.
Return JSON with the following keys:
- hypothesis (string)
- problemStatement (string)
- evidence (string)
- proposedSolution (string)
- primaryMetric (string)
- secondaryMetrics (array of strings)
- successCriteria (string)
- implementationSteps (array of strings)
- riskAssessment (string)
- estimatedTimeline (string)
- experimentPriority (string)
- expectedRevenueImpact (number)
`;

  let parsed: any = {};
  
  try {
    const prompt = `${systemPrompt}\n\nOpportunity Details:\n${JSON.stringify(opportunity, null, 2)}`;
    
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "openai",
        jsonMode: true
      }),
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch from free AI");
    }
    
    let text = await response.text();
    
    // Extract JSON robustly
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      text = text.substring(startIndex, endIndex + 1);
    }
    
    parsed = JSON.parse(text);
  } catch (error: any) {
    console.warn("AI error during experiment generation, falling back to mock data:", error.message);
    // Fallback logic
    parsed = {
        hypothesis: `If we implement ${opportunity.recommendedSolution}, we will see an increase in conversion rate because it directly addresses the friction: "${opportunity.evidence}"`,
        problemStatement: opportunity.explanation,
        evidence: opportunity.evidence,
        proposedSolution: opportunity.recommendedSolution,
        primaryMetric: "Conversion Rate (%)",
        secondaryMetrics: ["Bounce Rate (%)", "Average Order Value ($)"],
        successCriteria: `A statistically significant increase in Conversion Rate with a minimum 95% confidence level.`,
        implementationSteps: [
          "Identify CSS selectors for the target elements on the page.",
          "Implement the visual variations using custom JS/CSS in the A/B testing tool.",
          "Set up event tracking for the main CTA and secondary clicks.",
          "Launch the experiment targeting 100% of mobile and desktop traffic.",
          "Monitor the experiment metrics daily for any anomalies."
        ],
        riskAssessment: "Low - changes are styling and trust badges, low chance of breaking checkout functionality.",
        estimatedTimeline: "1-2 weeks of development and 2-4 weeks of running the test.",
        experimentPriority: "High",
        expectedRevenueImpact: Math.round(opportunity.expectedConversionLift * 2500)
      };
  }

  const brief = await prisma.experimentBrief.create({
    data: {
      hypothesis: parsed.hypothesis || "",
      problemStatement: parsed.problemStatement || "",
      evidence: parsed.evidence || opportunity.evidence,
      proposedSolution: parsed.proposedSolution || opportunity.recommendedSolution,
      primaryMetric: parsed.primaryMetric || "Conversion Rate",
      secondaryMetrics: JSON.stringify(parsed.secondaryMetrics || []),
      successCriteria: parsed.successCriteria || "",
      implementationSteps: JSON.stringify(parsed.implementationSteps || []),
      riskAssessment: parsed.riskAssessment || "Low",
      estimatedTimeline: parsed.estimatedTimeline || "2 weeks",
      experimentPriority: parsed.experimentPriority || "High",
      expectedRevenueImpact: Number(parsed.expectedRevenueImpact) || 0,
      opportunityId: opportunity.id
    }
  });

  return { success: true, brief };
}
