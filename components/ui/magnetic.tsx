"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How strongly the element is pulled toward the cursor (0-1) */
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!canHover) return;

      const el = ref.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        gsap.killTweensOf(el);
      };
    },
    { dependencies: [reduceMotion, strength], scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
