"use client";

import { useMousePosition } from "@/lib/hooks";

export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}

export function GradientMesh() {
  return (
    <div className="gradient-mesh" aria-hidden="true">
      {/* Animated orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute top-2/3 left-1/2 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
          animation: "float 12s ease-in-out infinite 2s",
        }}
      />
    </div>
  );
}

export function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
      aria-hidden="true"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.04), transparent 40%)`,
      }}
    />
  );
}
