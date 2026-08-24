"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts */
  delay?: number;
  /** Vertical travel distance in px */
  y?: number;
  /** Duration in seconds */
  duration?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.9,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      const el = ref.current;
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    },
    { dependencies: [reduceMotion, y, delay, duration], scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
