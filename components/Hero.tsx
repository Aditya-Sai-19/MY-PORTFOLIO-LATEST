"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { SITE, SOCIAL_LINKS } from "@/constants/theme";
import { GlassButton, buttonVariants } from "@/components/ui/glass-button";
import { Magnetic } from "@/components/ui/magnetic";
import { GlassSurface } from "@/components/ui/glass-surface";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: Mail, href: SOCIAL_LINKS.email, label: "Email" },
  { icon: Sparkles, href: SOCIAL_LINKS.huggingface, label: "Hugging Face" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
];

export default function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      const root = ref.current;

      // Hero entrance: soft, sequential, like light settling
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        root.querySelector(".hero-eyebrow"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.15
      )
        .fromTo(
          root.querySelector(".hero-name"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.25
        )
        .fromTo(
          root.querySelector(".hero-desc"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.45
        )
        .fromTo(
          root.querySelector(".hero-cta"),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.6
        )
        .fromTo(
          root.querySelector(".hero-socials"),
          { opacity: 0 },
          { opacity: 1, duration: 0.7 },
          0.72
        )
        .fromTo(
          root.querySelector(".hero-glass"),
          { opacity: 0, y: 28, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" },
          0.75
        );

      // Gentle idle float for the glass panel (starts after entrance settles)
      gsap.to(root.querySelector(".hero-glass"), {
        y: 8,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.2,
      });

      // Scroll parallax: panel drifts up slightly as the hero leaves
      gsap.to(root.querySelector(".hero-glass"), {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    },
    { dependencies: [reduceMotion], scope: ref }
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-6 pt-24 pb-16 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.35fr_0.65fr]">
        {/* Copy */}
        <div className="max-w-2xl">
          <div className="hero-eyebrow">
            <span className="eyebrow">
              AI/ML Engineer · Robotics &amp; Cybersecurity
            </span>
          </div>

          <h1 className="hero-name display mt-8 text-[clamp(2.9rem,7.5vw,5.5rem)]">
            Hi, I&apos;m Aditya{" "}
            <em className="font-semibold italic text-accent">Sai.</em>
          </h1>

          <p className="hero-desc mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            I build intelligent systems that connect the physical and digital
            worlds, from secure infrastructure to robotic automation.
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <GlassButton
                size="lg"
                onClick={() =>
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
                }
              >
                View my work
              </GlassButton>
            </Magnetic>
            <a
              href={SITE.resume}
              download={SITE.resumeFileName}
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download resume
            </a>
          </div>

          <div className="hero-socials mt-14 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="glass-subtle flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:text-foreground"
              >
                <social.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        {/* Floating glass identity panel */}
        <div className="hero-glass hidden lg:block">
          <GlassSurface
            variant="elevated"
            interactive
            className="relative -rotate-2 rounded-surface-lg p-6"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[15px] font-semibold tracking-tight text-foreground">
                  {SITE.name}
                </p>
                <p className="mt-0.5 text-[13px] text-muted-foreground">
                  AI/ML Engineer
                </p>
              </div>
              <span className="glass-subtle flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </div>

            <div className="mt-6 space-y-2.5 border-t border-white/30 pt-5 dark:border-white/10">
              <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} aria-hidden="true" />
                {SITE.location}
              </p>
              <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent/70" aria-hidden="true" />
                Open to opportunities
              </p>
            </div>
          </GlassSurface>
        </div>
      </div>
    </section>
  );
}
