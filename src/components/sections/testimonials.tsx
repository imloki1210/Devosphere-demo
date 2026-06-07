"use client";

import * as React from "react";
import { Container } from "../ui/container";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { TestimonialCard } from "../ui/testimonial-card";
import { motion } from "framer-motion";

const clientTestimonials = [
  {
    quote: "Devosphere's developers are extremely proactive, technically proficient, and seamlessly integrated with our core engineering team. They helped us scale streaming performance in record time.",
    author: "Richard Jenkins",
    role: "VP of Product Development",
    company: "Fox Sports",
  },
  {
    quote: "Working with Devosphere allowed us to clear legacy code backlogs and focus our internal engineering resources on shipping critical core gameplay features. Their developer retention is unmatched.",
    author: "Sarah Kovac",
    role: "Senior Engineering Manager",
    company: "Riot Games",
  },
  {
    quote: "The ability to scale our engineering capacity up or down with qualified candidates matched in under 48 hours has given us a tremendous competitive advantage in managing enterprise project shifts.",
    author: "David Lee",
    role: "VP of Software Engineering",
    company: "Kaplan Assessment",
  },
];

export const TestimonialsSlider: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-background-main relative">
      <Container size="2xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24 flex flex-col gap-4">
          <span className="font-heading text-xs md:text-sm font-bold tracking-wider text-brand-secondary uppercase">
            Client Success
          </span>
          <Heading level={2} size="3xl" className="font-bold tracking-tight text-gray-900">
            What engineering leaders say
          </Heading>
          <Text size="base" variant="muted">
            Read how global brands rely on Devosphere's software developers to execute technical deliverables on-time.
          </Text>
        </div>

        {/* Testimonials grid with fade-in-up animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {clientTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
