"use client";

import { useState } from "react";
import { Opportunity } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Target, Zap, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateExperimentBrief } from "@/actions/experiment";

export default function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefGenerated, setBriefGenerated] = useState(false);

  const getBadgeColor = (level: string) => {
    switch(level) {
      case "CRITICAL": return "destructive";
      case "HIGH": return "default";
      case "MEDIUM": return "secondary";
      case "LOW": return "outline";
      default: return "default";
    }
  };

  const alternatives = opportunity.alternativeSolutions ? JSON.parse(opportunity.alternativeSolutions) : [];

  const handleGenerateBrief = async () => {
    setIsGenerating(true);
    try {
      await generateExperimentBrief(opportunity.id);
      setBriefGenerated(true);
      alert("Experiment Brief Generated Successfully! You can find it in the reports section.");
    } catch (e) {
      alert("Failed to generate brief.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-card/40 border-border/40 hover:border-border transition-colors">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant={getBadgeColor(opportunity.priorityLevel)}>{opportunity.priorityLevel}</Badge>
              <Badge variant="outline">{opportunity.category}</Badge>
            </div>
            <CardTitle className="text-xl">{opportunity.title}</CardTitle>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">+{opportunity.expectedConversionLift}%</div>
            <div className="text-xs text-muted-foreground">Est. Lift</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-4 bg-muted/30 p-3 rounded-lg border border-border/30">
          <div>
            <span className="text-muted-foreground block text-xs">Confidence</span>
            <span className="font-medium">{opportunity.confidenceScore}%</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-xs">Effort</span>
            <span className="font-medium capitalize">{opportunity.implementationEffort.toLowerCase()}</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold flex items-center mb-1 text-foreground">
            <Target className="w-4 h-4 mr-2 text-muted-foreground" />
            The Issue
          </h4>
          <p className="text-muted-foreground">{opportunity.explanation}</p>
        </div>

        <div>
          <h4 className="font-semibold flex items-center mb-1 text-foreground">
            <Zap className="w-4 h-4 mr-2 text-primary" />
            Recommendation
          </h4>
          <p className="text-foreground">{opportunity.recommendedSolution}</p>
        </div>

        <Accordion className="w-full border-t border-border/50 pt-2">
          <AccordionItem value="details" className="border-none">
            <AccordionTrigger className="text-xs text-muted-foreground py-2 hover:no-underline">
              View Detailed Analysis & Alternatives
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div>
                <strong className="block text-xs text-muted-foreground mb-1">Evidence Found:</strong>
                <p className="text-muted-foreground italic border-l-2 border-primary/50 pl-3">{opportunity.evidence}</p>
              </div>
              
              <div>
                <strong className="block text-xs text-muted-foreground mb-1">Why It Matters (Psychology/UX):</strong>
                <p className="text-muted-foreground">{opportunity.whyItMatters}</p>
              </div>

              {alternatives.length > 0 && (
                <div>
                  <strong className="block text-xs text-muted-foreground mb-1">Alternative Approaches:</strong>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {alternatives.map((alt: string, i: number) => (
                      <li key={i}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="pt-0 justify-end border-t border-border/10 mt-2 p-4">
        <Button 
          variant={briefGenerated ? "outline" : "secondary"} 
          size="sm" 
          className="w-full sm:w-auto"
          onClick={handleGenerateBrief}
          disabled={isGenerating || briefGenerated}
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <FileText className="w-4 h-4 mr-2" />
          )}
          {briefGenerated ? "Brief Generated" : "Generate Experiment Brief"}
        </Button>
      </CardFooter>
    </Card>
  );
}
