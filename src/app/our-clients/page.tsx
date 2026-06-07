import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function OurClientsPage() {
  const clients = [
    { name: "Riot Games", impact: "Modernized legacy backend and scaling APIs." },
    { name: "Fox Sports", impact: "Accelerated live video streaming rendering systems." },
    { name: "Kaplan Assessment", impact: "Cleared tech debt backlog in dynamic testing systems." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 flex flex-col gap-4">
            <span className="text-sm font-heading font-black tracking-wider text-brand-primary uppercase">
              Our Clients
            </span>
            <Heading level={1} size="4xl" className="text-black">
              Proven Technical Impact for Global Brands
            </Heading>
            <Text size="lg" className="text-text-muted">
              We help start-ups, scale-ups, and enterprise giants reach their milestones by providing stable, integrated engineering capacity.
            </Text>
          </div>

          <section id="cases" className="scroll-mt-24 pt-4 border-t border-gray-100">
            <Heading level={2} size="2xl" className="text-black font-extrabold tracking-tight mb-8">
              Case Studies
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {clients.map((client, index) => (
                <Card key={index} variant="glow" className="p-8 flex flex-col gap-4">
                  <Award className="w-8 h-8 text-brand-primary" />
                  <Heading level={3} size="xl" className="text-gray-900">
                    {client.name}
                  </Heading>
                  <Text size="base" variant="muted">
                    {client.impact}
                  </Text>
                </Card>
              ))}
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

