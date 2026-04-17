"use client";

import { motion } from "motion/react";
import FaqChatbot from "@/components/chatbot/FaqChatbot";
import BentoGrid from "@/components/BentoGrid";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      
      {/* MINIMALIST HEADER */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-8 md:px-16">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 bg-blue-600 rounded-full" />
          <span className="text-sm font-bold tracking-tight text-zinc-950 uppercase">Neural.Link</span>
        </div>
        <div className="hidden md:flex items-center gap-12">
          {["System", "Capabilities", "Demo"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-blue-600 transition-colors">
              {item}
            </a>
          ))}
          <button className="bg-zinc-950 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">
            Connect
          </button>
        </div>
      </nav>

      {/* LIGHT & AIRY HERO */}
      <section className="relative flex min-h-[90dvh] w-full flex-col items-center justify-center px-6 pt-32 text-center overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-50/50 blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-indigo-50/50 blur-[100px] -z-10" />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">v1.0.4 Online</span>
          </motion.div>
          
          <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[1.05] tracking-tight text-zinc-950 mb-8">
            Instant Intelligence. <br />
            <TypingAnimation 
              words={["Zero Hallucination.", "Grounded Data.", "Groq Speed."]}
              className="text-blue-600 italic"
              duration={100}
              pauseDelay={2000}
              loop
            />
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl mx-auto text-lg md:text-xl text-zinc-500 leading-relaxed mb-12"
          >
            A high-fidelity resolution engine powered by Groq and RAG, delivering precise answers through a stunningly minimalist interface.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="bg-blue-600 text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-xl shadow-blue-200">
              Initialize Demo
            </button>
            <button className="bg-white text-zinc-950 border border-zinc-200 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-3">
              Documentation <ArrowRightIcon className="size-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES BENTO (LIGHT) */}
      <div id="capabilities" className="py-24 bg-zinc-50/50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-8 mb-16">
          <div className="flex items-end justify-between">
            <div className="max-w-lg">
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-zinc-950 mb-4">Core Architecture.</h2>
              <p className="text-zinc-500 text-lg">Four pillars of our resolution engine, designed for speed and accuracy.</p>
            </div>
          </div>
        </div>
        <BentoGrid />
      </div>

      {/* INTERACTIVE DEMO (LIGHT CHATBOT) */}
      <section id="demo" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 md:px-12">
        <div className="mb-20 text-center">
          <h2 className="text-[clamp(2rem,5vw,5rem)] font-bold tracking-tight text-zinc-950">EXPERIENCE THE FLOW.</h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="w-full max-w-5xl rounded-[3rem] p-1.5 bg-zinc-100 shadow-2xl">
          <div className="overflow-hidden rounded-[2.8rem] bg-white ring-1 ring-zinc-200">
            <FaqChatbot />
          </div>
        </div>

        <footer className="mt-40 w-full border-t border-zinc-100 py-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-2 w-2 bg-zinc-200 rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-zinc-300">Neural.Link Engine</span>
            <div className="h-2 w-2 bg-zinc-200 rounded-full" />
          </div>
        </footer>
      </section>

    </main>
  );
}
