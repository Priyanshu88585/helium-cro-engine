"use client";

import { motion } from "framer-motion";
import {
  Sparkles, Target, BarChart3, Search, Layers, Zap,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/utils";

const features = [
  {
    icon: Sparkles,
    title: "AI Personalization",
    description:
      "Deliver 1:1 personalized product recommendations using real-time behavioral signals, purchase history, and predictive intent modeling.",
    gradient: "from-indigo-500/20 to-indigo-500/5",
    iconColor: "text-indigo-400",
    span: "md:col-span-2",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Natural language search that understands intent, handles typos, and surfaces the most relevant products instantly.",
    gradient: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-cyan-400",
    span: "",
  },
  {
    icon: Target,
    title: "Dynamic Merchandising",
    description:
      "Automatically curate collections and category pages based on trending products, inventory levels, and visitor segments.",
    gradient: "from-violet-500/20 to-violet-500/5",
    iconColor: "text-violet-400",
    span: "",
  },
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    description:
      "Track the direct revenue impact of every AI recommendation with granular attribution, A/B testing, and real-time dashboards.",
    gradient: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
    span: "md:col-span-2",
  },
  {
    icon: Layers,
    title: "Omnichannel Sync",
    description:
      "Seamlessly connect personalization across web, mobile, email, and SMS for a unified customer experience.",
    gradient: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-400",
    span: "",
  },
  {
    icon: Zap,
    title: "One-Click Install",
    description:
      "Go live in under 5 minutes with our Shopify app. No code changes needed — just install and start converting.",
    gradient: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-400",
    span: "md:col-span-2",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-[var(--section-padding)]"
      aria-label="Features"
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Everything you need to{" "}
            <span className="gradient-text">grow revenue</span>
          </h2>
          <p className="mt-5 text-[#a1a1aa] text-lg leading-relaxed">
            A complete AI personalization platform designed for modern eCommerce teams who demand measurable results.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-8 hover:bg-white/[0.04] transition-all duration-500 glow-border ${feature.span}`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-b ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
