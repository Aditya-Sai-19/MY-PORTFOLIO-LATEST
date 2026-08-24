"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

export function Pill({ className, active = false, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border border-white/25 bg-white/45 px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.06]",
        active && "border-transparent bg-accent text-accent-foreground",
        className
      )}
      {...props}
    />
  );
}
