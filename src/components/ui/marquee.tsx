import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  children: React.ReactNode;
}

export const Marquee: React.FC<MarqueeProps> = ({
  direction = "left",
  pauseOnHover = true,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 select-none relative w-full",
        "[mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0 gap-20 items-center justify-start min-w-max",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      {/* Duplicate children for seamless looping */}
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 gap-20 items-center justify-start min-w-max pl-20",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  );
};

