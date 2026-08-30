"use client";

import { BookOpen, Briefcase, GraduationCap, MapPin, Sparkles, Target } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionWord } from "@/components/ui/section-word";
import { GlassSurface } from "@/components/ui/glass-surface";

const facts = [
  { icon: MapPin, label: "Location", value: "Hyderabad, India" },
  { icon: Briefcase, label: "Currently", value: "AI Engineer at Kodryx AI", accent: true },
  { icon: Target, label: "Focus", value: "Intelligent systems & applied machine learning" },
  { icon: GraduationCap, label: "Education", value: "B.Tech CSE (AI & ML) · Joginpally B R Engineering College" },
  { icon: BookOpen, label: "Learning", value: "Deep learning & emerging AI tooling" },
  { icon: Sparkles, label: "Interests", value: "Robotics, Cybersecurity, UI/UX, Smart automation" },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-10 md:py-32">
      <SectionWord>About</SectionWord>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="display text-4xl md:text-5xl">A little about me.</h2>
        </Reveal>

        {/* Dominant statement: fade in place, no travel */}
        <Reveal delay={0.1} y={0}>
          <p className="display mt-12 max-w-4xl text-[clamp(1.9rem,4.5vw,3.4rem)] text-foreground">
            I build intelligent systems that bridge the physical and digital
            worlds.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-start gap-10 md:flex-row md:items-center">
            <div className="flex-1 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                I&apos;m{" "}
                <span className="font-medium text-foreground">
                  Kolapalli Aditya Sai
                </span>
                , a Computer Science graduate specializing in Artificial
                Intelligence and Machine Learning. From secure infrastructure to
                robotic automation, I&apos;m driven by curiosity and a desire to
                solve real-world problems with well-built systems.
              </p>
              <p>
                My foundation is Python, Java, C, and SQL, with a focus on
                applied machine learning and deep learning. I&apos;m always
                exploring the edges of the field: ethical hacking, UI/UX design,
                and smart automation.
              </p>
            </div>
            <div className="flex shrink-0 justify-center md:justify-start">
              <div className="glass-elevated overflow-hidden rounded-2xl p-1">
                <Image
                  src="/aditya-profile.jpeg"
                  alt="Aditya Sai profile photo"
                  width={180}
                  height={230}
                  className="h-[230px] w-[180px] rounded-xl object-cover object-top md:h-[280px] md:w-[220px]"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Typographic facts: flat hairlines + one floating glass surface */}
        <div className="mt-16 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact, i) => (
            <Reveal key={fact.label} delay={0.05 * i}>
              {fact.accent ? (
                <GlassSurface
                  variant="elevated"
                  interactive
                  className="flex h-full flex-col justify-between p-6"
                >
                  <fact.icon
                    className="h-4 w-4 text-accent"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div className="mt-10">
                    <p className="eyebrow">{fact.label}</p>
                    <p className="mt-2 text-[15px] font-medium leading-snug text-foreground">
                      {fact.value}
                    </p>
                  </div>
                </GlassSurface>
              ) : (
                <div className="border-t border-border/80 pt-6">
                  <fact.icon
                    className="h-4 w-4 text-accent"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <p className="eyebrow mt-4">{fact.label}</p>
                  <p className="mt-2 text-[15px] font-medium leading-snug text-foreground">
                    {fact.value}
                  </p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
