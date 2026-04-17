"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ClipPathTitle from "./ClipPathTitle";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1.5,
      },
    });
    
    const titles = [".first-title", ".second-title", ".third-title", ".fourth-title"];
    
    titles.forEach((title) => {
      revealTimeline.to(`.benefit-section ${title}`, {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
    });
  }, []);

  return (
    <section className="benefit-section relative min-h-[90vh] bg-zinc-100 py-32 text-zinc-950 flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <p className="mb-16 text-sm md:text-base uppercase tracking-[0.2em] font-semibold text-zinc-500 max-w-xl">
            Unlock the Advantages <br />
            Explore the Key Benefits of Choosing our AI FAQ
          </p>
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <ClipPathTitle
              title={"Instant Retrieval"}
              color={"#faeade"}
              bg={"#18181b"}
              className={"first-title"}
              borderColor={"#18181b"}
            />

            <ClipPathTitle
              title={"Context Aware"}
              color={"#18181b"}
              bg={"#e4e4e7"}
              className={"second-title"}
              borderColor={"#18181b"}
            />

            <ClipPathTitle
              title={"Voice Enabled"}
              color={"#faeade"}
              bg={"#3b82f6"}
              className={"third-title"}
              borderColor={"#18181b"}
            />

            <ClipPathTitle
              title={"Always Accurate"}
              color={"#fafafa"}
              bg={"#10b981"}
              className={"fourth-title"}
              borderColor={"#18181b"}
            />
          </div>
          <div className="mt-16 text-lg font-medium uppercase tracking-widest text-zinc-400">
            <p>And much more...</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BenefitSection;
