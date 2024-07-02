import Hero from "@/components/hero";
import New from "@/components/new";
import NewsPage from "@/components/news";
import ResearchPage from "@/components/research";
import AnimatedLogoCloud from "@/components/ui/animated-logo";

export default function Home() {
  return (
    <main>
      <Hero />
      <ResearchPage />
      {/* <NewsPage /> */}
      <New />
      <AnimatedLogoCloud />
    </main>
  );
}
