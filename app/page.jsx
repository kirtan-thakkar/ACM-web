import HeroReveal from "@/components/HeroReveal";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <main className="bg-[#09090b] min-h-screen">
      <HeroReveal />
      <BentoGrid />
      <footer className="py-12 text-center text-zinc-500 font-mono text-sm">
        <p>Awwwards Architecture © 2026. All rights reserved.</p>
      </footer>
    </main>
  );
}
