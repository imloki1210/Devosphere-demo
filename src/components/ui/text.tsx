import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "base" | "lg" | "xl";
  variant?: "primary" | "secondary" | "muted" | "dark";
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size = "base", variant = "secondary", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "text-sm leading-relaxed",
      base: "text-base leading-relaxed",
      lg: "text-lg leading-relaxed",
      xl: "text-xl leading-relaxed",
    };

    const variantClasses = {
      primary: "text-gray-900",
      secondary: "text-text-secondary",
      muted: "text-text-muted",
      dark: "text-text-dark-body",
    };

    return (
      <p
        ref={ref}
        className={cn(
          "font-body",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = "Text";
