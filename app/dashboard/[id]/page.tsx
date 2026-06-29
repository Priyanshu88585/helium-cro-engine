import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, TrendingUp, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import RevenueEstimator from "@/features/RevenueEstimator";
import OpportunityCard from "@/features/OpportunityCard";
import PrintButton from "@/components/PrintButton";

export default async function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const analysisRun = await prisma.analysisRun.findUnique({
    where: { id: resolvedParams.id },
    include: {
      opportunities: {
        orderBy: { priorityScore: "desc" }
      }
    }
  });

  if (!analysisRun) {
    return notFound();
  }

  const { overallScore, url, opportunities } = analysisRun;
  const score = overallScore || 0;

  const criticalOpps = opportunities.filter((o: any) => o.priorityLevel === "CRITICAL");
  const highOpps = opportunities.filter((o: any) => o.priorityLevel === "HIGH");
  const mediumOpps = opportunities.filter((o: any) => o.priorityLevel === "MEDIUM");
  const lowOpps = opportunities.filter((o: any) => o.priorityLevel === "LOW");

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">CRO Analysis Report</h1>
          <p className="text-muted-foreground truncate max-w-md" title={url}>{url}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Badge variant="outline" className="px-4 py-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
            Analysis Complete
          </Badge>
          <PrintButton />
        </div>
      </header>

      {/* Print-only header */}
      <div className="hidden print:block mb-8">
        <h1 className="text-4xl font-bold">Helium CRO Report</h1>
        <p className="text-lg text-muted-foreground mt-2">{url}</p>
        <p className="text-sm mt-1">Generated on {new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Score */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{score}<span className="text-muted-foreground text-2xl">/100</span></div>
            <Progress value={score} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              Based on {opportunities.length} data points extracted.
            </p>
          </CardContent>
        </Card>

        {/* Potential Impact */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Conversion Lift</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-primary flex items-center">
              +{analysisRun.conversionImprovement?.toFixed(2)}%
              <TrendingUp className="w-8 h-8 ml-3 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Cumulative expected lift if all Critical & High priority items are resolved.
            </p>
          </CardContent>
        </Card>

        {/* Priorities summary */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Action Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 mt-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-destructive"><AlertTriangle className="w-4 h-4 mr-2"/> Critical</div>
              <span className="font-medium">{criticalOpps.length}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-orange-500"><ArrowUpRight className="w-4 h-4 mr-2"/> High</div>
              <span className="font-medium">{highOpps.length}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-yellow-500"><Info className="w-4 h-4 mr-2"/> Medium</div>
              <span className="font-medium">{mediumOpps.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="critical" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1">
              <TabsTrigger value="critical">Critical ({criticalOpps.length})</TabsTrigger>
              <TabsTrigger value="high">High ({highOpps.length})</TabsTrigger>
              <TabsTrigger value="medium">Medium ({mediumOpps.length})</TabsTrigger>
              <TabsTrigger value="low">Low ({lowOpps.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="critical" className="space-y-4 mt-6">
              {criticalOpps.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">No critical issues found.</p>
              ) : (
                criticalOpps.map((opp: any) => <OpportunityCard key={opp.id} opportunity={opp} />)
              )}
            </TabsContent>
            <TabsContent value="high" className="space-y-4 mt-6">
              {highOpps.map((opp: any) => <OpportunityCard key={opp.id} opportunity={opp} />)}
            </TabsContent>
            <TabsContent value="medium" className="space-y-4 mt-6">
              {mediumOpps.map((opp: any) => <OpportunityCard key={opp.id} opportunity={opp} />)}
            </TabsContent>
            <TabsContent value="low" className="space-y-4 mt-6">
              {lowOpps.map((opp: any) => <OpportunityCard key={opp.id} opportunity={opp} />)}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <RevenueEstimator initialConversionLift={analysisRun.conversionImprovement || 0} />
          
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Chat with the Helium AI about these findings</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Chat feature placeholder */}
              <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg bg-muted/20">
                <p className="text-sm text-muted-foreground">AI Chat coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
