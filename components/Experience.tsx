"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const timeline = [
  {
    period: "2025 - Present",
    role: "AI Engineer",
    company: "Kodryx AI",
    description:
      "Developing cutting-edge AI solutions and machine learning models for innovative, real-world applications.",
    current: true,
  },
  {
    period: "2021 - 2025",
    role: "B.Tech, Computer Science (AI & ML)",
    company: "Joginpally B R Engineering College",
    description:
      "Specialized in artificial intelligence and machine learning, building a strong foundation in Python, deep learning, and intelligent systems.",
    current: false,
  },
];

export default function Experience() {
  return (
    <section id="journey" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          size="sm"
          title="Where I&apos;ve been, what I do."
          description="Education and experience that shaped how I approach building intelligent systems."
        />

        <div className="relative mt-16 max-w-3xl">
          {/* Thin timeline rule */}
          <div
            className="absolute bottom-6 left-[7px] top-2 w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-16">
            {timeline.map((item, i) => (
              <Reveal key={item.period} delay={i * 0.1} y={14}>
                <div className="group relative pl-12">
                  {/* Small glass marker, illuminated on hover */}
                  <span
                    className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full transition-transform duration-300 ease-out-expo group-hover:scale-125 ${
                      item.current
                        ? "glass-elevated border-accent/40 bg-accent"
                        : "glass-subtle border-border/60 bg-white/40 dark:bg-white/[0.06]"
                    }`}
                    aria-hidden="true"
                  />

                  <p className="eyebrow">{item.period}</p>
                  <h3 className="display mt-3 text-2xl md:text-[1.75rem]">
                    {item.role}
                  </h3>
                  <p className="mt-1.5 text-[15px] font-medium text-accent">
                    {item.company}
                  </p>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
