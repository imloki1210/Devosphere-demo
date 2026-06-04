import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function WhoWeArePage() {
  const values = [
    { title: "Trust & Transparency", desc: "Open communications and delivery outcomes over visual hours." },
    { title: "Continuous Growth", desc: "Supporting engineer growth stipends and active developer communities." },
    { title: "Flexible Scaling", desc: "Zero friction in matching, retargeting, and capacity scaling." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 flex flex-col gap-4">
            <span className="text-sm font-heading font-black tracking-wider text-brand-primary uppercase">
              Who We Are
            </span>
            <Heading level={1} size="4xl" className="text-black">
              An Engineering Culture Rooted in Motivation
            </Heading>
            <Text size="lg" className="text-text-muted">
              We built Devosphere to provide the most supportive developer ecosystem in the industry. Motivated engineers write better code.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, index) => (
              <Card key={index} variant="glow" className="p-8 flex flex-col gap-4">
                <Heart className="w-8 h-8 text-brand-primary" />
                <Heading level={3} size="xl" className="text-gray-900">
                  {val.title}
                </Heading>
                <Text size="base" variant="muted">
                  {val.desc}
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
