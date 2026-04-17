"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroReveal() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(imageRef.current, {
        clipPath: "inset(0% round 0px)",
        ease: "none",
      });

      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -50,
          ease: "none",
        },
        "<"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-[#09090b] flex items-center justify-center">
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full object-cover origin-center z-0"
        style={{
          clipPath: "inset(12% round 24px)",
          backgroundImage: "url('https://picsum.photos/seed/minimalism/1920/1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 100, delay: 0.2 }}
          className="text-5xl md:text-8xl font-medium tracking-tighter leading-none text-white max-w-4xl"
        >
          Form meets <br />
          <span className="text-zinc-400 italic">Function.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 100, delay: 0.4 }}
          className="mt-8 text-lg md:text-xl text-zinc-300 max-w-2xl font-sans"
        >
          An immersive experience driven by deliberate motion, asymmetric layouts, and pure physics.
        </motion.p>
      </div>
    </section>
  );
}
