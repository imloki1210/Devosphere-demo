"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "../ui/container";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden bg-white">
      {/* Background soft lavender gradients */}
      <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-gradient-to-bl from-brand-primary/5 via-brand-primary/2 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-gradient-to-tr from-brand-primary/5 to-transparent blur-[100px] pointer-events-none" />
      
      {/* Fine diagonal decorative lines */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(135deg,rgba(109,36,229,0.15)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <Container size="2xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (Content) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 flex flex-col gap-6 text-left"
          >
            {/* Pre-title prehead */}
            <span className="text-sm md:text-base font-heading font-black tracking-wider text-brand-primary uppercase">
              Keep Moving Forward
            </span>

            {/* H1 Title Heading */}
            <Heading level={1} size="4xl" className="font-heading font-extrabold text-black leading-[1.1] tracking-tight">
              Accelerate Your Growth with Elite Tech Talent
            </Heading>

            {/* Main paragraph description */}
            <Text size="lg" className="text-text-muted font-normal max-w-xl leading-relaxed">
              From fast-growing startups to Fortune 500 companies, Devosphere is the go-to choice for discerning tech leaders who need high-performing teams of on-demand engineers.
            </Text>

            {/* Actions block */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                href="/services"
                className="bg-brand-primary hover:bg-brand-secondary border-brand-primary hover:border-brand-secondary text-white font-bold rounded-md px-6 py-3.5 shadow-md w-full sm:w-auto text-center"
              >
                Browse Developer Profiles
              </Button>
              <div className="text-sm md:text-base text-gray-500 font-heading font-medium">
                Looking for a job?{" "}
                <Link href="/careers" className="text-brand-primary hover:text-brand-secondary font-bold underline transition-colors">
                  Explore Opportunities
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Visual: Three diamond developer profile cards) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 flex items-center justify-center relative min-h-[450px] md:min-h-[550px]"
          >
            {/* Decorative background grid and cross lines */}
            <div className="absolute w-[120%] h-[120%] pointer-events-none -z-10 flex items-center justify-center">
              <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-brand-primary/10 via-[#d946ef]/8 to-transparent blur-[80px]" />
              <div className="absolute w-[130%] h-[1px] bg-brand-primary/15 rotate-[35deg] translate-y-[-40px]" />
              <div className="absolute w-[130%] h-[1px] bg-brand-primary/15 rotate-[35deg] translate-y-[40px]" />
              <div className="absolute w-[130%] h-[1px] bg-[#d946ef]/10 -rotate-[55deg] translate-x-[-60px]" />
              <div className="absolute w-[130%] h-[1px] bg-brand-primary/10 -rotate-[55deg] translate-x-[60px]" />
            </div>

            {/* Diamonds Layout Wrapper */}
            <div className="relative w-[320px] md:w-[420px] h-[320px] md:h-[420px]">
              {/* Diamond 1 (Top Left) */}
              <div className="absolute top-0 left-[15%] w-[160px] md:w-[200px] h-[160px] md:h-[200px] z-20 group">
                <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(109,36,229,0.15)] rounded-2xl md:rounded-[24px] transition-all duration-300 bg-gray-100">
                   <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45">
                     <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                      alt="Devosphere Developer Profile"
                      fill
                      className="object-cover scale-100 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 160px, 200px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Diamond 2 (Middle Right) */}
              <div className="absolute top-[25%] right-0 w-[160px] md:w-[200px] h-[160px] md:h-[200px] z-30 group">
                <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(109,36,229,0.15)] rounded-2xl md:rounded-[24px] transition-all duration-300 bg-gray-100">
                   <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45">
                     <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                      alt="Devosphere Developer Profile"
                      fill
                      className="object-cover scale-100 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 160px, 200px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Diamond 3 (Bottom Left) */}
              <div className="absolute bottom-0 left-[5%] w-[160px] md:w-[200px] h-[160px] md:h-[200px] z-10 group">
                <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(109,36,229,0.15)] rounded-2xl md:rounded-[24px] transition-all duration-300 bg-gray-100">
                   <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45">
                     <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                      alt="Devosphere Developer Profile"
                      fill
                      className="object-cover scale-100 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 160px, 200px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
