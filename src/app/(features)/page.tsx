import Hero from "@/components/hero";
import News from "@/components/news";
import ResearchPage from "@/components/research";
import AnimatedLogoCloud from "@/components/ui/animated-logo";

export default function Home() {
  return (
    <main>
      <Hero />
      <ResearchPage />
      <News />
      <AnimatedLogoCloud />
    </main>
  );
}
