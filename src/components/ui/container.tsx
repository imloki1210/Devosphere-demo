import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "max" | "none";
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "2xl", ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-[1280px]",
      max: "max-w-[1440px]",
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 md:px-6 lg:px-8",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
