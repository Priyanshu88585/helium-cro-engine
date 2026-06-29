"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import dynamic from "next/dynamic";
import { runCROAnalysis } from "@/actions/analyze";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import { NoiseOverlay, GradientMesh, CursorGlow } from "@/components/effects";

const LogoCloud = dynamic(() => import("@/components/sections/LogoCloud"));
const Features = dynamic(() => import("@/components/sections/Features"));
const ProductShowcase = dynamic(() => import("@/components/sections/ProductShowcase"));
const Metrics = dynamic(() => import("@/components/sections/Metrics"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const CTA = dynamic(() => import("@/components/sections/CTA"));

export default function Home() {
  const [url, setUrl] = useState("");
  const [isAutoRedirecting, setIsAutoRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get("url");
    if (urlParam) {
      setUrl(urlParam);
      setIsAutoRedirecting(true);
      triggerAnalysis(urlParam);
    }
  }, []);

  const triggerAnalysis = async (targetUrl: string) => {
    if (!targetUrl) return;
    const result = await runCROAnalysis(targetUrl);
    
    if (result.success) {
      router.push(`/dashboard/${result.runId}`);
    } else {
      alert(`Analysis failed: ${result.error || "Please check the URL and try again."}`);
      setIsAutoRedirecting(false);
    }
  };

  if (isAutoRedirecting) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
        {/* Premium background effects */}
        <GradientMesh />
        <NoiseOverlay />
        
        <div className="z-10 flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-[#0f0f13] border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 animate-pulse" />
            <Activity className="w-8 h-8 text-primary animate-pulse" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Initializing Analysis</h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              Analyzing <span className="text-primary font-mono">{url}</span> for conversion optimization opportunities...
            </p>
          </div>

          <div className="flex space-x-2 pt-4">
            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <GradientMesh />
      <NoiseOverlay />
      <CursorGlow />

      <Navbar />

      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <ProductShowcase />
        <Metrics />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
