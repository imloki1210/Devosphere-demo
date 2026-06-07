"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Share Your Needs",
    desc: "We start with a deep-dive discovery call, listening closely to your vision, required skills, timeline, and budget. We ensure we understand the technical skills and cultural qualities that will make the best fit for your team.",
    deliverable: "Confidence that we're aligned with exactly what you need."
  },
  {
    number: "2",
    title: "Meet Your Talent",
    desc: "We present a hand-picked selection of meticulously vetted developers, chosen to align perfectly with your team's culture and technical needs. Our rigorous process ensures that only the most qualified and compatible candidates are presented for your consideration.",
    deliverable: "Developers who fit right in and are ready to contribute from day one."
  },
  {
    number: "3",
    title: "Hit the Ground Running",
    desc: "With clear milestones and timelines in place, we help you onboard and integrate new developers into your existing team structure.",
    deliverable: "A welcoming process that feels natural and gets your team working together smoothly."
  },
  {
    number: "4",
    title: "Keep Moving Forward",
    desc: "We provide ongoing mentorship, access to top developer professional development resources, and support from our vibrant community to keep your developers engaged, growing, and constantly delivering great results.",
    deliverable: "A well-supported team that stays productive, innovative, and fully empowered to achieve your goals."
  }
];

export default function HowItWorksPage() {
  const processRef = React.useRef<HTMLDivElement>(null);
  const isProcessInView = useInView(processRef, { once: true, margin: "-50px" });

  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary selection:bg-brand-primary">
      <Header />
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-16 overflow-hidden bg-white">
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
                Our Process
              </span>
              <Heading level={1} size="4xl" className="font-heading font-extrabold text-black leading-[1.1] tracking-tight">
                How It Works
              </Heading>
              <Text size="lg" className="text-text-muted max-w-xl leading-relaxed">
                Our flexible engagement models and proven process make it easy to connect with world-class developers, ensuring your projects are staffed and supported for success.
              </Text>
              <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full sm:w-auto">
                <Button variant="primary" size="lg" href="/contact" className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-bold rounded-md px-6 py-3.5 shadow-md w-full sm:w-auto text-center">
                  Schedule a Call
                </Button>
                <div className="text-sm md:text-base text-gray-500 font-heading font-medium">
                  Looking for a job?{" "}
                  <Link href="/careers" className="text-brand-primary hover:text-brand-secondary font-bold underline transition-colors">
                    Explore Opportunities
                  </Link>
                </div>
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
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                        alt="Onboarding expert"
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
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                        alt="Product manager"
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

      {/* 2. Flexible Engagement Models Section */}
      <section className="py-24 bg-[#fbfaff] border-t border-gray-100">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 text-left">
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight mb-3">
              Flexible Engagement Models That Meet Your Needs
            </Heading>
            <Text size="lg" className="text-text-muted">
              Every project has unique requirements. That's why we offer flexible models to help you scale with confidence and flexibility, no matter the size or scope of your project.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Staff Augmentation */}
            <Card variant="glow" className="p-8 border border-gray-150 flex flex-col justify-between gap-6 text-left">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                  <UserPlus className="w-6 h-6" />
                </div>
                <Heading level={3} size="2xl" className="text-black font-extrabold tracking-tight">
                  Staff Augmentation
                </Heading>
                <Text size="base" variant="muted" className="leading-relaxed">
                  Integrate developers directly into your existing team. Our engineers work alongside your internal team to help you meet project goals faster, without the hassle of traditional hiring.
                </Text>
                
                <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-3">
                  <div>
                    <span className="text-xs uppercase font-heading font-black text-brand-primary tracking-wider">Ideal For</span>
                    <p className="text-sm font-medium text-gray-700 mt-0.5">Short-term or long-term projects where you need specific expertise or to fill gaps quickly.</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-heading font-black text-brand-primary tracking-wider">What You Get</span>
                    <p className="text-sm font-medium text-gray-700 mt-0.5">On-demand, elite developers who integrate seamlessly into your workflow and company culture.</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs uppercase font-heading font-black text-gray-400 tracking-wider">Key Benefit</span>
                <p className="text-sm font-bold text-gray-900 mt-0.5">Flexibility to quickly scale your team with expert developers, without long-term commitment.</p>
              </div>
            </Card>

            {/* Card 2: Dedicated Teams */}
            <Card variant="glow" className="p-8 border border-gray-150 flex flex-col justify-between gap-6 text-left">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <Heading level={3} size="2xl" className="text-black font-extrabold tracking-tight">
                  Dedicated Teams
                </Heading>
                <Text size="base" variant="muted" className="leading-relaxed">
                  Integrate a full team of engineers into your organization. From front-end to back-end, DevOps to QA, we build and manage entire teams that are aligned with your goals.
                </Text>
                
                <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-3">
                  <div>
                    <span className="text-xs uppercase font-heading font-black text-brand-primary tracking-wider">Ideal For</span>
                    <p className="text-sm font-medium text-gray-700 mt-0.5">Large, complex projects that require continuous development and support.</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase font-heading font-black text-brand-primary tracking-wider">What You Get</span>
                    <p className="text-sm font-medium text-gray-700 mt-0.5">A complete development team working under your guidance, aligned with your objectives and culture.</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs uppercase font-heading font-black text-gray-400 tracking-wider">Key Benefit</span>
                <p className="text-sm font-bold text-gray-900 mt-0.5">End-to-end project execution with minimal overhead, allowing you to focus on strategic priorities.</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* 3. Our People-Centered, Results-Focused Process */}
      <section ref={processRef} className="py-24 bg-white border-t border-gray-100">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left side static visual context */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left lg:sticky lg:top-32">
              <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight leading-[1.1]">
                Our People-Centered, Results-Focused Process
              </Heading>
              <Text size="base" className="text-text-muted">
                Our streamlined approach is built to connect you with top software developers to augment your team.
              </Text>
              <div className="mt-2">
                <Button variant="primary" size="lg" href="/contact" className="bg-brand-primary text-white font-bold rounded-md px-6 py-3.5">
                  Talk to a Talent Expert
                </Button>
              </div>
              
              {/* Process Overlapping Diamonds */}
              <div className="relative w-[240px] md:w-[300px] h-[240px] md:h-[300px] mt-8 self-center lg:self-start">
                <div className="absolute top-0 left-0 w-[130px] md:w-[160px] h-[130px] md:h-[160px] z-20">
                  <div className="relative w-full h-full rotate-45 overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] rounded-2xl bg-gray-100">
                    <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45">
                      <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=300"
                        alt="Team meeting"
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[5%] right-[5%] w-[130px] md:w-[160px] h-[130px] md:h-[160px] z-10">
                  <div className="relative w-full h-full rotate-45 overflow-hidden border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] rounded-2xl bg-gray-100">
                    <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45">
                      <Image
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=3.0&w=300&h=300&q=80"
                        alt="Developer focus"
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side chronological list of steps */}
            <div className="lg:col-span-7 flex flex-col gap-10 text-left">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
                  className="flex gap-6 items-start pb-8 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-heading font-black text-xl shrink-0 shadow-md">
                    {step.number}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Heading level={3} size="xl" className="text-black font-extrabold tracking-tight">
                      {step.title}
                    </Heading>
                    <Text size="base" variant="muted" className="leading-relaxed">
                      {step.desc}
                    </Text>
                    <div className="bg-brand-primary/[0.03] border border-brand-primary/10 rounded-lg p-3.5 mt-2">
                      <span className="text-xs font-heading font-black text-brand-primary uppercase tracking-wider">What You'll Get</span>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{step.deliverable}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
              At Devosphere, we provide world-class developers who don't just join your team — they become the driving force behind your success, pushing boundaries, fueling innovation, and delivering extraordinary results.
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
