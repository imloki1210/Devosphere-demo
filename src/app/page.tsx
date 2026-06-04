import * as React from "react";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { StatsCounter } from "@/components/sections/stats";
import { ValuePropositionGrid } from "@/components/sections/values";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { ProcessSection } from "@/components/sections/process";
import { MagazineSection } from "@/components/sections/magazine";
import { TestimonialsSlider } from "@/components/sections/testimonials";
import { CTABanner } from "@/components/sections/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary selection:bg-brand-primary">
      {/* Global Sticky Header */}
      <Header />

      {/* Main Content Layout */}
      <main className="flex-grow">
        <HeroSection />
        <TrustMarquee />
        <StatsCounter />
        <ValuePropositionGrid />
        <CaseStudiesSection />
        <ProcessSection />
        <MagazineSection />
        <TestimonialsSlider />
        <CTABanner />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

