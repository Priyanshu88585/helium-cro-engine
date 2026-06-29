import { z } from "zod";

export const OpportunitySchema = z.object({
  title: z.string().describe("A concise, action-oriented title for the CRO opportunity."),
  category: z.enum([
    "Homepage", "Navigation", "Collections", "Product Detail Pages", "Cart", 
    "Checkout", "Trust", "Reviews", "SEO", "Performance", "Accessibility", 
    "Mobile UX", "Pricing", "Urgency", "Social Proof", "Branding", "Search", 
    "Filters", "Merchandising", "Content", "Images", "Videos", "Product Information", 
    "Customer Journey", "Conversion Friction", "Retention Opportunities", 
    "Upsell Opportunities", "Cross Sell Opportunities"
  ]),
  evidence: z.string().describe("The specific observation from the website that supports this opportunity."),
  explanation: z.string().describe("Why this issue exists or what is lacking in the current implementation."),
  whyItMatters: z.string().describe("The psychological or UX reason this impacts conversions."),
  businessImpact: z.string().describe("A textual description of how this could impact revenue/conversions."),
  expectedConversionLift: z.number().min(0).max(100).describe("Expected percentage lift in conversion rate (e.g. 1.5)."),
  confidenceScore: z.number().min(0).max(100).describe("AI confidence in this recommendation (0-100)."),
  implementationEffort: z.enum(["LOW", "MEDIUM", "HIGH"]).describe("Estimated effort to implement."),
  priorityScore: z.number().describe("Internal calculated priority score. Can be 0 if recalculated later."),
  priorityLevel: z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]),
  affectedPages: z.array(z.string()).describe("List of pages or templates affected (e.g., ['Product Page', 'Cart'])."),
  recommendedSolution: z.string().describe("Detailed, actionable recommendation."),
  alternativeSolutions: z.array(z.string()).describe("1-2 alternative ways to solve the problem."),
  references: z.array(z.string()).describe("URLs or sections referenced.")
});

export const AnalysisResultSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("Overall CRO health score of the store."),
  opportunities: z.array(OpportunitySchema).describe("List of prioritized CRO opportunities.")
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
export type Opportunity = z.infer<typeof OpportunitySchema>;
