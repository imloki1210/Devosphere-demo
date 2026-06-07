"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Laptop, Database, Globe, Network, Smartphone, Palette, Cpu, Zap, ShoppingCart, 
  ShieldCheck, Wrench, RefreshCw, Key, Settings, ArrowRightLeft, 
  Cloud, Link2, Radio, Wallet, Workflow, Activity, Brain, Server, Share2
} from "lucide-react";

const devServices = [
  { icon: Laptop, title: "Front-End Development", desc: "Build responsive, high-performance user interfaces using modern frameworks like React, Next.js, Angular, and Vue.js." },
  { icon: Database, title: "Back-End Development", desc: "Design scalable backend architectures, serverless systems, and business logic using Node.js, Java, Python, Go, and .NET." },
  { icon: Globe, title: "Web Application Development", desc: "Engineered single-page apps (SPA) and multi-tenant SaaS products that scale seamlessly to millions of active users." },
  { icon: Network, title: "API Development", desc: "Develop secure, compliant, and highly structured RESTful, GraphQL, and gRPC APIs to enable robust system integration." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Design and code native iOS/Android applications and hybrid apps using React Native, Swift, Kotlin, and Flutter." },
  { icon: Palette, title: "UI/UX Design", desc: "Craft intuitive user journeys, wireframes, prototypes, and comprehensive visual design systems for digital platforms." },
  { icon: Cpu, title: "MVP Development", desc: "Rapidly translate ideas into working product iterations for market validation, user testing, and seed fundraising stages." },
  { icon: Zap, title: "Progressive Web Applications (PWA)", desc: "Build installable, lightning-fast web applications with offline capabilities, push notifications, and native-like feel." },
  { icon: ShoppingCart, title: "E-commerce Development", desc: "Develop custom shopping platforms, secure payment integrations, catalog databases, and checkout optimization." }
];

const qaServices = [
  { icon: ShieldCheck, title: "Software Testing & QA", desc: "Execute comprehensive manual checks and automated end-to-end tests (Playwright, Selenium) to release bug-free code." },
  { icon: Wrench, title: "Maintenance & Support", desc: "Maintain system health, address regression errors, monitor server workloads, and provide ongoing product updates." },
  { icon: RefreshCw, title: "Modernization", desc: "Refactor legacy code bases, upgrade package dependencies, and eliminate technical debt to restore engineering velocity." },
  { icon: Key, title: "Cybersecurity", desc: "Conduct compliance audits, penetration testing, automated vulnerability scans, and implement OAuth security standards." },
  { icon: Settings, title: "DevOps", desc: "Build robust CI/CD pipelines, containerize apps with Docker/Kubernetes, and deploy cloud resources via Infrastructure-as-Code." },
  { icon: ArrowRightLeft, title: "Migration", desc: "Migrate legacy databases, update monoliths into microservices, and transition web assets to cloud infrastructure." }
];

const cloudServices = [
  { icon: Cloud, title: "Cloud Computing", desc: "Architect, optimize, and manage highly scalable cloud platforms on Amazon Web Services (AWS), Google Cloud (GCP), and Azure." },
  { icon: Link2, title: "Blockchain Software Development", desc: "Build decentralized apps (dApps), smart contracts, token structures, and secure distributed ledger solutions." },
  { icon: Radio, title: "Internet of Things", desc: "Design firmware pipelines, manage hardware telemetry feeds, and connect physical IoT devices to secure cloud platforms." },
  { icon: Wallet, title: "Digital Wallets & Cryptocurrencies", desc: "Integrate multi-currency digital wallets, secure payment gateways, cryptographic ledgers, and transaction platforms." },
  { icon: Workflow, title: "Process Automation", desc: "Automate complex manual operations, integrate Robotic Process Automation (RPA), and design unified software triggers." },
  { icon: Activity, title: "Machine Learning", desc: "Train custom neural models, configure predictive pipelines, and process huge data sets using Python and TensorFlow." },
  { icon: Brain, title: "Artificial Intelligence", desc: "Integrate Generative AI models, optimize LLM responses (RAG), and deploy autonomous AI agents inside your product flows." },
  { icon: Server, title: "Database Development", desc: "Optimize relational schemas (PostgreSQL, MySQL), configure NoSQL stores (MongoDB, Redis), and scale data clusters." },
  { icon: Share2, title: "API & Integration", desc: "Connect enterprise ERPs, CRM systems, payment rails, and third-party SaaS services with custom communication layers." }
];

const techTags = [
  "React", "Angular", "Vue.js", "JavaScript", "TypeScript",
  "Node.js", "Java", "Python", ".NET", "PHP", "Ruby on Rails",
  "Snowflake", "Databricks", "dbt", "Tableau", "Power BI"
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary selection:bg-brand-primary">
      <Header />
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-16 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-gradient-to-bl from-brand-primary/5 via-brand-primary/2 to-transparent blur-[120px] pointer-events-none" />
        <Container size="2xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center text-left">
            {/* Left Info Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="lg:col-span-6 flex flex-col gap-6"
            >
              <span className="text-sm md:text-base font-heading font-black tracking-wider text-brand-primary uppercase">
                Our Offerings
              </span>
              <Heading level={1} size="4xl" className="font-heading font-extrabold text-black leading-[1.1] tracking-tight">
                Comprehensive Software Development Solutions
              </Heading>
              <Text size="lg" className="text-text-muted max-w-xl leading-relaxed">
                Full-stack development, QA testing, cloud engineering, and database management solutions. We build and manage high-performing teams of developers to accelerate your product roadmap.
              </Text>
              <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full sm:w-auto">
                <Button variant="primary" size="lg" href="/contact" className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-bold rounded-md px-6 py-3.5 shadow-md w-full sm:w-auto text-center">
                  Talk to An Expert
                </Button>
                <div className="text-sm md:text-base text-gray-500 font-heading font-medium">
                  Looking for a job?{" "}
                  <Link href="/careers" className="text-brand-primary hover:text-brand-secondary font-bold underline transition-colors">
                    Explore Open Positions
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Diamond Image Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="lg:col-span-6 flex items-center justify-center relative min-h-[350px] md:min-h-[450px]"
            >
              <div className="relative w-[280px] md:w-[380px] h-[280px] md:h-[380px]">
                {/* Top Left Diamond */}
                <div className="absolute top-0 left-[10%] w-[160px] md:w-[210px] h-[160px] md:h-[210px] z-20 group">
                  <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(109,36,229,0.15)] rounded-2xl md:rounded-[24px] transition-all duration-300">
                    <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
                        alt="Software Solutions Workspace"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 160px, 210px"
                      />
                    </div>
                  </div>
                </div>
                {/* Bottom Right Diamond */}
                <div className="absolute bottom-0 right-[5%] w-[160px] md:w-[210px] h-[160px] md:h-[210px] z-10 group">
                  <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(109,36,229,0.15)] rounded-2xl md:rounded-[24px] transition-all duration-300">
                    <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                        alt="Engineer smiling"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 160px, 210px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. Software Development & Design Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 text-left">
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight mb-3">
              Software Development & Design
            </Heading>
            <Text size="lg" className="text-text-muted">
              Tailored engineering squads to design, build, and deploy custom software products.
            </Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <Card variant="glow" className="p-6 border border-gray-150 h-full flex flex-col justify-start gap-4 text-left">
                    <div className="w-10 h-10 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Heading level={3} size="base" className="text-gray-900 font-extrabold tracking-tight">
                        {service.title}
                      </Heading>
                      <Text size="sm" variant="muted" className="leading-relaxed">
                        {service.desc}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. QA, Testing, Maintenance & Modernization Section */}
      <section className="py-20 bg-[#fbfaff] border-t border-gray-100">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 text-left">
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight mb-3">
              QA, Testing, Maintenance & Modernization
            </Heading>
            <Text size="lg" className="text-text-muted">
              Ensure your software remains secure, stable, and performing at scale.
            </Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qaServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <Card variant="glow" className="p-6 border border-gray-150 h-full flex flex-col justify-start gap-4 text-left">
                    <div className="w-10 h-10 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Heading level={3} size="base" className="text-gray-900 font-extrabold tracking-tight">
                        {service.title}
                      </Heading>
                      <Text size="sm" variant="muted" className="leading-relaxed">
                        {service.desc}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. Cloud & Advanced Technologies Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <Container size="2xl">
          <div className="max-w-3xl mb-16 text-left">
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight mb-3">
              Cloud & Advanced Technologies
            </Heading>
            <Text size="lg" className="text-text-muted">
              Leverage advanced software engineering solutions to stay ahead in the market.
            </Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cloudServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <Card variant="glow" className="p-6 border border-gray-150 h-full flex flex-col justify-start gap-4 text-left">
                    <div className="w-10 h-10 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Heading level={3} size="base" className="text-gray-900 font-extrabold tracking-tight">
                        {service.title}
                      </Heading>
                      <Text size="sm" variant="muted" className="leading-relaxed">
                        {service.desc}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. Technologies List Section */}
      <section className="py-20 bg-[#f5f2fa] border-t border-gray-100 text-center">
        <Container size="xl">
          <div className="max-w-2xl mx-auto mb-12 flex flex-col gap-3">
            <Heading level={2} size="2xl" className="font-heading font-extrabold text-black tracking-tight">
              Technologies
            </Heading>
            <Text size="base" className="text-text-muted">
              Tech talent matching every major coding stack and ecosystem.
            </Text>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {techTags.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-white border border-gray-200 text-gray-800 text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:border-brand-primary/40 hover:shadow-sm transition-all duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. CTA Let's Get Started Banner */}
      <section className="py-20 bg-gradient-to-tr from-brand-primary/5 via-brand-primary/2 to-transparent border-t border-gray-100">
        <Container size="2xl" className="text-center">
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
              Let's Get Started
            </Heading>
            <Text size="lg" className="text-text-muted">
              Accelerate your product engineering today. Connect with us to deploy vetted developers.
            </Text>
            <div className="flex justify-center mt-2">
              <Button variant="primary" size="lg" href="/contact" className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-bold rounded-md px-8 py-3.5 shadow-md w-full sm:w-auto text-center">
                Schedule a Call
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
