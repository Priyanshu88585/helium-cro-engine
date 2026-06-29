"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/utils";

const testimonials = [
  {
    quote: "Helium transformed our product discovery. We saw a 35% increase in conversion within the first month — and it keeps improving.",
    author: "Sarah Chen",
    role: "VP of eCommerce",
    company: "Bloom Beauty",
    metric: "+35% conversion",
  },
  {
    quote: "The AI recommendations are eerily accurate. Our AOV jumped 22% because customers are now discovering products they actually love.",
    author: "Marcus Rodriguez",
    role: "Head of Growth",
    company: "Peak Athletics",
    metric: "+22% AOV",
  },
  {
    quote: "We tested 6 personalization tools. Helium was the only one that delivered real, measurable revenue impact within weeks, not months.",
    author: "Priya Patel",
    role: "CTO",
    company: "Urban Threads",
    metric: "6x faster ROI",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-[var(--section-padding)]"
      aria-label="Customer testimonials"
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
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Loved by <span className="gradient-text">growth teams</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.author}
              variants={staggerItem}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-8 hover:bg-white/[0.04] transition-all duration-500 glow-border flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-indigo-500/30 mb-5" aria-hidden="true" />

              {/* Quote */}
              <blockquote className="text-[#a1a1aa] leading-relaxed mb-8 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-semibold text-white">
                    {testimonial.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-[#52525b]">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Metric badge */}
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {testimonial.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
