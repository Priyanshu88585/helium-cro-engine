"use client";

import { Button } from "@/components/ui/button";

export default function PrintButton() {
  return (
    <Button 
      variant="secondary"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
    >
      Export PDF
    </Button>
  );
}
