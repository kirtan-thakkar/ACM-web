"use client";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const cards = [
  { translation: "-translate-x-[20vw] translate-y-[10vh]", rotation: "-rotate-6", bg: "bg-blue-600" },
  { translation: "translate-x-[0vw] translate-y-[5vh]", rotation: "rotate-2", bg: "bg-emerald-600" },
  { translation: "translate-x-[20vw] translate-y-[15vh]", rotation: "rotate-6", bg: "bg-rose-600" },
];

const TestimonialSection = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(".testimonials-section", {
        marginTop: "-40vh",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top bottom",
          end: "200% top",
          scrub: true,
        },
      });

      tl.to(".testimonials-section .first-title", {
        xPercent: 70,
      })
        .to(
          ".testimonials-section .sec-title",
          {
            xPercent: 25,
          },
          "<",
        )
        .to(
          ".testimonials-section .third-title",
          {
            xPercent: -50,
          },
          "<",
        );

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "10% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });

      pinTl.from(".vd-card", {
        yPercent: 150,
        stagger: 0.2,
        ease: "power1.inOut",
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(".testimonials-section", {
        clearProps: "marginTop",
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="testimonials-section relative min-h-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden py-24">
      <div className="absolute flex size-full flex-col items-center pt-[15vw] pointer-events-none z-0">
        <h1 className="first-title text-[8vw] font-bold leading-none text-zinc-800 uppercase">What&apos;s</h1>
        <h1 className="sec-title text-[10vw] font-bold leading-none text-blue-500 uppercase">Everyone</h1>
        <h1 className="third-title text-[8vw] font-bold leading-none text-zinc-800 uppercase">Talking</h1>
      </div>
      <div className="pin-box relative z-10 w-full h-[60vh] flex items-center justify-center mt-32 md:mt-0">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card absolute w-64 h-80 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-white/10 p-6 flex flex-col justify-between ${card.bg} ${card.translation} ${card.rotation} backdrop-blur-md`}
          >
            <div className="text-white pt-4">
              <p className="text-lg font-bold mb-3 tracking-tight">&quot;Game Changer!&quot;</p>
              <p className="text-sm opacity-90 leading-relaxed font-medium">The instant retrieval of the FAQ bot completely transformed our customer support.</p>
            </div>
            <div className="flex items-center gap-3 pb-2">
              <div className="h-10 w-10 rounded-full bg-white/20 border border-white/30 shadow-inner"></div>
              <div className="text-xs text-white">
                <p className="font-bold tracking-wider">User {index + 1}</p>
                <p className="opacity-70 font-medium tracking-widest uppercase text-[10px]">Verified</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default TestimonialSection;
