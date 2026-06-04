import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "primary",
  children,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-brand-primary/20 text-brand-secondary border border-brand-primary/30",
    secondary: "bg-white/10 text-white border border-white/20",
    accent: "bg-brand-orange/20 text-brand-orange border border-brand-orange/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-heading tracking-wide uppercase border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
