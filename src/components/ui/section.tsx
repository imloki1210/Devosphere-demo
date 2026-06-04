import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "main" | "darker" | "muted" | "transparent";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "lg", background = "transparent", children, ...props }, ref) => {
    const spacingClasses = {
      none: "py-0",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-20",
      lg: "py-20 md:py-32",
      xl: "py-24 md:py-40",
    };

    const backgroundClasses = {
      main: "bg-background-main",
      darker: "bg-background-darker",
      muted: "bg-background-muted",
      transparent: "bg-transparent",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "w-full relative overflow-hidden",
          spacingClasses[spacing],
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
