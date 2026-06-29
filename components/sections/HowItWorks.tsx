"use client";

import { motion } from "framer-motion";
import { Download, Cpu, BarChart3, Rocket } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Install the App",
    description:
      "One-click install from the Shopify App Store. No code changes, no developer needed. You're live in under 5 minutes.",
    color: "text-indigo-400",
    bgColor: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Learns Your Store",
    description:
      "Our ML models immediately begin analyzing your product catalog, visitor behavior, and purchase patterns to build personalized models.",
    color: "text-violet-400",
    bgColor: "from-violet-500/20 to-violet-500/5",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "See Real-time Impact",
    description:
      "Watch your metrics improve in real-time. Track conversion lift, AOV increase, and revenue attribution directly in the dashboard.",
    color: "text-cyan-400",
    bgColor: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Scale & Optimize",
    description:
      "Our AI continuously optimizes through automated experimentation, learning from every interaction to deliver compounding growth.",
    color: "text-emerald-400",
    bgColor: "from-emerald-500/20 to-emerald-500/5",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-[var(--section-padding)]" aria-label="How it works">
      {/* Gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" aria-hidden="true" />

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
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Go live in <span className="gradient-text">5 minutes</span>
          </h2>
          <p className="mt-5 text-[#a1a1aa] text-lg leading-relaxed">
            From install to revenue impact — no code required.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Vertical line */}
          <div className="absolute left-5 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/30 via-violet-500/20 to-transparent" aria-hidden="true" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={staggerItem}
                className="relative flex gap-6 md:gap-8"
              >
                {/* Number dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-10 h-10 md:w-16 md:h-16 rounded-2xl bg-gradient-to-b ${step.bgColor} flex items-center justify-center border border-white/[0.06]`}>
                    <step.icon className={`w-5 h-5 md:w-6 md:h-6 ${step.color}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold ${step.color} uppercase tracking-wider`}>
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#a1a1aa] leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
