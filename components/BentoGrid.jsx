"use client";

import { motion } from "motion/react";
import { LightningBoltIcon, GlobeIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { Mic } from "lucide-react";

// 1. RAG Retrieval Card
function RagCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex h-[450px] flex-col overflow-hidden rounded-[3rem] p-10 bg-white border border-zinc-100 shadow-xl shadow-zinc-100/50 md:col-span-2 transition-all hover:shadow-2xl hover:shadow-blue-100/50 cursor-pointer"
    >
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
            <GlobeIcon className="size-6" />
          </div>
          <h3 className="text-4xl font-bold tracking-tight text-zinc-950 mb-4 leading-none">Augmented Context.</h3>
          <p className="text-zinc-500 max-w-sm text-lg leading-relaxed">
            Every response is grounded in your specific documentation with zero hallucination.
          </p>
        </div>
        <div className="flex gap-2">
          {["PDF", "JSON", "DOCS"].map((tag, i) => (
            <motion.span 
              key={tag} 
              initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              className="text-[10px] font-bold border border-zinc-100 bg-zinc-50 px-3 py-1.5 rounded-full text-zinc-400 uppercase tracking-widest"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
      
      {/* Floating UI element */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-20 w-12 h-12 rounded-full bg-blue-100/50 border border-blue-200 backdrop-blur-sm z-0 flex items-center justify-center shadow-lg group-hover:bg-blue-200/50 transition-colors"
      >
        <div className="w-4 h-4 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
      </motion.div>

      {/* Decorative RAG visualization */}
      <div className="absolute right-[-5%] bottom-[-5%] p-10 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div 
              key={i}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              className="size-12 bg-blue-600 rounded-xl"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// 2. Groq Speed Card
function SpeedCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex h-[450px] flex-col items-center justify-center rounded-[3rem] p-10 bg-white border border-zinc-100 shadow-xl shadow-zinc-100/50 transition-all hover:shadow-2xl hover:shadow-blue-100/50 overflow-hidden cursor-pointer"
    >
      <div className="flex flex-col items-center gap-8 text-center relative z-10">
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute h-40 w-40 rounded-full border border-blue-100 group-hover:border-blue-300 transition-colors"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-200 group-hover:shadow-blue-400 group-hover:scale-110 transition-all">
            <LightningBoltIcon className="size-10" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-zinc-950 mb-2 tracking-tight">LPU Powered</h3>
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-6">500+ Tokens / Sec</p>
          <p className="text-zinc-500 leading-relaxed">Streaming responses that feel instant and natural.</p>
        </div>
      </div>
      
      {/* Floating UI Element */}
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 shadow-sm flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500"
      >
        <span className="text-[8px] font-bold text-zinc-400">⚡</span>
      </motion.div>
    </motion.div>
  );
}

// 3. Multimodal Card
function MultimodalCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex h-[400px] flex-col justify-between overflow-hidden rounded-[3rem] p-10 bg-zinc-950 text-white shadow-2xl cursor-pointer"
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/10 group-hover:bg-white/20 transition-colors">
          <Mic className="size-6 group-hover:scale-110 transition-transform" />
        </div>
        <SpeakerLoudIcon className="size-6 text-zinc-600 group-hover:text-blue-400 transition-colors" />
      </div>
      <div className="relative z-10">
        <h3 className="text-3xl font-bold tracking-tight text-white mb-3 group-hover:text-blue-300 transition-colors">Multimodal.</h3>
        <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">Native transcription and neural text-to-speech built in.</p>
      </div>
      
      {/* Floating UI element */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-blue-500/30 transition-colors duration-500"
      >
        <div className="w-6 h-6 rounded-full bg-blue-500/50 blur-sm group-hover:blur-md transition-all duration-500" />
      </motion.div>

      {/* Waveform visualization */}
      <div className="flex items-end gap-1.5 h-16 mt-6 relative z-10 group-hover:scale-y-110 transition-transform origin-bottom">
        {[20, 35, 15, 45, 25, 55, 30, 40, 20, 60, 35, 25, 45, 20, 50, 30, 40, 15, 55, 25, 45, 20, 35, 15].map((height, i) => (
          <motion.div
            key={i}
            animate={{ height: [10, height, 10] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
            className="w-1.5 bg-blue-500 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}

// 4. Intelligence Card
function IntelligenceCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex h-[400px] flex-col justify-end overflow-hidden rounded-[3rem] p-10 bg-white border border-zinc-100 shadow-xl shadow-zinc-100/50 md:col-span-2 transition-all hover:shadow-2xl hover:shadow-blue-100/50 cursor-pointer"
    >
      <div className="absolute top-10 right-10 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-blue-600 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700">
        <LightningBoltIcon className="size-16 group-hover:scale-110 transition-transform duration-500" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
      
      {/* Floating UI Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[60%] w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-md rotate-6 group-hover:rotate-12 transition-transform duration-500"
      >
        <div className="w-3 h-3 bg-blue-400 rounded-sm group-hover:bg-blue-500 transition-colors" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] right-[30%] w-14 h-14 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center shadow-sm -rotate-12 group-hover:rotate-0 transition-transform duration-500"
      >
        <div className="w-6 h-6 border-2 border-zinc-200 rounded-full group-hover:border-zinc-300 transition-colors" />
      </motion.div>
      
      <div className="max-w-md z-10 relative">
        <div className="flex items-center gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="h-1 w-1 rounded-full bg-blue-600" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Cognitive Layer</span>
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-zinc-950 mb-6 leading-[1.1]">
          Calculated Logic. <br />
          <span className="text-blue-600 group-hover:text-blue-500 transition-colors">Human Feel.</span>
        </h2>
        <p className="text-zinc-500 text-lg leading-relaxed">
          The perfect balance between high-frequency computation and high-fidelity interface design.
        </p>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section className="relative w-full px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <RagCard />
          <SpeedCard />
          <MultimodalCard />
          <IntelligenceCard />
        </div>
      </div>
    </section>
  );
}