import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Rocket } from "lucide-react";

export default function CareersPage() {
  const perks = [
    { title: "The Vault Shop", desc: "Redeem bounties and points for high-end dev setups and gear." },
    { title: "X-Outposts", desc: "Annual developer travel and co-working meetups in epic locations." },
    { title: "Growth Retainers", desc: "Paid stipends for courses, books, and language certificates." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 flex flex-col gap-4">
            <span className="text-sm font-heading font-black tracking-wider text-brand-primary uppercase">
              Join the Universe
            </span>
            <Heading level={1} size="4xl" className="text-black">
              Remote Developer Jobs - Unleash Your Potential
            </Heading>
            <Text size="lg" className="text-text-muted">
              We provide long-term remote contracts with major international partners, coupled with an active community support ecosystem.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <Card key={index} variant="glow" className="p-8 flex flex-col gap-4">
                <Rocket className="w-8 h-8 text-brand-primary" />
                <Heading level={3} size="xl" className="text-gray-900">
                  {perk.title}
                </Heading>
                <Text size="base" variant="muted">
                  {perk.desc}
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
