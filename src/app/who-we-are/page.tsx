"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, MessageSquare, Heart, CheckSquare, Smile, Award, Gift, Sparkles 
} from "lucide-react";

const values = [
  {
    icon: TrendingUp,
    title: "Keep Moving Forward",
    desc: "Progress over status quo. We are constantly learning, adapting, and growing. We push boundaries, solve hard problems, and never settle for 'good enough'."
  },
  {
    icon: MessageSquare,
    title: "Communicate Actively",
    desc: "We communicate clearly, honestly, and proactively. We share feedback early, listen actively, and ensure alignment across teams and projects."
  },
  {
    icon: Heart,
    title: "Promote Empathy",
    desc: "We treat everyone with respect, kindness, and understanding. We value diverse perspectives and build a supportive community where everyone can thrive."
  },
  {
    icon: CheckSquare,
    title: "Take Ownership",
    desc: "We take responsibility for our actions and outcomes. We are reliable, committed, and take pride in delivering high-quality work."
  },
  {
    icon: Smile,
    title: "Show Compassion",
    desc: "We support each other in times of need and celebrate wins together. We care about the well-being of our team members."
  },
  {
    icon: Award,
    title: "Not Done Yet",
    desc: "We believe there is always room for improvement. We are constantly looking for ways to optimize, innovate, and achieve better results."
  }
];

export default function WhoWeArePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary selection:bg-brand-primary">
      <Header />
      
      {/* 1. Hero Section */}
      <section id="about" className="scroll-mt-24 relative min-h-[85vh] flex items-center justify-center pt-32 pb-16 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-gradient-to-bl from-brand-primary/5 via-brand-primary/2 to-transparent blur-[120px] pointer-events-none" />
        <Container size="2xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center text-left">
            {/* Left Info Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="lg:col-span-6 flex flex-col gap-6"
            >
              <span className="text-sm md:text-base font-heading font-black tracking-wider text-brand-primary uppercase">
                About Us
              </span>
              <Heading level={1} size="4xl" className="font-heading font-extrabold text-black leading-[1.1] tracking-tight">
                Borderless Talent, Boundless Growth
              </Heading>
              <Text size="lg" className="text-text-muted max-w-xl leading-relaxed">
                We build and manage high-performing teams of developers to accelerate your product roadmap. Discover our values, mission, and how we give back.
              </Text>
              <div className="mt-4">
                <Button variant="primary" size="lg" href="/contact" className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-bold rounded-md px-6 py-3.5 shadow-md w-full sm:w-auto text-center">
                  Schedule a Call
                </Button>
              </div>
            </motion.div>

            {/* Right Diamond Image Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="lg:col-span-6 flex items-center justify-center relative min-h-[350px] md:min-h-[450px]"
            >
              <div className="relative w-[280px] md:w-[380px] h-[280px] md:h-[380px]">
                {/* Top Left Diamond */}
                <div className="absolute top-0 left-[10%] w-[160px] md:w-[210px] h-[160px] md:h-[210px] z-20 group">
                  <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(109,36,229,0.15)] rounded-2xl md:rounded-[24px] transition-all duration-300">
                    <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
                        alt="Devosphere group"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 160px, 210px"
                      />
                    </div>
                  </div>
                </div>
                {/* Bottom Right Diamond */}
                <div className="absolute bottom-0 right-[5%] w-[160px] md:w-[210px] h-[160px] md:h-[210px] z-10 group">
                  <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(109,36,229,0.15)] rounded-2xl md:rounded-[24px] transition-all duration-300">
                    <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                        alt="Developer portrait"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 160px, 210px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. Our Values Section */}
      <section id="values" className="scroll-mt-24 py-24 bg-white border-t border-gray-100">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 text-left">
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight mb-3">
              Our Values
            </Heading>
            <Text size="lg" className="text-text-muted">
              Our values guide how we work with each other and our clients. They are the foundation of everything we do and represent the culture we build.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.25, 1, 0.5, 1] }}
                >
                  <Card variant="glow" className="p-8 border border-gray-150 h-full flex flex-col justify-start gap-5 text-left">
                    <div className="w-12 h-12 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Heading level={3} size="xl" className="text-gray-900 font-extrabold tracking-tight">
                        {value.title}
                      </Heading>
                      <Text size="base" variant="muted" className="leading-relaxed">
                        {value.desc}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. Volunteering & Generosity Section */}
      <section className="py-24 bg-[#fbfaff] border-t border-gray-100">
        <Container size="2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto text-left">
            {/* Card 1: Volunteering */}
            <Card variant="glow" className="p-8 border border-gray-150 flex flex-col gap-5">
              <div className="w-12 h-12 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <Heading level={3} size="2xl" className="text-black font-extrabold tracking-tight">
                  Volunteering with Hero Drops
                </Heading>
                <Text size="base" variant="muted" className="leading-relaxed">
                  At Devosphere, we believe in giving back to the community. We support volunteering initiatives and encourage our team members to dedicate time to causes they care about.
                </Text>
              </div>
            </Card>

            {/* Card 2: Generosity Quests */}
            <Card variant="glow" className="p-8 border border-gray-150 flex flex-col gap-5">
              <div className="w-12 h-12 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <Heading level={3} size="2xl" className="text-black font-extrabold tracking-tight">
                  Unlocking Generosity Through 'Quests'
                </Heading>
                <Text size="base" variant="muted" className="leading-relaxed">
                  Through our unique 'Quests' program, we fund charitable projects and support communities in need. We track our impact and celebrate the difference we make.
                </Text>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* 4. CTA Let's Get Started Banner */}
      <section className="py-20 bg-gradient-to-tr from-brand-primary/5 via-brand-primary/2 to-transparent border-t border-gray-100">
        <Container size="2xl" className="text-center">
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
              Let's Get Started
            </Heading>
            <Text size="lg" className="text-text-muted">
              Accelerate your product engineering today. Connect with us to deploy vetted developers.
            </Text>
            <div className="flex justify-center mt-2">
              <Button variant="primary" size="lg" href="/contact" className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-bold rounded-md px-8 py-3.5 shadow-md w-full sm:w-auto text-center">
                Schedule a Call
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
