"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { SITE, SOCIAL_LINKS } from "@/constants/theme";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/glass-button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Email", href: SOCIAL_LINKS.email },
  { label: "GitHub", href: SOCIAL_LINKS.github },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "Hugging Face", href: SOCIAL_LINKS.huggingface },
  { label: "Instagram", href: SOCIAL_LINKS.instagram },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="atmosphere-luminous relative px-6 py-32 text-center md:px-10 md:py-52"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal y={32} duration={1.1}>
          <h2 className="display text-[clamp(2.9rem,8.5vw,7rem)] leading-[1.02]">
            Let&apos;s build{" "}
            <em className="font-semibold italic text-accent">something</em>{" "}
            great.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            A question, a project, a collaboration. I&apos;m always excited to
            discuss new opportunities and innovative ideas.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <a
            href={SOCIAL_LINKS.email}
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "mt-12 px-12"
            )}
          >
            Let&apos;s talk
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-20 flex flex-wrap items-center justify-center">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground",
                  i > 0 && "border-l border-border/70"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-10 flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            {SITE.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
