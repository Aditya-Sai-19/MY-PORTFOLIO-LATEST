"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

export default function Atmosphere() {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      const orbs = ref.current.querySelectorAll<HTMLElement>(".orb");
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: (i % 2 === 0 ? 1 : -1) * (16 + i * 7),
          y: (i % 2 === 0 ? -1 : 1) * (12 + i * 5),
          scale: 1.04 + i * 0.03,
          duration: 11 + i * 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 1.6,
        });
      });
    },
    { dependencies: [reduceMotion], scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="orb orb-sage absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax]" />
      <div className="orb orb-mist absolute -right-[20%] top-[28%] h-[62vmax] w-[62vmax]" />
      <div className="orb orb-lavender absolute bottom-[-25%] left-[8%] h-[56vmax] w-[56vmax]" />
      <div className="orb orb-ivory absolute left-[32%] top-[52%] h-[50vmax] w-[50vmax]" />
    </div>
  );
}
