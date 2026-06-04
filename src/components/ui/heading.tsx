import * as React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, size, children, ...props }, ref) => {
    const Tag = `h${level}` as const;

    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg font-heading font-medium tracking-tight",
      xl: "text-xl md:text-2xl font-heading font-bold tracking-tight",
      "2xl": "text-2xl md:text-3xl font-heading font-bold tracking-tight",
      "3xl": "text-3xl md:text-4xl font-heading font-bold tracking-tight text-gray-900",
      "4xl": "text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-gray-900 leading-tight",
      "5xl": "text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter text-gray-900 leading-none",
    };

    const defaultSizeMap = {
      1: "4xl",
      2: "3xl",
      3: "2xl",
      4: "xl",
      5: "lg",
      6: "base",
    } as const;

    const computedSize = size || defaultSizeMap[level as keyof typeof defaultSizeMap];

    return (
      <Tag
        ref={ref}
        className={cn(
          "font-heading text-gray-900 font-semibold antialiased",
          sizeClasses[computedSize],
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";
