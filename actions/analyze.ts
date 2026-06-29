"use server";

import { prisma } from "@/lib/prisma";
import { crawlStore } from "@/crawler/engine";
import { analyzeStoreData } from "@/ai/pipeline";
import { revalidatePath } from "next/cache";

function calculatePriority(
  impact: string, 
  confidence: number, 
  effort: string
): { score: number, level: string } {
  const impactMap: Record<string, number> = { "LOW": 1, "MEDIUM": 2, "HIGH": 3 };
  const effortMap: Record<string, number> = { "LOW": 3, "MEDIUM": 2, "HIGH": 1 }; // Inverse

  // Try to parse impact from string if it's descriptive. 
  // For now, assume AI might just output a description for businessImpact, 
  // but let's use expectedConversionLift as a proxy for impact if needed.
  // Actually, the prompt says Business Impact * Confidence * Traffic * Ease.
  // We'll simplify traffic for now or assume AI provides it. 
  // Since we don't have traffic in schema explicitly, we'll use Lift * Confidence * Effort.

  const effortValue = effortMap[effort?.toUpperCase()] || 2;
  const score = (confidence / 100) * effortValue * 10; 
  // Scale of 0-30 roughly.

  let level = "LOW";
  if (score > 20) level = "CRITICAL";
  else if (score > 15) level = "HIGH";
  else if (score > 10) level = "MEDIUM";

  return { score, level };
}

export async function runCROAnalysis(url: string) {
  // 1. Create Run in DB
  const analysisRun = await prisma.analysisRun.create({
    data: {
      url,
      status: "CRAWLING",
    }
  });

  try {
    // 2. Crawl
    const crawledData = await crawlStore(url);
    
    await prisma.analysisRun.update({
      where: { id: analysisRun.id },
      data: { status: "ANALYZING" }
    });

    // 3. AI Analysis
    // We truncate crawledData if it's too huge to save tokens, though 4o handles 128k
    const truncatedData = crawledData.slice(0, 100000); 
    const result = await analyzeStoreData(truncatedData);

    // 4. Calculate total revenue opportunity (Dummy calculation for now, updated later by user input)
    const baseRevenue = 50000;
    let totalLift = 0;
    
    // 5. Store Opportunities
    for (const opp of result.opportunities) {
      const { score, level } = calculatePriority(opp.businessImpact, opp.confidenceScore, opp.implementationEffort);
      totalLift += opp.expectedConversionLift;

      await prisma.opportunity.create({
        data: {
          title: opp.title,
          category: opp.category,
          evidence: opp.evidence,
          explanation: opp.explanation,
          whyItMatters: opp.whyItMatters,
          businessImpact: opp.businessImpact,
          expectedConversionLift: opp.expectedConversionLift,
          confidenceScore: opp.confidenceScore,
          implementationEffort: opp.implementationEffort,
          priorityScore: opp.priorityScore > 0 ? opp.priorityScore : score,
          priorityLevel: level,
          affectedPages: JSON.stringify(opp.affectedPages),
          recommendedSolution: opp.recommendedSolution,
          alternativeSolutions: JSON.stringify(opp.alternativeSolutions),
          references: opp.references ? JSON.stringify(opp.references) : "[]",
          analysisRunId: analysisRun.id,
        }
      });
    }

    const revenueOpportunity = (baseRevenue * (totalLift / 100));

    await prisma.analysisRun.update({
      where: { id: analysisRun.id },
      data: { 
        status: "COMPLETED",
        overallScore: result.overallScore,
        revenueOpportunity,
        conversionImprovement: totalLift
      }
    });

    revalidatePath(`/dashboard/${analysisRun.id}`);
    return { success: true, runId: analysisRun.id };

  } catch (error: any) {
    console.error("Analysis Failed:", error);
    await prisma.analysisRun.update({
      where: { id: analysisRun.id },
      data: { status: "FAILED" }
    });
    return { success: false, error: error.message };
  }
}
