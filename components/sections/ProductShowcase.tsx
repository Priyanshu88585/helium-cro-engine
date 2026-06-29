"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, ShoppingCart, BarChart3, Search,
  TrendingUp, ArrowUpRight, Users, Eye,
} from "lucide-react";

const tabs = [
  {
    id: "recommendations",
    label: "Recommendations",
    icon: Sparkles,
    content: {
      title: "AI-Powered Product Recommendations",
      description: "Our ML models analyze browsing patterns, purchase history, and real-time intent signals to surface the perfect products for every visitor.",
      metrics: [
        { label: "Click-through Rate", value: "12.4%", change: "+340%", icon: Eye },
        { label: "Add to Cart Rate", value: "8.2%", change: "+180%", icon: ShoppingCart },
        { label: "Revenue per Visitor", value: "$4.82", change: "+65%", icon: TrendingUp },
      ],
      insight: "Visitors who interact with AI recommendations have 3.4x higher conversion rates than those who don't.",
    },
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
    content: {
      title: "Intelligent Product Search",
      description: "Natural language understanding that handles synonyms, typos, and complex queries to deliver perfect results every time.",
      metrics: [
        { label: "Search Conversion", value: "6.8%", change: "+220%", icon: TrendingUp },
        { label: "Zero Results Rate", value: "0.3%", change: "-94%", icon: Search },
        { label: "Avg. Search Revenue", value: "$8.40", change: "+112%", icon: BarChart3 },
      ],
      insight: "Search users convert at 2.8x the rate of browsers. Our AI ensures they always find what they're looking for.",
    },
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    content: {
      title: "Real-time Revenue Analytics",
      description: "Track every recommendation's impact on revenue with granular attribution, cohort analysis, and predictive forecasting.",
      metrics: [
        { label: "Active Experiments", value: "24", change: "+8", icon: Users },
        { label: "Revenue Attributed", value: "$1.2M", change: "+42%", icon: TrendingUp },
        { label: "Statistical Power", value: "98%", change: "→", icon: BarChart3 },
      ],
      insight: "Automated A/B testing runs continuously, ensuring every recommendation strategy is backed by statistically significant data.",
    },
  },
];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("recommendations");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      id="product"
      className="relative py-[var(--section-padding)]"
      aria-label="Product showcase"
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">
            Product
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            See the <span className="gradient-text">platform</span> in action
          </h2>
          <p className="mt-5 text-[#a1a1aa] text-lg leading-relaxed">
            Explore how Helium transforms raw visitor data into revenue-driving personalized experiences.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-[#71717a] hover:text-[#a1a1aa]"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <tab.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl border border-white/[0.08] bg-[#0f0f13]/60 backdrop-blur-xl overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

            <div className="relative p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: info */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                    {active.content.title}
                  </h3>
                  <p className="text-[#a1a1aa] leading-relaxed mb-8">
                    {active.content.description}
                  </p>

                  {/* Insight card */}
                  <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/[0.05] p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                        Key Insight
                      </span>
                    </div>
                    <p className="text-sm text-[#a1a1aa] leading-relaxed">
                      {active.content.insight}
                    </p>
                  </div>
                </div>

                {/* Right: metrics */}
                <div className="grid grid-cols-1 gap-4">
                  {active.content.metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-indigo-500/20 to-indigo-500/5 flex items-center justify-center">
                          <metric.icon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-xs text-[#71717a] font-medium uppercase tracking-wider">
                            {metric.label}
                          </p>
                          <p className="text-xl font-bold text-white tracking-tight">
                            {metric.value}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                        <ArrowUpRight className="w-4 h-4" />
                        {metric.change}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
