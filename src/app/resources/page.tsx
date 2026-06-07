import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { BookOpen, Newspaper } from "lucide-react";

export default function ResourcesPage() {
  const guides = [
    { title: "Asynchronous Work Playbook", desc: "Best practices on timezone management and asynchronous execution." },
    { title: "Hiring Vetted Developers", desc: "How to screen for technical skills and cultural alignment." },
    { title: "Scaling Tech Capacity", desc: "Milestone tracking models for product engineering managers." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <Container size="2xl">
          {/* Hero Header */}
          <div className="max-w-3xl mb-20 flex flex-col gap-4">
            <span className="text-sm font-heading font-black tracking-wider text-brand-primary uppercase">
              Resources & Insights
            </span>
            <Heading level={1} size="4xl" className="text-black">
              Engineering Leadership Playbooks
            </Heading>
            <Text size="lg" className="text-text-muted">
              Discover guides and articles created by industry leaders for high-performing engineering teams.
            </Text>
          </div>



          {/* Section 2: Developer Guide */}
          <section id="guide" className="scroll-mt-24 pt-16 border-t border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="w-12 h-12 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
                <Heading level={2} size="2xl" className="text-black font-extrabold tracking-tight">
                  Developer Guide
                </Heading>
                <Text size="base" className="text-text-muted">
                  Comprehensive guides designed to help engineering managers onboard new developers and design optimal development pipelines.
                </Text>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {guides.map((guide, index) => (
                  <Card key={index} variant="glow" className="p-6 border border-gray-150 flex flex-col gap-3">
                    <Heading level={3} size="base" className="font-bold text-black">{guide.title}</Heading>
                    <Text size="sm" variant="muted">{guide.desc}</Text>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

