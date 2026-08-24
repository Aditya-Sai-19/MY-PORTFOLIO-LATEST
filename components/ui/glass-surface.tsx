"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "standard" | "elevated";
  /** Brightens on hover */
  interactive?: boolean;
  /** Adds a soft light-sheen that travels across on hover */
  sheen?: boolean;
  /** Fully rounded (pill) */
  pill?: boolean;
}

export const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  function GlassSurface(
    {
      variant = "standard",
      interactive = false,
      sheen = false,
      pill = false,
      className,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          variant === "subtle"
            ? "glass-subtle"
            : variant === "elevated"
              ? "glass-elevated"
              : "glass",
          interactive && "glass-interactive",
          sheen && "glass-sheen",
          pill ? "rounded-full" : "rounded-surface",
          className
        )}
        {...props}
      />
    );
  }
);
