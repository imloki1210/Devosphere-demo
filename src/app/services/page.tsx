import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ServicesPage() {
  const servicesList = [
    {
      title: "Staff Augmentation",
      description: "Scale your capacity instantly with vetted remote engineers who integrate into your workflow.",
    },
    {
      title: "Dedicated Teams",
      description: "Get full-time cross-functional engineering teams focused on building your custom product architecture.",
    },
    {
      title: "Legacy Code Migration",
      description: "Modernize outdated systems, resolve tech debt, and rebuild using modern frameworks safely.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 flex flex-col gap-4">
            <span className="text-sm font-heading font-black tracking-wider text-brand-primary uppercase">
              Our Services
            </span>
            <Heading level={1} size="4xl" className="text-black">
              Engineering Solutions Tailored to Your Scaling Needs
            </Heading>
            <Text size="lg" className="text-text-muted">
              We provide highly motivated software engineers and dedicated teams to clear backlogs, accelerate product releases, and build scalable systems.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesList.map((service, index) => (
              <Card key={index} variant="glow" className="p-8 flex flex-col gap-4">
                <CheckCircle className="w-8 h-8 text-brand-primary" />
                <Heading level={3} size="xl" className="text-gray-900">
                  {service.title}
                </Heading>
                <Text size="base" variant="muted">
                  {service.description}
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
