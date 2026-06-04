"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "../ui/container";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    number: "1",
    title: "Share Your Needs",
    description: "We start with a deep-dive discovery call, listening closely to your vision, required skills, timeline, and budget.",
  },
  {
    number: "2",
    title: "Meet Your Talent",
    description: "We present a handpicked selection of meticulously vetted developers, chosen to align perfectly with your team's culture and technical needs.",
  },
  {
    number: "3",
    title: "Hit the Ground Running",
    description: "With clear milestones and timelines in place, we help you onboard and integrate new developers into your existing team structure.",
  },
  {
    number: "4",
    title: "Keep Moving Forward",
    description: "We provide ongoing mentorship, access to top-tier professional development resources, and support from our vibrant community to keep your developers engaged, growing, and consistently delivering great results.",
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#f5f2fa] relative overflow-hidden">
      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Info + Overlapping double-diamond photos) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black leading-tight">
              A People-First, Results-Driven Process
            </Heading>
            <Text size="base" className="text-text-muted max-w-xl">
              Our streamlined approach is built to connect you with top software developers to augment your team.
            </Text>
            
            <div className="mb-8">
              <Button
                variant="primary"
                href="/contact"
                className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-bold rounded-md px-5 py-3 shadow-md"
              >
                Book a Call
              </Button>
            </div>

            {/* Overlapping Double-Diamond Photo Grid */}
            <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] mx-auto lg:mx-0 mt-4">
              {/* Diamond 1 (Top Left) */}
              <div className="absolute top-0 left-0 w-[140px] md:w-[180px] h-[140px] md:h-[180px] z-20 group">
                <div className="w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] rounded-2xl md:rounded-[20px] bg-gray-100 transition-all duration-300">
                  <div className="w-[140%] h-[140%] -rotate-45 relative -left-[20%] -top-[20%]">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                      alt="Devosphere Member Profile"
                      fill
                      className="object-cover scale-[1.1] group-hover:scale-[1.15] transition-transform duration-300"
                      sizes="(max-width: 768px) 140px, 180px"
                    />
                  </div>
                </div>
              </div>

              {/* Diamond 2 (Bottom Right) */}
              <div className="absolute bottom-[10%] right-[10%] w-[140px] md:w-[180px] h-[140px] md:h-[180px] z-10 group">
                <div className="w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] rounded-2xl md:rounded-[20px] bg-gray-100 transition-all duration-300">
                  <div className="w-[140%] h-[140%] -rotate-45 relative -left-[20%] -top-[20%]">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
                      alt="Devosphere Member Profile"
                      fill
                      className="object-cover scale-[1.1] group-hover:scale-[1.15] transition-transform duration-300"
                      sizes="(max-width: 768px) 140px, 180px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Vertical Step List) */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="flex items-start gap-5 group"
              >
                {/* Step Circle Badge */}
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-secondary border border-brand-primary/20 flex items-center justify-center font-heading font-extrabold text-lg shrink-0 select-none shadow-sm group-hover:scale-105 transition-transform duration-200">
                  {step.number}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Heading level={3} size="lg" className="text-gray-900 font-extrabold tracking-tight">
                    {step.title}
                  </Heading>
                  <Text size="base" variant="muted" className="text-gray-600 leading-relaxed font-normal">
                    {step.description}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};
