"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "variant"> {
  variant?: "glass" | "glow" | "featured";
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "glass", hoverEffect = true, children, ...props }, ref) => {
    
    const baseStyles = "rounded-lg border overflow-hidden relative transition-all duration-300";
    
    const variantStyles = {
      glass: "bg-white/80 backdrop-blur-md border-black/5 shadow-sm",
      glow: "bg-white border-black/5 hover:border-brand-primary/30 hover:shadow-glow shadow-sm",
      featured: "bg-gray-50 border-black/5 relative min-h-[350px] flex flex-col justify-end p-6 md:p-8",
    };

    const hoverAnimation = hoverEffect
      ? {
          whileHover: { y: -6, scale: 1.01 },
          transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] as const }
        }
      : {};

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...hoverAnimation}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
