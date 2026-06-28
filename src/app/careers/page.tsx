"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate, useInView, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, Code, Rocket, ChevronLeft, ChevronRight } from "lucide-react";

interface CounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  trigger: boolean;
}

const Counter: React.FC<CounterProps> = ({ value, decimals = 0, suffix = "", prefix = "", trigger }) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const [isClient, setIsClient] = React.useState(false);
  const hasRunRef = React.useRef(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient || !trigger || hasRunRef.current) return;
    hasRunRef.current = true;

    const startTime = performance.now();
    const duration = 2000;
    let frameId: number;

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      setDisplayValue(easeProgress * value);

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCounter);
      }
    };

    frameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frameId);
  }, [isClient, trigger, value]);

  const formatted = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.round(displayValue);

  return (
    <span>
      {prefix}
      {isClient ? formatted : "0"}
      {suffix}
    </span>
  );
};

const perks = [
  {
    icon: Users,
    title: "Work Globally – But Not Alone",
    desc: "Active collaborative culture with access to community leaders, seasonal missions, and active developer collaborations."
  },
  {
    icon: Code,
    title: "Contribute to High-Impact Projects",
    desc: "Write code for major global brands. Work on long-term contracts that challenge you and build your professional profile."
  },
  {
    icon: Award,
    title: "Invest in Your Personal & Professional Growth",
    desc: "Get paid to learn. Access funding for courses, certifications, language programs, and technical books."
  },
  {
    icon: Rocket,
    title: "Feel Your Growth with Flexible L&D Benefits",
    desc: "Redeem bounties and points earned during projects for high-end dev setups, mechanical keyboards, and custom gear."
  }
];

const timelineSteps = [
  {
    title: "Devosphere Wizards",
    desc: "Dedicated community guides supporting you from onboarding through every phase of your contract delivery."
  },
  {
    title: "Devosphere Academy",
    desc: "Full funding for technical certifications, leadership training, and languages to keep your skills state-of-the-art."
  },
  {
    title: "Devosphere Universe",
    desc: "Interactive seasonal missions, coding challenges, custom ranks, and a vibrant Slack developer hub."
  },
  {
    title: "Devosphere Outposts",
    desc: "Annual, fully funded developer travel and co-working meetups at exotic locations across the globe."
  }
];

const quotes = [
  {
    text: "The opportunity to work with A-class clients where you feel valued and grow professionally every day.",
    role: "Full Stack Developer"
  },
  {
    text: "The culture here is unmatched. They are always looking for ways to keep developer motivation high.",
    role: "Backend Architect"
  },
  {
    text: "Flexible company, awesome projects, and a very supportive community.",
    role: "Frontend Engineer"
  }
];

export default function CareersPage() {
  const statsRef = React.useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const communityRef = React.useRef<HTMLDivElement>(null);
  const isCommunityInView = useInView(communityRef, { once: true, margin: "-50px" });

  // Testimonial slider state for mobile/tablet
  const [activeQuote, setActiveQuote] = React.useState(0);

  // Dynamic Openings state
  interface JobItem {
    id: string;
    title: string;
    dept: string;
  }
  const [openings, setOpenings] = React.useState<JobItem[]>([]);
  const [loadingOpenings, setLoadingOpenings] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOpenings(data);
        }
      })
      .catch((err) => {
        console.error("Error loading jobs:", err);
      })
      .finally(() => {
        setLoadingOpenings(false);
      });
  }, []);

  const nextQuote = () => {
    setActiveQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setActiveQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-main text-text-primary selection:bg-brand-primary">
      <Header />
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-16 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-gradient-to-bl from-brand-primary/5 via-brand-primary/2 to-transparent blur-[120px] pointer-events-none" />
        <Container size="2xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Info Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="lg:col-span-6 flex flex-col gap-6 text-left"
            >
              <span className="text-sm md:text-base font-heading font-black tracking-wider text-brand-primary uppercase">
                Keep Moving Forward
              </span>
              <Heading level={1} size="4xl" className="font-heading font-extrabold text-black leading-[1.1] tracking-tight">
                Work Without Borders, Grow Without Limits
              </Heading>
              <Text size="lg" className="text-text-muted max-w-xl leading-relaxed">
                Active global contracts with major international partners, coupled with a highly supportive developer community and career growth ecosystem.
              </Text>
              <div className="mt-4">
                <Button variant="primary" size="lg" href="#roles" className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-bold rounded-md px-6 py-3.5">
                  Explore Opportunities
                </Button>
              </div>
            </motion.div>

            {/* Right Overlapping Portraits Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="lg:col-span-6 flex items-center justify-center relative min-h-[350px] md:min-h-[450px]"
            >
              <div className="relative w-[280px] md:w-[380px] h-[280px] md:h-[380px]">
                {/* Top Left Diamond Portrait */}
                <div className="absolute top-0 left-[10%] w-[160px] md:w-[210px] h-[160px] md:h-[210px] z-20 group">
                  <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(109,36,229,0.15)] rounded-2xl md:rounded-[24px] transition-all duration-300">
                    <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                        alt="Developer portrait"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 160px, 210px"
                      />
                    </div>
                  </div>
                </div>
                {/* Bottom Right Diamond Portrait */}
                <div className="absolute bottom-0 right-[5%] w-[160px] md:w-[210px] h-[160px] md:h-[210px] z-10 group">
                  <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(109,36,229,0.15)] rounded-2xl md:rounded-[24px] transition-all duration-300">
                    <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                        alt="Developer portrait"
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

      {/* 2. Stats Section */}
      <section ref={statsRef} className="py-16 bg-white relative border-b border-gray-100">
        <Container size="2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-center mb-12"
          >
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
              Why Devosphere?
            </Heading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="border-y border-gray-100 max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 py-12">
              <div className="flex flex-col items-center justify-center text-center p-6">
                <Heading level={3} className="font-bold font-heading text-black text-5xl md:text-6xl tracking-tight mb-2">
                  <Counter value={4.8} decimals={1} prefix="★ " trigger={isStatsInView} />
                </Heading>
                <Text size="sm" className="font-heading font-semibold tracking-widest uppercase text-gray-500 text-xs">
                  Glassdoor Rating
                </Text>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-6">
                <Heading level={3} className="font-bold font-heading text-black text-5xl md:text-6xl tracking-tight mb-2">
                  <Counter value={12} suffix="+" trigger={isStatsInView} />
                </Heading>
                <Text size="sm" className="font-heading font-semibold tracking-widest uppercase text-gray-500 text-xs">
                  Months Avg Tenure
                </Text>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-6">
                <Heading level={3} className="font-bold font-heading text-black text-5xl md:text-6xl tracking-tight mb-2">
                  <Counter value={15} suffix="%" trigger={isStatsInView} />
                </Heading>
                <Text size="sm" className="font-heading font-semibold tracking-widest uppercase text-gray-500 text-xs">
                  Referral Rate
                </Text>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <Container size="2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
                >
                  <Card variant="glow" className="p-8 border border-gray-150 h-full flex flex-col justify-start gap-5">
                    <div className="w-12 h-12 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Heading level={3} size="xl" className="text-gray-900 font-extrabold tracking-tight">
                        {perk.title}
                      </Heading>
                      <Text size="base" variant="muted" className="leading-relaxed">
                        {perk.desc}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. Active Diverse Global Community Section */}
      <section ref={communityRef} className="py-24 bg-[#f5f2fa] relative overflow-hidden">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Grid: 2 rotated diamond developer profiles */}
            <div className="lg:col-span-6 flex justify-center items-center relative min-h-[320px] md:min-h-[420px]">
              <div className="relative w-[280px] md:w-[360px] h-[280px] md:h-[360px]">
                <div className="absolute top-0 left-0 w-[150px] md:w-[190px] h-[150px] md:h-[190px] z-20 group">
                  <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] rounded-2xl md:rounded-[20px] transition-all">
                    <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                        alt="Community Dev profile"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 150px, 190px"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[5%] right-[5%] w-[150px] md:w-[190px] h-[150px] md:h-[190px] z-10 group">
                  <div className="relative w-full h-full rotate-45 overflow-hidden border-4 md:border-[6px] border-white shadow-[0_10px_25px_rgba(0,0,0,0.06)] rounded-2xl md:rounded-[20px] transition-all">
                    <div className="absolute top-1/2 left-1/2 w-[142%] h-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=3.0&w=400&h=400&q=80"
                        alt="Community Dev profile"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 150px, 190px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Timeline points */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isCommunityInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="lg:col-span-6 flex flex-col gap-8 text-left"
            >
              <div className="mb-4">
                <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight mb-3">
                  Join an Active, Diverse Global Community
                </Heading>
                <Text size="base" className="text-text-muted">
                  Devosphere is committed to creating the ultimate work experience for software engineers globally.
                </Text>
              </div>
              <div className="flex flex-col gap-6">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 flex items-center justify-center font-heading font-black text-xs shrink-0 shadow-sm mt-0.5">
                      ✓
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <Heading level={3} size="base" className="text-black font-extrabold tracking-tight">
                        {step.title}
                      </Heading>
                      <Text size="sm" variant="muted" className="leading-relaxed">
                        {step.desc}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 5. What Engineers Say Testimonials Section */}
      <section className="py-20 bg-white relative">
        <Container size="2xl">
          <div className="mb-12">
            <Heading level={2} className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl text-left">
              What Devosphere Engineers Say About Working Here
            </Heading>
          </div>

          {/* Desktop/Tablet side-by-side layout, Mobile single slider with transitions */}
          <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
            {quotes.map((quote, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="flex"
              >
                <div className="border border-gray-200 rounded-lg p-8 flex flex-col justify-between h-full hover:shadow-sm transition-all duration-300 w-full bg-white text-left">
                  <div className="flex flex-col gap-4">
                    <svg className="w-8 h-8 text-brand-primary opacity-20 fill-current" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.988zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <Heading level={4} size="lg" className="font-heading font-extrabold text-gray-900 leading-snug tracking-tight text-lg">
                      "{quote.text}"
                    </Heading>
                  </div>
                  <div className="border-t border-gray-50 pt-4 mt-6">
                    <span className="text-xs text-brand-primary font-bold uppercase tracking-wider">{quote.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile-only interactive slider */}
          <div className="block md:hidden relative mb-8 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 rounded-lg p-6 flex flex-col justify-between h-full bg-white text-left"
              >
                <div className="flex flex-col gap-4">
                  <svg className="w-6 h-6 text-brand-primary opacity-20 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.988zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <Heading level={4} size="base" className="font-heading font-extrabold text-gray-900 leading-snug tracking-tight">
                    "{quotes[activeQuote].text}"
                  </Heading>
                </div>
                <div className="border-t border-gray-50 pt-4 mt-6">
                  <span className="text-xs text-brand-primary font-bold uppercase tracking-wider">{quotes[activeQuote].role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls visible on mobile for sliding, and simple design aesthetics for desktop */}
          <div className="flex items-center gap-3 justify-start pl-1">
            <button 
              onClick={prevQuote}
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-all select-none cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextQuote}
              className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-all select-none cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </Container>
      </section>

      {/* 6. Active Careers Open Roles Lists */}
      <section id="roles" className="scroll-mt-24 py-20 border-t border-gray-100 bg-white">
        <Container size="xl">
          <div className="max-w-3xl mb-12 text-center mx-auto">
            <Heading level={2} size="3xl" className="text-black font-extrabold tracking-tight">
              Open Contracts
            </Heading>
            <Text size="base" className="text-text-muted mt-3">
              Apply to our active developer pool. Once vetted, you will be matched with long-term international engineering contracts.
            </Text>
          </div>
          <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            {loadingOpenings ? (
              <div className="text-center py-8 text-gray-500 font-semibold">
                Loading open positions...
              </div>
            ) : openings.length === 0 ? (
              <div className="border border-dashed border-gray-300 rounded-2xl p-10 bg-white text-center">
                <Text size="base" variant="muted">
                  There are currently no active openings. Please check back later!
                </Text>
              </div>
            ) : (
              openings.map((job) => (
                <div key={job.id} className="border border-black rounded-2xl p-6 bg-white flex flex-row items-center justify-between gap-4 w-full">
                  <div className="flex flex-col text-left">
                    <Link href={`/careers/${job.id}`} className="hover:text-brand-primary transition-colors">
                      <h3 className="font-heading font-extrabold text-base md:text-lg text-black leading-snug">{job.title}</h3>
                    </Link>
                    <span className="text-xs md:text-sm text-gray-500 font-medium mt-1">{job.dept}</span>
                  </div>
                  <Button variant="primary" size="md" href={`/careers/${job.id}`} className="bg-[#6d24e5] hover:bg-[#5b21b9] border-[#6d24e5] text-white font-bold rounded-lg px-6 py-2.5 shrink-0">
                    View Details
                  </Button>
                </div>
              ))
            )}
          </div>
        </Container>
      </section>

      {/* 7. CTA Career Banner */}
      <section className="py-20 bg-gradient-to-tr from-brand-primary/5 via-brand-primary/2 to-transparent border-t border-gray-100">
        <Container size="2xl" className="text-center">
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
              Keep Your Career Moving Forward with Devosphere
            </Heading>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
              <Button variant="primary" size="lg" href="/apply" className="bg-brand-primary hover:bg-brand-secondary border-brand-primary text-white font-bold rounded-md px-8 py-3.5 shadow-md w-full sm:w-auto text-center">
                Apply Here
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
