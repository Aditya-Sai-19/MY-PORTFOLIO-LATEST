"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { Download, ArrowUp, Sparkles } from "lucide-react";
import { SITE, SOCIAL_LINKS } from "@/constants/theme";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// Inline styles.
// NOTE: this project's tokens are bare HSL triplets (e.g. --foreground:
// 157 14% 11%), so they must be wrapped in hsl() — color-mix(in oklch, ...)
// would be invalid here and silently dropped, leaving text invisible.
// ---------------------------------------------------------------------------
const STYLES = `
@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes footer-rise {
  from { opacity: 0; transform: translateY(36px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }

/* Content is visible by default; the rise plays only when the footer is
   revealed on screen (class added by IntersectionObserver). */
.footer-rise { opacity: 1; }
.footer-revealed .footer-rise {
  animation: footer-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.footer-revealed .footer-rise-1 { animation-delay: 0.14s; }
.footer-revealed .footer-rise-2 { animation-delay: 0.28s; }
.footer-revealed .footer-rise-3 { animation-delay: 0.42s; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, hsl(var(--foreground) / 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(var(--foreground) / 0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    hsl(var(--primary) / 0.16) 0%,
    hsl(var(--secondary) / 0.16) 40%,
    transparent 70%
  );
}
.footer-glass-pill {
  background: linear-gradient(145deg,
    hsl(var(--foreground) / 0.04) 0%,
    hsl(var(--foreground) / 0.015) 100%);
  box-shadow:
    0 10px 30px -10px hsl(var(--background) / 0.5),
    inset 0 1px 1px hsl(var(--foreground) / 0.12),
    inset 0 -1px 2px hsl(var(--background) / 0.8);
  border: 1px solid hsl(var(--foreground) / 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg,
    hsl(var(--foreground) / 0.09) 0%,
    hsl(var(--foreground) / 0.03) 100%);
  border-color: hsl(var(--foreground) / 0.22);
  box-shadow:
    0 20px 40px -10px hsl(var(--background) / 0.7),
    inset 0 1px 1px hsl(var(--foreground) / 0.2);
  color: var(--foreground);
}
.footer-giant-bg-text {
  font-size: clamp(6rem, 26vw, 40rem);
  line-height: 0.78;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 2px hsl(var(--foreground) / 0.12);
  background: linear-gradient(180deg, hsl(var(--foreground) / 0.16) 0%, transparent 70%);
  -webkit-background-clip: text;
  background-clip: text;
}
.footer-text-glow {
  background: linear-gradient(180deg, hsl(var(--foreground)) 0%, hsl(var(--foreground) / 0.45) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px hsl(var(--foreground) / 0.18));
}

@media (prefers-reduced-motion: reduce) {
  .footer-revealed .footer-rise,
  .footer-revealed .footer-rise-1,
  .footer-revealed .footer-rise-2,
  .footer-revealed .footer-rise-3,
  .animate-footer-breathe,
  .animate-footer-scroll-marquee {
    animation: none;
  }
  .footer-rise { opacity: 1; }
}
`;

// ---------------------------------------------------------------------------
// Marquee
// ---------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>AI / Machine Learning</span>
    <span className="text-primary/60">✦</span>
    <span>Deep Learning</span>
    <span className="text-secondary/60">✦</span>
    <span>Robotics</span>
    <span className="text-primary/60">✦</span>
    <span>Cybersecurity</span>
    <span className="text-secondary/60">✦</span>
    <span>Open Source</span>
    <span className="text-primary/60">✦</span>
    <span>TensorFlow</span>
    <span className="text-secondary/60">✦</span>
    <span>PyTorch</span>
    <span className="text-primary/60">✦</span>
    <span>NLP</span>
  </div>
);

// ---------------------------------------------------------------------------
// Main Footer
//
// Cinematic "curtain reveal": the footer is a fixed full-screen layer pinned
// at the bottom of the viewport, clipped by an in-flow h-screen wrapper. As
// the page scrolls into its final screen, the section above slides up and the
// footer is revealed rising from underneath.
// ---------------------------------------------------------------------------
export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger the rise entrance when the footer wrapper scrolls into view.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("footer-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Optional scroll parallax for the giant background text. Pure y-drift only:
  // even if this never runs, the text stays fully visible.
  useEffect(() => {
    if (!giantRef.current || reduceMotion || !mounted || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantRef.current,
        { y: 80 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [mounted, reduceMotion]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Curtain-reveal wrapper: sits in normal flow; clips the fixed footer
          below to its own box so it only appears on the final screen. */}
      <div
        ref={wrapperRef}
        id="contact"
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground">
          {/* Ambient glow & grid */}
          <div className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-full blur-[80px]" />
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          {/* Giant background text */}
          <div
            ref={giantRef}
            className="footer-giant-bg-text pointer-events-none absolute bottom-0 left-1/2 z-0 w-full -translate-x-1/2 whitespace-nowrap text-center select-none"
          >
            CODERS
          </div>

          {/* Diagonal marquee */}
          <div className="absolute left-0 top-10 z-10 w-full -rotate-2 scale-110 border-y border-border/50 bg-background/60 py-4 shadow-2xl backdrop-blur-md">
            <div className="animate-footer-scroll-marquee flex w-max text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground md:text-sm">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-36 md:pt-48">
            <h2 className="footer-rise footer-text-glow mb-12 text-center text-5xl font-black tracking-tighter md:text-7xl lg:text-8xl">
              Want to Contact?
            </h2>

            <div className="footer-rise footer-rise-1 flex w-full flex-col items-center gap-6">
              {/* Primary CTAs */}
              <div className="flex w-full flex-wrap justify-center gap-4">
                <a
                  href={SITE.resume}
                  download={SITE.resumeFileName}
                  className="footer-glass-pill flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-foreground md:px-10 md:py-5 md:text-base"
                >
                  <Download className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
                  Download Resume
                </a>

                <button
                  onClick={scrollToWork}
                  className="footer-glass-pill flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-foreground md:px-10 md:py-5 md:text-base"
                >
                  <Sparkles className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
                  View My Work
                </button>
              </div>

              {/* Social links */}
              <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
                {[
                  { label: "GitHub", href: SOCIAL_LINKS.github },
                  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
                  { label: "Hugging Face", href: SOCIAL_LINKS.huggingface },
                  { label: "Instagram", href: SOCIAL_LINKS.instagram },
                  { label: "Contact", href: SOCIAL_LINKS.email },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-muted-foreground transition-all duration-300 hover:text-foreground md:text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-rise footer-rise-2 relative z-20 flex w-full items-center justify-between px-6 pb-8 md:px-12">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground md:text-xs">
              © 2026 {SITE.name} · All rights reserved.
            </p>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="footer-glass-pill flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
