"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Container } from "../ui/container";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

interface CounterProps {
  value: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2.0,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
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
  return (
    <section className="py-16 bg-white relative">
      <Container size="2xl">
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <Heading level={2} size="3xl" className="font-heading font-extrabold text-black tracking-tight text-3xl md:text-4xl">
            Why Devosphere?
          </Heading>
        </div>

        {/* 3-Column Stats Grid with vertical dividers and top/bottom borders */}
        <div className="border-y border-gray-100 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 py-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center p-6 first:pt-0 last:pb-0 md:py-6 group">
                <Heading
                  level={3}
                  size="4xl"
                  className="font-bold font-heading text-black text-5xl md:text-6xl tracking-tight mb-2"
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </Heading>
                <Text size="sm" className="font-heading font-semibold tracking-widest uppercase text-gray-500 text-xs">
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

