"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  /** Optional plain-language label. Use sparingly (max 1 per 3 sections). */
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  /** Typographic weight of the heading, for rhythm between sections. */
  size?: "lg" | "md" | "sm";
}

const sizes = {
  lg: "text-5xl md:text-6xl",
  md: "text-4xl md:text-5xl",
  sm: "text-3xl md:text-4xl",
};

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "left",
  size = "md",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className
      )}
    >
      {label ? (
        <div
          className={cn(
            "eyebrow flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-border" aria-hidden="true" />
          <span>{label}</span>
          <span className="h-px w-8 bg-border" aria-hidden="true" />
        </div>
      ) : null}
      <h2 className={cn("display mt-5", sizes[size])}>{title}</h2>
      {description ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
