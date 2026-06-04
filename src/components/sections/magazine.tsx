"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "../ui/container";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

const articles = [
  {
    type: "banner",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    authorName: "Arnaud Grunwald",
    authorTitle: "Chief Product Officer, ClearCo",
    title: "Arnaud Grunwald on AI, Feedback, and the Future of Performance Management",
    titleColor: "text-brand-primary",
    readTime: "25 min read",
    link: "/resources"
  },
  {
    type: "image",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=400",
    title: "New Tips: How to Hire the Best Software Developers",
    titleColor: "text-black",
    readTime: "12 min read",
    link: "/resources"
  },
  {
    type: "banner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    authorName: "Dustin Clinard,",
    authorTitle: "CEO, Ignis AI",
    title: "AI Literacy: Why Confidence ≠ Capability in Skill Assessment",
    titleColor: "text-black",
    readTime: "23 min read",
    link: "/resources"
  }
];

export const MagazineSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative">
      <Container size="2xl">
        {/* Section Title */}
        <div className="mb-12">
          <Heading level={2} className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl text-left">
            From the Magazine
          </Heading>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col gap-5 w-full group"
            >
              {/* Graphic Block */}
              {article.type === "banner" ? (
                <div className="bg-[#f2effb] h-64 md:h-72 rounded-2xl relative p-8 flex flex-col justify-between overflow-hidden shadow-sm">
                  {/* Decorative diagonal line vectors */}
                  <div className="absolute top-0 right-0 w-28 h-28 opacity-10 border-t-2 border-r-2 border-brand-primary rounded-tr-2xl transform translate-x-2 -translate-y-2" />
                  <div className="absolute bottom-0 left-0 w-28 h-28 opacity-10 border-b-2 border-l-2 border-brand-primary rounded-bl-2xl transform -translate-x-2 translate-y-2" />
                  
                  {/* Banner Title */}
                  <div className="flex flex-col select-none">
                    <span className="font-heading font-black text-3xl tracking-tight text-black leading-none flex items-center gap-1.5">
                      KEEP
                    </span>
                    <span className="font-heading font-black text-3xl tracking-tight text-brand-primary leading-none flex items-center gap-1.5 mt-1">
                      MOVING
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-brand-primary fill-current inline-block">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                      </svg>
                    </span>
                    <span className="font-heading font-black text-3xl tracking-tight text-black leading-none mt-1">
                      FORWARD
                    </span>
                  </div>

                  {/* Overlapping profile card */}
                  <div className="flex items-center bg-white/20 backdrop-blur-[2px] p-2 rounded-2xl w-full border border-white/30 shadow-sm relative z-10">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-brand-primary/20 shrink-0 bg-white shadow-sm">
                      <Image
                        src={article.avatar || ""}
                        alt="Author photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-2.5 bg-[#6d24e5] text-white px-3 py-2 rounded-xl flex-grow flex flex-col justify-center min-h-[4rem] text-left">
                      <span className="font-heading font-bold text-xs md:text-sm leading-tight">
                        {article.authorName}
                      </span>
                      <span className="text-[10px] text-purple-200 mt-0.5 leading-tight font-medium max-w-[160px]">
                        {article.authorTitle}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-64 md:h-72 w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={article.image || ""}
                    alt="Article main photo"
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Title & Details */}
              <div className="flex flex-col gap-2 text-left px-1">
                <Heading level={3} size="lg" className={`font-heading font-bold text-lg md:text-xl leading-snug tracking-tight hover:opacity-85 transition-opacity ${article.titleColor}`}>
                  <Link href={article.link}>{article.title}</Link>
                </Heading>
                <span className="text-xs font-semibold text-gray-500 select-none">
                  {article.readTime}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

