import * as React from "react";
import Link from "next/link";
import { Container } from "../ui/container";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

export const CTABanner: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#f4f0fa] relative overflow-hidden border-t border-black/5">
      {/* Dynamic background geometric shapes / gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -right-[10%] top-[-20%] w-[50%] h-[150%] bg-gradient-to-l from-brand-primary/5 to-transparent rotate-[35deg] transform origin-top-right pointer-events-none" />
      
      {/* Decorative clean lines matching layout */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(135deg,rgba(109,36,229,0.15)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <Container size="xl" className="relative z-10 text-center flex flex-col items-center gap-6">
        {/* Main Header */}
        <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight leading-tight">
          Let's Get Started
        </Heading>
        
        {/* Main description paragraph */}
        <Text size="base" className="text-gray-700 max-w-3xl leading-relaxed font-normal mx-auto">
          At Devosphere, we provide world-class developers who don't just join your team — they become the driving force behind your success, pushing boundaries, fueling innovation, and delivering extraordinary results.
        </Text>
        
        {/* Action Button (Centered) */}
        <div className="mt-2">
          <Button
            variant="primary"
            size="lg"
            href="/contact"
            className="bg-brand-primary hover:bg-brand-secondary border-brand-primary hover:border-brand-secondary text-white font-bold rounded-md px-8 py-3.5 shadow-md"
          >
            Schedule a Call
          </Button>
        </div>

        {/* Action Link subtext */}
        <div className="text-sm md:text-base text-gray-500 font-heading font-medium mt-1">
          Looking for a job?{" "}
          <Link href="/careers" className="text-brand-primary hover:text-brand-secondary font-bold transition-colors">
            Apply here
          </Link>
        </div>
      </Container>
    </section>
  );
};
