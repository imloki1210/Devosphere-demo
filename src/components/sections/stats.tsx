"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Container } from "../ui/container";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

interface CounterProps {
  value: number;
  suffix?: string;
  trigger: boolean;
}

const Counter: React.FC<CounterProps> = ({ value, suffix = "", trigger }) => {
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

  return (
    <span>
      {isClient ? Math.round(displayValue) : "0"}
      {suffix}
    </span>
  );
};

const stats = [
  { value: 18, suffix: "+", label: "Years Exp" },
  { value: 98, suffix: "%", label: "Retention Rate" },
  { value: 60, suffix: "+", label: "Countries" },
];

export const StatsCounter: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 bg-white relative overflow-hidden">
      <Container size="2xl">
        {/* Centered Heading with slide up scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
            Why Devosphere?
          </Heading>
        </motion.div>

        {/* 3-Column Stats Grid with slide up scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="border-y border-gray-100 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 py-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center p-6 first:pt-0 last:pb-0 md:py-6 group">
                <Heading
                  level={3}
                  size="4xl"
                  className="font-bold font-heading text-black text-5xl md:text-6xl tracking-tight mb-2"
                >
                  <Counter value={stat.value} suffix={stat.suffix} trigger={inView} />
                </Heading>
                <Text size="sm" className="font-heading font-semibold tracking-widest uppercase text-gray-500 text-xs">
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};


