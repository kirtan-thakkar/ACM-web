"use client";

import { motion } from "motion/react";
import { LightningBoltIcon, GlobeIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { Mic } from "lucide-react";

// 1. RAG Retrieval Card
function RagCard() {
  return (
    <div className="group relative flex h-[450px] flex-col overflow-hidden rounded-[3rem] p-10 bg-white border border-zinc-100 shadow-xl shadow-zinc-100/50 md:col-span-2 transition-all hover:shadow-2xl hover:shadow-blue-100/50">
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
          {["PDF", "JSON", "DOCS"].map(tag => (
            <span key={tag} className="text-[10px] font-bold border border-zinc-100 bg-zinc-50 px-3 py-1.5 rounded-full text-zinc-400 uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
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
    </div>
  );
}

// 2. Groq Speed Card
function SpeedCard() {
  return (
    <div className="relative flex h-[450px] flex-col items-center justify-center rounded-[3rem] p-10 bg-white border border-zinc-100 shadow-xl shadow-zinc-100/50 transition-all hover:shadow-2xl hover:shadow-blue-100/50 overflow-hidden">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute h-40 w-40 rounded-full border border-blue-100"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-200">
            <LightningBoltIcon className="size-10" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-zinc-950 mb-2 tracking-tight">LPU Powered</h3>
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-6">500+ Tokens / Sec</p>
          <p className="text-zinc-500 leading-relaxed">Streaming responses that feel instant and natural.</p>
        </div>
      </div>
    </div>
  );
}

// 3. Multimodal Card
function MultimodalCard() {
  return (
    <div className="group relative flex h-[400px] flex-col justify-between overflow-hidden rounded-[3rem] p-10 bg-zinc-950 text-white shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/10">
          <Mic className="size-6" />
        </div>
        <SpeakerLoudIcon className="size-6 text-zinc-600" />
      </div>
      <div>
        <h3 className="text-3xl font-bold tracking-tight text-white mb-3">Multimodal.</h3>
        <p className="text-zinc-400 leading-relaxed">Native transcription and neural text-to-speech built in.</p>
      </div>
      
      {/* Waveform visualization */}
      <div className="flex items-end gap-1.5 h-16 mt-6">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [10, Math.random() * 50 + 10, 10] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
            className="w-1.5 bg-blue-500 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

// 4. Intelligence Card
function IntelligenceCard() {
  return (
    <div className="group relative flex h-[400px] flex-col justify-end overflow-hidden rounded-[3rem] p-10 bg-white border border-zinc-100 shadow-xl shadow-zinc-100/50 md:col-span-2 transition-all hover:shadow-2xl hover:shadow-blue-100/50">
      <div className="absolute top-10 right-10 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-blue-600 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700">
        <LightningBoltIcon className="size-16" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
      
      <div className="max-w-md z-10">
        <div className="flex items-center gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="h-1 w-1 rounded-full bg-blue-600" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Cognitive Layer</span>
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-zinc-950 mb-6 leading-[1.1]">
          Calculated Logic. <br />
          <span className="text-blue-600">Human Feel.</span>
        </h2>
        <p className="text-zinc-500 text-lg leading-relaxed">
          The perfect balance between high-frequency computation and high-fidelity interface design.
        </p>
      </div>
    </div>
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
