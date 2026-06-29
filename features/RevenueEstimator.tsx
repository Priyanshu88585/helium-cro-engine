"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

export default function RevenueEstimator({ initialConversionLift = 0 }: { initialConversionLift: number }) {
  const [visitors, setVisitors] = useState(50000);
  const [cr, setCr] = useState(2.5);
  const [aov, setAov] = useState(75);

  const currentRevenue = visitors * (cr / 100) * aov;
  const newCr = cr * (1 + initialConversionLift / 100);
  const newRevenue = visitors * (newCr / 100) * aov;
  const potentialUplift = newRevenue - currentRevenue;

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-primary" />
          Revenue Estimator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 mt-4">
          <div className="grid gap-2">
            <Label>Monthly Visitors</Label>
            <Input 
              type="number" 
              value={visitors} 
              onChange={(e) => setVisitors(Number(e.target.value))}
              className="bg-background"
            />
          </div>
          <div className="grid gap-2">
            <Label>Current Conv. Rate (%)</Label>
            <Input 
              type="number" 
              step="0.1"
              value={cr} 
              onChange={(e) => setCr(Number(e.target.value))}
              className="bg-background"
            />
          </div>
          <div className="grid gap-2">
            <Label>Average Order Value ($)</Label>
            <Input 
              type="number" 
              value={aov} 
              onChange={(e) => setAov(Number(e.target.value))}
              className="bg-background"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Current Monthly Rev:</span>
            <span className="font-medium">${currentRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-primary font-medium">Projected Monthly Rev:</span>
            <span className="font-bold text-primary">${newRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="bg-primary/10 p-4 rounded-xl text-center">
            <p className="text-sm text-muted-foreground mb-1">Potential Monthly Uplift</p>
            <p className="text-3xl font-bold text-primary">
              +${potentialUplift.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
