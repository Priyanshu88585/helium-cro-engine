"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative py-[var(--section-padding)] overflow-hidden"
      aria-label="Get started"
    >
      <div className="section-container relative">
        {/* Background glow */}
        <div className="absolute inset-0 -m-20" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-white/[0.08] bg-[#0f0f13]/60 backdrop-blur-xl p-10 md:p-16 text-center"
        >
          {/* Gradient accent at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" aria-hidden="true" />

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] max-w-2xl mx-auto">
            Ready to unlock{" "}
            <span className="gradient-text">AI-powered growth</span>?
          </h2>

          <p className="mt-5 text-[#a1a1aa] text-lg max-w-xl mx-auto leading-relaxed">
            Join 500+ D2C brands using Helium to deliver personalized experiences
            that convert browsers into loyal customers.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-xl mx-auto mt-10">
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
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-[#52525b]">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-[#52525b]" aria-hidden="true" />
            <span>100% Free to use</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
