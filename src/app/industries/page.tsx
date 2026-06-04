import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Landmark } from "lucide-react";

export default function IndustriesPage() {
  const industries = [
    { title: "Fintech & Payments", focus: "Secure transactions, compliance, and ledger database scaling." },
    { title: "Gaming & Entertainment", focus: "API optimization, live operations support, and matchmakers." },
    { title: "HealthTech & MedTech", focus: "HIPAA compliance integrations, patient flows, and portal scaling." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 flex flex-col gap-4">
            <span className="text-sm font-heading font-black tracking-wider text-brand-primary uppercase">
              Industries We Serve
            </span>
            <Heading level={1} size="4xl" className="text-black">
              Domain Expertise Across High-Growth Sectors
            </Heading>
            <Text size="lg" className="text-text-muted">
              Our engineers hold deep knowledge of industry-specific compliance rules, security frameworks, and layout scales.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.map((ind, index) => (
              <Card key={index} variant="glow" className="p-8 flex flex-col gap-4">
                <Landmark className="w-8 h-8 text-brand-primary" />
                <Heading level={3} size="xl" className="text-gray-900">
                  {ind.title}
                </Heading>
                <Text size="base" variant="muted">
                  {ind.focus}
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
