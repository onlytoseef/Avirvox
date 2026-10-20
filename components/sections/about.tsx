import {
  GradientButton,
  Heading,
  OutlineButton,
} from "@/components/ui/elements";
import { aboutContent } from "@/lib/content/about";
import { FadeIn } from "@/components/motion/fade-in";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
      <FadeIn
        className="rounded-[28px] border border-[#4d2e56] px-6 py-14 text-center"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 36% 62% at 56% 0%, rgba(196,56,196,0.9) 0%, rgba(120,32,150,0.55) 45%, rgba(5,3,10,0) 100%), radial-gradient(ellipse 48% 70% at 44% 0%, rgba(90,30,120,0.5) 0%, rgba(5,3,10,0) 100%)",
        }}
      >
        <Heading
          eyebrow={aboutContent.eyebrow}
          description={aboutContent.description}
        >
          {aboutContent.title[0]}
          <br />
          {aboutContent.title[1]}
        </Heading>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GradientButton href="#participate">{aboutContent.eligibilityLabel}</GradientButton>
          <OutlineButton href="#resources">{aboutContent.whitepaperLabel}</OutlineButton>
        </div>
      </FadeIn>
    </section>
  );
}