"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, TrendingUp, Zap, BarChart3, Sparkles } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/utils";

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-16 md:mt-20 mx-auto max-w-5xl"
    >
      {/* Glow behind */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-cyan-500/20 rounded-3xl blur-3xl opacity-40" aria-hidden="true" />

      {/* Dashboard Card */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0f0f13]/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-md bg-white/[0.04] text-xs text-[#52525b]">
              dashboard.helium.ai
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Metric Cards */}
          {[
            {
              label: "Conversion Rate",
              value: "4.8%",
              change: "+32%",
              icon: TrendingUp,
              color: "from-emerald-500/20 to-emerald-500/5",
              iconColor: "text-emerald-400",
            },
            {
              label: "Avg Order Value",
              value: "$127",
              change: "+18%",
              icon: BarChart3,
              color: "from-indigo-500/20 to-indigo-500/5",
              iconColor: "text-indigo-400",
            },
            {
              label: "AI Recommendations",
              value: "12.4K",
              change: "+2.1K",
              icon: Sparkles,
              color: "from-violet-500/20 to-violet-500/5",
              iconColor: "text-violet-400",
            },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#71717a] font-medium uppercase tracking-wider">
                  {metric.label}
                </span>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-b ${metric.color} flex items-center justify-center`}>
                  <metric.icon className={`w-4 h-4 ${metric.iconColor}`} />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-white tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs font-medium text-emerald-400 mb-1">
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Chart area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="col-span-1 md:col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white">Revenue Over Time</span>
              <div className="flex gap-1">
                {["7D", "30D", "90D"].map((period) => (
                  <button
                    key={period}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      period === "30D"
                        ? "bg-indigo-500/20 text-indigo-300"
                        : "text-[#52525b] hover:text-[#a1a1aa]"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            {/* SVG Chart */}
            <svg viewBox="0 0 500 120" className="w-full h-auto" aria-label="Revenue chart showing upward trend">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
                  <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                </linearGradient>
              </defs>
              <path
                d="M0,100 C50,95 80,85 120,75 C160,65 180,70 220,55 C260,40 280,50 320,35 C360,20 400,25 440,15 C460,10 480,8 500,5"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                className="text-indigo-400"
                style={{ stroke: "#818cf8" }}
              />
              <path
                d="M0,100 C50,95 80,85 120,75 C160,65 180,70 220,55 C260,40 280,50 320,35 C360,20 400,25 440,15 C460,10 480,8 500,5 L500,120 L0,120 Z"
                fill="url(#chartGradient)"
              />
            </svg>
          </motion.div>

          {/* AI Insight card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="rounded-xl border border-indigo-500/20 bg-indigo-500/[0.05] p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                AI Insight
              </span>
            </div>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Visitors from email campaigns have <span className="text-white font-medium">43% higher</span> conversion when shown personalized bundles.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 pb-20 overflow-hidden"
      id="hero"
    >
      {/* Animated background orbs */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-20 left-1/2 w-[600px] h-[300px] rounded-full bg-cyan-600/5 blur-[100px] animate-[float_12s_ease-in-out_infinite_2s]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 section-container text-center"
      >
        {/* Badge */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={staggerItem}>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.08] text-sm text-indigo-300 hover:bg-indigo-500/[0.12] transition-colors duration-300 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New: AI-Powered Product Discovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Personalize every{" "}
            <span className="gradient-text">shopping experience</span>{" "}
            with AI
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={staggerItem}
            className="mt-6 text-base sm:text-lg md:text-xl text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed"
          >
            Helium uses machine learning to deliver personalized product recommendations,
            intelligent search, and dynamic merchandising — driving measurable lifts in
            conversion, AOV, and retention.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={staggerItem}
            className="w-full max-w-xl mx-auto mt-10"
          >
            <form action="http://localhost:3000/" method="GET" className="relative flex items-center group">
              <div className="absolute left-5 text-[#71717a]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input
                type="url"
                name="url"
                placeholder="https://your-shopify-store.com"
                className="w-full pl-12 pr-36 h-14 text-base md:text-lg rounded-full bg-[#0f0f13]/80 border border-white/[0.1] text-white shadow-inner focus:outline-none focus:border-white/20 focus:ring-0 backdrop-blur-xl transition-all duration-300 placeholder:text-[#52525b]"
                required
              />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1.5 bottom-1.5 inline-flex items-center justify-center gap-2 px-6 font-medium text-white rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
              >
                Analyze <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* Social proof mini */}
          <motion.div
            variants={staggerItem}
            className="mt-10 flex items-center gap-3 text-sm text-[#52525b]"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[#09090b] bg-gradient-to-br from-indigo-400 to-violet-500"
                  style={{
                    opacity: 1 - i * 0.15,
                    background: `hsl(${240 + i * 20}, 60%, ${60 + i * 5}%)`,
                  }}
                />
              ))}
            </div>
            <span>Trusted by 500+ D2C brands</span>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <DashboardPreview />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-[#52525b]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/[0.1] flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
