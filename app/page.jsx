"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FaqChatbot from "@/components/chatbot/FaqChatbot";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        },
      );

      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0.7, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="relative min-h-screen bg-zinc-950 text-zinc-100">
      <section className="relative z-0 flex h-dvh w-full flex-col justify-center overflow-hidden px-6 py-12 md:px-12 lg:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(56,189,248,0.16),rgba(0,0,0,0)_58%)]" />
        <div className="relative max-w-5xl">
          <p className="hero-reveal mb-6 text-xs font-semibold uppercase tracking-[0.36em] text-zinc-500">
            System Interface
          </p>
          <h1 className="hero-reveal text-[clamp(2.8rem,7vw,7rem)] font-semibold leading-[0.94] tracking-tight text-zinc-100">
            Intelligent FAQ
            <span className="block text-zinc-500">Resolution Engine</span>
          </h1>
          <p className="hero-reveal mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Real-time, grounded responses from your FAQ knowledge base with a premium chat experience.
          </p>

          <motion.div
            className="hero-reveal mt-10 inline-flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-300"
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: "blur(0px)" }}
            whileHover={{ y: -1, borderColor: "rgba(56, 189, 248, 0.5)", filter: "blur(0px)" }}
            transition={{ duration: 0.2 }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Scroll To Enter Live Chat
          </motion.div>
        </div>
      </section>

      <section ref={contentRef} className="relative z-10 px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-8 flex items-end justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Interactive Demo</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
                Ask The FAQ Assistant
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -2, filter: "blur(0px)" }}
            className="rounded-4xl border border-zinc-800 bg-zinc-900/40 p-2 shadow-[0_28px_70px_-40px_rgba(0,0,0,0.9)] backdrop-blur"
          >
            <div className="overflow-hidden rounded-[1.65rem] bg-zinc-950/80">
              <FaqChatbot />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
