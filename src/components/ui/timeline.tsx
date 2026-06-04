import * as React from "react";
import { Heading } from "./heading";
import { Text } from "./text";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  number: string;
  title: string;
  description: string;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items, className, ...props }) => {
  return (
    <div className={cn("relative pl-6 md:pl-8 border-l border-white/10 space-y-12 md:space-y-16", className)} {...props}>
      {items.map((item, index) => (
        <div key={index} className="relative group">
          {/* Timeline Dot Indicator */}
          <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-background-main border-2 border-brand-primary group-hover:scale-125 transition-transform duration-200" />
          
          <div className="flex flex-col gap-2">
            <span className="font-heading text-xs font-bold tracking-wider text-brand-secondary uppercase">
              {item.number}
            </span>
            <Heading level={3} size="xl" className="text-white group-hover:text-brand-secondary transition-colors duration-200">
              {item.title}
            </Heading>
            <Text size="base" variant="muted" className="max-w-2xl">
              {item.description}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};
