import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function ResourcesPage() {
  const guides = [
    { title: "Remote Work Playbook", desc: "Best practices on timezone management and asynchronous execution." },
    { title: "Hiring Vetted Developers", desc: "How to screen for technical skills and cultural alignment." },
    { title: "Scaling Tech Capacity", desc: "milestone tracking models for product engineering managers." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 flex flex-col gap-4">
            <span className="text-sm font-heading font-black tracking-wider text-brand-primary uppercase">
              Resources & Insights
            </span>
            <Heading level={1} size="4xl" className="text-black">
              Engineering Leadership Playbooks
            </Heading>
            <Text size="lg" className="text-text-muted">
              Discover guides, podcasts, and articles created by remote leaders for remote teams.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <Card key={index} variant="glow" className="p-8 flex flex-col gap-4">
                <BookOpen className="w-8 h-8 text-brand-primary" />
                <Heading level={3} size="xl" className="text-gray-900">
                  {guide.title}
                </Heading>
                <Text size="base" variant="muted">
                  {guide.desc}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
