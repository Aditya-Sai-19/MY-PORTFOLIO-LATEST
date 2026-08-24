"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface SectionWordProps {
  children: string;
  className?: string;
  align?: "left" | "center" | "right";
  /** "default" = subtle 5% opacity fill. "gradient" = CODERS-style outlined + gradient fill. */
  variant?: "default" | "gradient";
  /** Extra rotation in degrees applied to the text */
  rotate?: number;
}

export function SectionWord({
  children,
  className,
  align = "left",
  variant = "default",
  rotate = 0,
}: SectionWordProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      const word = ref.current.querySelector("span");
      if (!word) return;

      const targetOpacity = variant === "gradient" ? 1 : 0.05;

      if (variant === "gradient") {
        // Scroll-mapped: word travels from top to bottom of the container
        // as the user scrolls through the section.
        gsap.set(word, { opacity: targetOpacity, y: 0 });

        gsap.to(word, {
          y: "90%",
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      } else {
        // Default: gentle entrance + parallax
        gsap.fromTo(
          word,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: targetOpacity,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 92%",
              once: true,
            },
          }
        );

        gsap.to(word, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
          },
        });
      }
    },
    { dependencies: [reduceMotion, variant], scope: ref }
  );

  const isCenter = align === "center";
  const isGradient = variant === "gradient";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 select-none overflow-hidden",
        isCenter
          ? "inset-y-0 flex items-center justify-center"
          : "top-0 h-44",
        className
      )}
    >
      <span
        className={cn(
          "whitespace-nowrap leading-none",
          isCenter
            ? "text-[clamp(5rem,26vw,26rem)]"
            : "display absolute -top-10 text-[clamp(6.5rem,19vw,17rem)]",
          isGradient
            ? "font-black tracking-[-0.05em] text-transparent"
            : "text-foreground/[0.05]",
          !isCenter && (align === "left" ? "left-0" : "right-0")
        )}
        style={{
          ...(isGradient
            ? {
                WebkitTextStroke: "2px hsl(var(--foreground) / 0.12)",
                background:
                  "linear-gradient(180deg, hsl(var(--foreground) / 0.16) 0%, transparent 70%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }
            : {}),
          ...(rotate ? { transform: `rotate(${rotate}deg)` } : {}),
        }}
      >
        {children}
      </span>
    </div>
  );
}
