"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/container";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

const caseStudies = [
  {
    logo: (
      <div className="flex items-center mb-10 h-10 select-none">
        <svg viewBox="0 0 120 40" className="w-24 h-8 fill-none stroke-current stroke-2 text-gray-900">
          <ellipse cx="60" cy="20" rx="55" ry="16" className="stroke-gray-300" />
          <text x="60" y="25" textAnchor="middle" className="font-sans font-bold text-sm tracking-widest fill-current stroke-none">KAPLAN</text>
        </svg>
      </div>
    ),
    quote: "They've provided us with a team of incredibly dedicated and intelligent developers. It's helped us avoid the inevitable team turnover from hiring on our own.",
    name: "Kaplan",
    role: "Product Director"
  },
  {
    logo: (
      <div className="flex items-center mb-10 h-10 select-none">
        <span className="font-sans font-black text-3xl tracking-tight text-gray-900 skew-x-3">FOX</span>
      </div>
    ),
    quote: "We've worked with other vendors, but Devosphere stands out the most; they're outperforming their competitors.",
    name: "Fox",
    role: "Tech Leader"
  },
  {
    logo: (
      <div className="flex items-center mb-10 h-10 select-none">
        <span className="font-sans font-black text-2xl tracking-tighter text-gray-900 flex items-center">
          inst<span className="italic text-purple-600">i</span>l
        </span>
      </div>
    ),
    quote: "Devosphere's developer brings a level of collaboration skills and experience that is measurably injecting energy into our velocity.",
    name: "Instil",
    role: "VP of Engineering"
  }
];

export const CaseStudiesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative border-b border-gray-100">
      <Container size="2xl">
        {/* Section Title */}
        <div className="mb-12">
          <Heading level={2} className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl text-left">
            Devosphere in Action
          </Heading>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="flex"
            >
              <div className="border border-gray-200 rounded-lg p-8 flex flex-col justify-between h-full hover:border-gray-300 hover:shadow-sm transition-all duration-300 w-full bg-white">
                <div>
                  {study.logo}
                  <Heading level={4} size="lg" className="font-heading font-extrabold text-gray-900 leading-snug tracking-tight text-lg md:text-xl mb-8">
                    "{study.quote}"
                  </Heading>
                </div>
                <div className="flex flex-col gap-0.5 text-left border-t border-gray-50 pt-4 mt-auto">
                  <span className="font-heading font-bold text-sm text-black">{study.name}</span>
                  <span className="text-xs text-gray-500 font-medium">{study.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Left-Aligned Slider Navigation controls at the bottom */}
        <div className="flex items-center gap-3 justify-start pl-1">
          <button className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-all select-none">
            <span className="text-lg leading-none font-bold">←</span>
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-all select-none">
            <span className="text-lg leading-none font-bold">→</span>
          </button>
        </div>
      </Container>
    </section>
  );
};

