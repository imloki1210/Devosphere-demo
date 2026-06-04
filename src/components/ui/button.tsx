"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "glowing" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, onClick, children, type = "button", disabled = false }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-heading font-semibold transition-all duration-200 outline-none select-none active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none";
    
    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-sm",
      md: "text-sm md:text-base px-5 py-2.5 rounded-default",
      lg: "text-base md:text-lg px-8 py-3.5 rounded-md",
    };

    const variantStyles = {
      primary: "bg-brand-primary text-white border border-brand-primary hover:bg-brand-secondary hover:border-brand-secondary hover:shadow-glow",
      secondary: "bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5",
      accent: "bg-brand-red text-white border border-brand-red hover:bg-brand-red/90 hover:shadow-[0_0_20px_rgba(226,27,34,0.4)]",
      ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
      glowing: "relative bg-brand-primary text-white border border-brand-primary hover:bg-brand-secondary hover:border-brand-secondary shadow-glow hover:shadow-intense-glow",
    };

    const MotionComponent = motion.button;
    const MotionLink = motion.create(Link);

    const animationConfig = {
      whileHover: { y: -2, scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] as const }
    };

    if (href) {
      return (
        <MotionLink
          href={href}
          onClick={onClick as any}
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
          {...animationConfig}
        >
          {variant === "glowing" && (
            <span className="absolute inset-0 -z-10 rounded-default bg-brand-primary blur-md opacity-50 animate-pulse" />
          )}
          {children}
        </MotionLink>
      );
    }

    return (
      <MotionComponent
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...animationConfig}
      >
        {variant === "glowing" && (
          <span className="absolute inset-0 -z-10 rounded-default bg-brand-primary blur-md opacity-50 animate-pulse" />
        )}
        {children}
      </MotionComponent>
    );
  }
);

Button.displayName = "Button";
