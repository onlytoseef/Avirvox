import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Avx } from "@/components/sections/avx";
import { Execution } from "@/components/sections/execution";
import { Roadmap } from "@/components/sections/roadmap";
import { FinalCards } from "@/components/sections/final-cards";
import { PageParticles } from "@/components/sections/page-particles";

export default function Home() {
  return (
    <main className="particle-page">
      <PageParticles />
      <Hero />
      <About />
      <Ecosystem />
      <Avx />
      <Execution />
      <Roadmap />
      <FinalCards />
    </main>
  );
}
