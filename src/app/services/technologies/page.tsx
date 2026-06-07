"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const techAlphabet = [
  { letter: "A", items: ["AWS", "Android", "Angular", "Ansible", "Apollo GraphQL"] },
  { letter: "B", items: ["Backbone.js", "Bash / Shell"] },
  { letter: "C", items: ["C#", "C++", "Cassandra", "Cloudflare", "Clojure"] },
  { letter: "D", items: ["Django", "Docker", "DynamoDB", "D3.js", "Dart"] },
  { letter: "E", items: ["Elasticsearch", "Express.js"] },
  { letter: "F", items: ["Firebase", "Flutter"] },
  { letter: "G", items: ["Go (Golang)", "GraphQL", "GCP (Google Cloud)", "Gatsby"] },
  { letter: "I", items: ["iOS (Swift/Obj-C)", "Ionic"] },
  { letter: "J", items: ["Java", "JavaScript", "JUnit", "Julia", "Jenkins"] },
  { letter: "K", items: ["Kotlin", "Kubernetes"] },
  { letter: "L", items: ["Laravel", "Lisp"] },
  { letter: "M", items: ["MongoDB", "MariaDB", "MySQL", "Microsoft SQL Server"] },
  { letter: "N", items: ["Next.js", "Node.js"] },
  { letter: "P", items: ["PostgreSQL", "Python", "PHP"] },
  { letter: "R", items: ["React", "React Native", "Rust", "Ruby on Rails", "Ruby"] },
  { letter: "S", items: ["Spring Boot", "Svelte", "SwiftUI", "Scala"] },
  { letter: "T", items: ["TypeScript", "Tailwind CSS", "Terraform"] },
  { letter: "U", items: ["Ubuntu Server", "Unity 3D"] },
  { letter: "V", items: ["Vue.js", "Vite"] }
];

export default function TechnologiesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredAlphabet = techAlphabet.map((section) => {
    const filteredItems = section.items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...section, items: filteredItems };
  }).filter((section) => section.items.length > 0);

  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary selection:bg-brand-primary">
      <Header />
      
      {/* 1. Hero Header */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-gradient-to-bl from-brand-primary/5 via-brand-primary/2 to-transparent blur-[120px] pointer-events-none" />
        <Container size="2xl" className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            <span className="text-sm font-heading font-black tracking-wider text-brand-primary uppercase">
              Technology Stack
            </span>
            <Heading level={1} size="4xl" className="font-heading font-extrabold text-black leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl">
              Your stock, covered
            </Heading>
            <Text size="lg" className="text-text-muted max-w-xl mx-auto leading-relaxed">
              Get matched with elite developers across every major programming language, database, cloud setup, and software framework.
            </Text>
            
            {/* Search Input Bar */}
            <div className="max-w-md mx-auto w-full mt-4">
              <input
                type="text"
                placeholder="Search technologies (e.g. React, Python)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm shadow-sm"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Alphabetical Stack Grid */}
      <section className="py-20 bg-white">
        <Container size="2xl">
          <div className="max-w-5xl mx-auto flex flex-col gap-12">
            {filteredAlphabet.length > 0 ? (
              filteredAlphabet.map((section, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-8 border-b border-gray-100 last:border-b-0 last:pb-0">
                  {/* Left Column (Alphabet Heading) */}
                  <div className="md:col-span-2 text-left">
                    <Heading level={2} size="3xl" className="font-heading font-black text-brand-primary">
                      {section.letter}
                    </Heading>
                  </div>
                  {/* Right Column (Technology Cards) */}
                  <div className="md:col-span-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-left">
                    {section.items.map((item, itemIdx) => (
                      <Card 
                        key={itemIdx} 
                        variant="glow" 
                        hoverEffect={true}
                        className="p-4 border border-gray-150 flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-heading font-bold text-sm text-gray-800 group-hover:text-brand-primary transition-colors">
                          {item}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-brand-primary/5 text-brand-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] font-black">→</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Text size="lg" className="text-text-muted">
                  No technologies match your search query.
                </Text>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* 3. CTA Banner */}
      <section className="py-20 bg-gradient-to-tr from-brand-primary/5 via-brand-primary/2 to-transparent border-t border-gray-100">
        <Container size="2xl" className="text-center">
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
              Don't see what you're looking for?
            </Heading>
            <Text size="lg" className="text-text-muted">
              Our talent network has coverage across hundreds of additional libraries, frameworks, and legacy databases. Reach out to verify coverage.
            </Text>
            <div className="flex justify-center mt-2">
              <Button variant="primary" size="lg" href="/contact" className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-bold rounded-md px-8 py-3.5 shadow-md w-full sm:w-auto text-center">
                Verify Stack Coverage
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
