"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/utils";

const logos = [
  "Shopify", "Nike", "Allbirds", "Glossier", "Warby Parker",
  "Away", "Casper", "Everlane", "Outdoor Voices", "Gymshark",
];

function LogoText({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-8 md:px-12 py-4 opacity-30 hover:opacity-60 transition-opacity duration-500 select-none">
      <span className="text-xl md:text-2xl font-bold tracking-tight text-white whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden" aria-label="Trusted by leading brands">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-10"
      >
        <p className="text-sm font-medium text-[#52525b] uppercase tracking-widest">
          Trusted by leading D2C brands
        </p>
      </motion.div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-[marquee_40s_linear_infinite]">
          {[...logos, ...logos].map((name, i) => (
            <LogoText key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
