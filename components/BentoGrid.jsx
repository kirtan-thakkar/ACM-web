"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { LightningBoltIcon, MixIcon, ArrowRightIcon, BoxModelIcon } from "@radix-ui/react-icons";

// Magnetic Button Component
function MagneticButton({ children, onClick, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: e.clientX - center.x, y: e.clientY - center.y };
    
    x.set(distance.x * 0.2);
    y.set(distance.y * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 font-medium transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Perpetual Motion Card - Infinite Shimmer
function ShimmerCard() {
  return (
    <div className="liquid-glass relative flex h-[300px] flex-col overflow-hidden rounded-[2.5rem] p-8 md:col-span-2">
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <LightningBoltIcon className="text-white w-5 h-5" />
          </div>
          <span className="text-sm font-mono text-zinc-400 tracking-tight">ENGINE.STATUS</span>
        </div>
        <div>
          <h3 className="text-2xl font-medium tracking-tight text-white mb-2">Perpetual Dynamics</h3>
          <p className="text-zinc-400 max-w-sm">Fluid animations that never stop, providing a living, breathing interface.</p>
        </div>
      </div>
      
      {/* Ambient background shimmer loop */}
      <motion.div 
        className="absolute -inset-[100%] z-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-50"
        animate={{ x: ["0%", "100%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transform: "rotate(15deg)" }}
      />
    </div>
  );
}

// Perpetual Motion Card - Live Status
function LiveStatusCard() {
  return (
    <div className="liquid-glass relative flex h-[300px] flex-col items-center justify-center rounded-[2.5rem] p-8 overflow-hidden">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute h-24 w-24 rounded-full border border-emerald-500/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-16 w-16 rounded-full border border-emerald-500/50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <div className="relative z-10 h-8 w-8 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-medium text-white mb-1">System Optimal</h3>
          <span className="text-sm font-mono text-emerald-500">99.9% UPTIME</span>
        </div>
      </div>
    </div>
  );
}

// Asymmetric Card - 70/30 Split focus
function ContextualCard() {
  return (
    <div className="liquid-glass relative flex h-[400px] flex-col justify-end overflow-hidden rounded-[2.5rem] p-8 md:col-span-3">
      <div className="absolute top-8 right-8 text-zinc-600">
        <MixIcon className="w-24 h-24 opacity-20" />
      </div>
      <div className="max-w-xl z-10">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-6 leading-tight">
          Designed for the rare intersection of beauty and performance.
        </h2>
        <MagneticButton className="bg-white text-zinc-950 hover:bg-zinc-200">
          <span>Explore Architecture</span>
          <ArrowRightIcon />
        </MagneticButton>
      </div>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section className="relative w-full bg-[#09090b] py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ShimmerCard />
          <LiveStatusCard />
          <ContextualCard />
        </div>
      </div>
    </section>
  );
}
