"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "../ui/container";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

const skillTags = [
  "React", "Angular", "NodeJs", "JavaScript", "TypeScript",
  "Python", "TensorFlow", "Keras", "PyTorch", "Scikit-Learn",
  "Go", "DevOps", "Docker", "Kubernetes", "Creative", "QA"
];

export const ValuePropositionGrid: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden flex flex-col gap-32">
      {/* 1. Scale with Purpose */}
      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Content) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
              Scale with Purpose
            </Heading>
            <Text size="lg" className="text-text-muted leading-relaxed">
              Maintain speed, consistency, and alignment. Devosphere offers a unique infrastructure designed to scale your technical capacity seamlessly while preserving standard developer dedication and product engineering quality.
            </Text>
          </motion.div>

          {/* Right Column (Visual: 4 overlapping diamond cards with purple cross in center) */}
          <div className="lg:col-span-7 flex justify-center items-center min-h-[400px] relative">
            <div className="relative w-[320px] md:w-[380px] h-[320px] md:h-[380px]">
              {/* Top Diamond */}
              <div className="absolute top-0 left-[28%] w-[110px] md:w-[130px] h-[110px] md:h-[130px] group">
                <div className="w-full h-full rotate-45 overflow-hidden border-4 border-white shadow-lg rounded-2xl transition-all duration-300">
                  <div className="w-[140%] h-[140%] -rotate-45 relative -left-[20%] -top-[20%]">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                      alt="Developer profile"
                      fill
                      className="object-cover scale-[1.1] group-hover:scale-[1.15] transition-transform duration-305"
                    />
                  </div>
                </div>
              </div>

              {/* Left Diamond */}
              <div className="absolute top-[28%] left-0 w-[110px] md:w-[130px] h-[110px] md:h-[130px] group">
                <div className="w-full h-full rotate-45 overflow-hidden border-4 border-white shadow-lg rounded-2xl transition-all duration-300">
                  <div className="w-[140%] h-[140%] -rotate-45 relative -left-[20%] -top-[20%]">
                    <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
                      alt="Developer profile"
                      fill
                      className="object-cover scale-[1.1] group-hover:scale-[1.15] transition-transform duration-305"
                    />
                  </div>
                </div>
              </div>

              {/* Right Diamond */}
              <div className="absolute top-[28%] right-0 w-[110px] md:w-[130px] h-[110px] md:h-[130px] group">
                <div className="w-full h-full rotate-45 overflow-hidden border-4 border-white shadow-lg rounded-2xl transition-all duration-300">
                  <div className="w-[140%] h-[140%] -rotate-45 relative -left-[20%] -top-[20%]">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300"
                      alt="Developer profile"
                      fill
                      className="object-cover scale-[1.1] group-hover:scale-[1.15] transition-transform duration-305"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Diamond */}
              <div className="absolute bottom-0 left-[28%] w-[110px] md:w-[130px] h-[110px] md:h-[130px] group">
                <div className="w-full h-full rotate-45 overflow-hidden border-4 border-white shadow-lg rounded-2xl transition-all duration-300">
                  <div className="w-[140%] h-[140%] -rotate-45 relative -left-[20%] -top-[20%]">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300"
                      alt="Developer profile"
                      fill
                      className="object-cover scale-[1.1] group-hover:scale-[1.15] transition-transform duration-305"
                    />
                  </div>
                </div>
              </div>

              {/* Center Diamond (Purple Cross Icon) */}
              <div className="absolute top-[28%] left-[28%] w-[110px] md:w-[130px] h-[110px] md:h-[130px] z-10 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full rotate-45 bg-brand-primary flex items-center justify-center shadow-lg rounded-2xl border-4 border-white">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white -rotate-45 fill-current">
                    <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* 2. Build with Confidence */}
      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Visual: Handshake overlap on diamond grid) */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex justify-center items-center min-h-[400px] relative">
            <div className="relative w-[320px] md:w-[380px] h-[320px] md:h-[380px]">
              {/* Background light gray rotated diamonds */}
              <div className="absolute top-0 left-[10%] w-[120px] h-[120px] rotate-45 border border-brand-primary/10 rounded-2xl bg-brand-primary/[0.02]" />
              <div className="absolute bottom-0 right-[10%] w-[120px] h-[120px] rotate-45 border border-brand-primary/10 rounded-2xl bg-brand-primary/[0.02]" />
              
              {/* Handshake Diamond overlay */}
              <div className="absolute top-[15%] left-[15%] w-[220px] md:w-[260px] h-[220px] md:h-[260px] z-10 group">
                <div className="w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-xl rounded-3xl transition-all duration-300">
                  <div className="w-[140%] h-[140%] -rotate-45 relative -left-[20%] -top-[20%]">
                    <Image
                      src="https://images.unsplash.com/photo-1521791136368-1a46827d0515?auto=format&fit=crop&q=80&w=500"
                      alt="Handshake team alignment"
                      fill
                      className="object-cover scale-[1.1] group-hover:scale-[1.15] transition-transform duration-305"
                    />
                  </div>
                </div>
              </div>
              
              {/* Tiny float graphic element */}
              <div className="absolute top-[5%] right-[15%] w-[60px] h-[60px] bg-brand-primary/10 rotate-45 rounded-xl flex items-center justify-center z-20">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-brand-primary -rotate-45 fill-current">
                  <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column (Content) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-6"
          >
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
              Build with Confidence
            </Heading>
            <Text size="lg" className="text-text-muted leading-relaxed">
              Every deployment and software iteration is backed by our vetted senior talent. We help you accelerate roadmap milestones, eliminate performance bottlenecks, and integrate best engineering practices into your core product lines.
            </Text>
          </motion.div>
        </div>
      </Container>

      {/* 3. Access Specialized Expertise */}
      <Container size="2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column (Content) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
              Access Specialized Expertise
            </Heading>
            <Text size="lg" className="text-text-muted leading-relaxed">
              Whether you need to scale data pipelines, integrate deep learning models, deploy serverless cloud architecture, or refine UX designs, our engineers bring domain-specific experience to hit the ground running.
            </Text>
            <div>
              <Button variant="primary" size="lg" href="/contact" className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-bold rounded-md px-6 py-3.5">
                Browse Developer Profiles
              </Button>
            </div>
          </motion.div>

          {/* Right Column (Visual: Dashboard profile mockup card) */}
          <div className="lg:col-span-7 flex justify-center items-center min-h-[400px] relative">
            <div className="w-full max-w-lg bg-background-darker border border-gray-100 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 flex flex-col gap-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-primary/5 to-transparent rounded-bl-full pointer-events-none" />
              
              {/* Mockup Profile Row */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-brand-primary/10">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                    alt="Developer profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-lg text-black">Sarah Jenkins</span>
                  <span className="text-xs text-gray-500 font-medium">Senior Full Stack Engineer • San Francisco</span>
                </div>
                <div className="ml-auto w-4 h-4 rounded-full bg-green-500 animate-pulse" />
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gray-100 w-full" />

              {/* Skills Tags list in dashboard */}
              <div className="flex flex-wrap gap-2.5">
                <span className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded px-2.5 py-1 text-xs font-semibold">React.js</span>
                <span className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded px-2.5 py-1 text-xs font-semibold">Node.js</span>
                <span className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded px-2.5 py-1 text-xs font-semibold">TypeScript</span>
                <span className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded px-2.5 py-1 text-xs font-semibold">PostgreSQL</span>
                <span className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded px-2.5 py-1 text-xs font-semibold">AWS S3</span>
              </div>

              {/* Interactive Calendar Row Mock */}
              <div className="flex flex-col gap-2 bg-white border border-gray-100 p-4 rounded-xl">
                <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                  <span>WEEKLY AVAILABILITY</span>
                  <span className="text-brand-primary">40h / week</span>
                </div>
                <div className="flex gap-2.5 mt-1">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-center p-2 bg-gray-50 rounded border border-gray-100">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{day}</span>
                      <span className="text-xs text-black font-extrabold mt-1">8h</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills/Tags grid row below this section */}
        <div className="max-w-6xl mx-auto pt-16 border-t border-gray-100 text-center">
          <div className="flex flex-wrap justify-center gap-3.5 max-w-5xl mx-auto">
            {skillTags.map((skill, index) => (
              <span
                key={index}
                className="bg-brand-primary/[0.03] text-gray-800 border border-gray-100 rounded-full px-5 py-2 text-sm font-semibold hover:border-brand-primary/20 hover:bg-brand-primary/[0.05] transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

