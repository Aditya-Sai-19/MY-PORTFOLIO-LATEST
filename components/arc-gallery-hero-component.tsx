"use client";

import React, { useEffect, useState } from "react";
import { Download, Github, Instagram, Linkedin, Mail, Sparkles } from "lucide-react";
import { SITE, SOCIAL_LINKS } from "@/constants/theme";
import { cn } from "@/lib/utils";

const socials = [
  { icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: Mail, href: SOCIAL_LINKS.email, label: "Email" },
  { icon: Sparkles, href: SOCIAL_LINKS.huggingface, label: "Hugging Face" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
];

// --- The ArcGalleryHero Component ---
type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  // radius for different screen sizes
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  // size of each card for different screen sizes
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  // optional extra class on outer section
  className?: string;
};

export const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = 8,
  endAngle = 172,
  radiusLg = 560,
  radiusMd = 400,
  radiusSm = 300,
  cardSizeLg = 132,
  cardSizeMd = 104,
  cardSizeSm = 82,
  className = "",
}) => {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  });
  // Gate the positioned cards behind a mount check: the arc geometry only
  // exists on the client, so SSR renders the section without cards and the
  // cards appear (with their stagger entrance) right after hydration.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect to handle responsive resizing of the arc and cards
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  // Ensure at least 2 points to distribute angles for the arc calculation
  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className={cn(
        "relative flex min-h-[100dvh] flex-col overflow-hidden text-foreground",
        className
      )}
    >
      {/* Repeating video background */}
      <video
        className="hero-video-bg pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Soft theme-adaptive veil so the arc cards, text, and glass stay readable */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-background/55" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-t from-background/80 to-transparent" />

      {/* Background ring container that controls geometry */}
      <div
        className="relative z-[1] mx-auto"
        style={{
          width: "100%",
          // Give it a bit more height to prevent clipping
          height: dimensions.radius * 1.2,
        }}
      >
        {/* Center pivot for transforms - positioned at bottom center */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {/* Each image is positioned on the circle and rotated to face outward */}
          {mounted &&
            images.map((src, i) => {
            const angle = startAngle + step * i; // degrees
            const angleRad = (angle * Math.PI) / 180;

            // Calculate x and y positions on the arc
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;

            return (
              <div
                key={i}
                className="absolute opacity-0 animate-fade-in-up"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: "forwards",
                  zIndex: count - i,
                }}
              >
                <div
                  className="h-full w-full overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-border/60 transition-transform hover:scale-105"
                  style={{ transform: `rotate(${angle / 4}deg)` }}
                >
                  <img
                    src={src}
                    alt={`Memory ${i + 1}`}
                    className="block h-full w-full object-cover"
                    draggable={false}
                    // Add a fallback in case an image fails to load
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x400/334155/e2e8f0?text=Memory`;
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content positioned below the arc */}
      <div className="relative z-10 -mt-40 flex flex-1 items-center justify-center px-6 pb-16 md:-mt-52 lg:-mt-64">
        <div
          className="mx-auto max-w-2xl px-6 text-center opacity-0 animate-fade-in"
          style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
        >
          <span className="eyebrow">AI/ML Engineer · Robotics &amp; Cybersecurity</span>

          <h1 className="display mt-7 text-[clamp(2.9rem,7.5vw,5.5rem)]">
            Hi, I&apos;m Aditya{" "}
            <em className="font-semibold italic text-accent">Sai.</em>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            I build intelligent systems that connect the physical and digital worlds,
            from secure infrastructure to robotic automation.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={scrollToWork}
              className="glass glass-interactive glass-sheen rounded-full px-8 py-3.5 text-sm font-semibold text-foreground shadow-glass transition-all duration-300 ease-out-expo hover:-translate-y-0.5"
            >
              View my work
            </button>
            <a
              href={SITE.resume}
              download={SITE.resumeFileName}
              className="glass-subtle glass-interactive inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-foreground/85 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:text-foreground"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download resume
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-3">
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
      </div>

      {/* CSS for animations */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .hero-video-bg {
            display: none;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translate(-50%, 60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 50%);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation-name: fade-in-up;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
        .animate-fade-in {
          animation-name: fade-in;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
      `}</style>
    </section>
  );
};
