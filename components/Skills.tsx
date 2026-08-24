"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Brain,
  BrainCircuit,
  Bug,
  Layers,
  Lock,
  Radar,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Live theme derived from the rendered class on <html>.
 * The class is set synchronously by next-themes' inline script before React
 * hydrates, so this is correct on the very first render and updates on toggle
 * (more reliable than the theme context's initial value after a hard reload).
 */
function useThemeClass(): "light" | "dark" {
  return React.useSyncExternalStore(
    React.useCallback((onStoreChange) => {
      const observer = new MutationObserver(onStoreChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    }, []),
    () =>
      typeof document === "undefined"
        ? "light"
        : document.documentElement.classList.contains("dark")
          ? "dark"
          : "light",
    () => "light" // getServerSnapshot: server render is always the light theme
  );
}

/**
 * Genuine skillicons.dev slugs, verified against the live service
 * (https://skillicons.dev/icons?i=<slug>). Slugs returning the 256-byte
 * "not supported" placeholder were dropped and given a lucide fallback below.
 */
const ICON_SLUGS: Record<string, string> = {
  Python: "py",
  "Java (OOP)": "java",
  C: "c",
  SQL: "mysql",
  Arduino: "arduino",
  ROS: "ros",
  TensorFlow: "tensorflow",
  PyTorch: "pytorch",
  "Scikit-learn": "sklearn",
  "Azure Cognitive Services": "azure",
  // Cybersecurity: Kali Linux is the standard ethical-hacking platform.
  "Ethical Hacking": "kali",
};

/**
 * Official tool/platform logos, downloaded from each project's official site
 * or repo into /public/logos. invertOnDark flips dark-on-transparent marks
 * so they stay visible on the nighttime glass chips; invertOnLight flips
 * white marks so they stay visible in the morning-light theme.
 */
const ICON_LOGOS: Record<
  string,
  { src: string; darkSrc?: string; invertOnDark?: boolean; invertOnLight?: boolean }
> = {
  // Tools
  Pandas: { src: "/logos/pandas.svg", invertOnDark: true },
  NumPy: { src: "/logos/numpy.svg" },
  Seaborn: { src: "/logos/seaborn.svg", invertOnDark: true },
  Matplotlib: { src: "/logos/matplotlib.svg", invertOnDark: true },
  LangChain: { src: "/logos/langchain.svg" },
  LangFlow: { src: "/logos/langflow.svg" },
  N8N: { src: "/logos/n8n.png" },
  Streamlit: { src: "/logos/streamlit.svg" },
  GCC: { src: "/logos/gcc.png" },
  // Platforms
  "Google Colab": { src: "/logos/colab.png" },
  "IBM Watson": { src: "/logos/ibm.ico" },
  Coursera: { src: "/logos/coursera.svg" },
  Skillsoft: { src: "/logos/skillsoft.svg", invertOnDark: true },
  Docker: { src: "/logos/docker.png" },
  Vercel: { src: "/logos/vercel.png", invertOnDark: true },
  Render: { src: "/logos/render.svg", invertOnLight: true },
  "Google Cloud Storage": { src: "/logos/gcs.svg" },
  Jira: { src: "/logos/jira.ico" },
  Firebase: { src: "/logos/firebase.png" },
  GitHub: { src: "/logos/github.png", invertOnDark: true },
  "Claude Code": { src: "/logos/claude.png" },
};

/**
 * lucide-react fallbacks for skills/tools/platforms that have no genuine
 * skillicons.dev icon (e.g. GDB, Coursera, or concept skills like "Machine
 * Learning").
 */
const ICON_LUCIDE: Record<string, LucideIcon> = {
  "Machine Learning": BrainCircuit,
  "Artificial Intelligence": Brain,
  "Deep Learning": Layers,
  "Data Analysis": BarChart3,
  "Sensor Integration": Radar,
  Automation: Bot,
  "Data Encryption": Lock,
  "Network Security": ShieldCheck,
  "Threat Analysis": ShieldAlert,
  GDB: Bug,
};

const categories = [
  {
    label: "Development",
    skills: ["Python", "Java (OOP)", "C", "SQL"],
  },
  {
    label: "AI & Data Science",
    skills: ["Machine Learning", "Artificial Intelligence", "Deep Learning", "Data Analysis"],
  },
  {
    label: "Robotics & Hardware",
    skills: ["Arduino", "ROS", "Sensor Integration", "Automation"],
  },
  {
    label: "Cybersecurity",
    skills: ["Ethical Hacking", "Data Encryption", "Network Security", "Threat Analysis"],
  },
];

const tools = [
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Seaborn",
  "Matplotlib",
  "LangChain",
  "LangFlow",
  "N8N",
  "Streamlit",
  "GDB",
  "GCC",
];

const platforms = [
  "Google Colab",
  "IBM Watson",
  "Azure Cognitive Services",
  "Coursera",
  "Skillsoft",
  "Docker",
  "Vercel",
  "Render",
  "Google Cloud Storage",
  "Jira",
  "Firebase",
  "GitHub",
  "Claude Code",
];

/** Glass tile with a skillicons.dev icon, official brand logo, or lucide
 * fallback + label. */
function SkillIcon({ name }: { name: string }) {
  const slug = ICON_SLUGS[name];
  const logo = ICON_LOGOS[name];
  const FallbackIcon = ICON_LUCIDE[name];
  const theme = useThemeClass();
  return (
    <div
      data-skill-chip
      className="glass-subtle flex w-[4.5rem] flex-col items-center gap-1.5 rounded-2xl px-2 pb-2 pt-2.5"
    >
      {slug ? (
        <Image
          src={`https://skillicons.dev/icons?i=${slug}&theme=${theme}`}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className="h-9 w-9 object-contain"
        />
      ) : logo ? (
        <Image
          src={theme === "dark" && logo.darkSrc ? logo.darkSrc : logo.src}
          alt=""
          width={56}
          height={36}
          loading="lazy"
          className={cn(
            "h-9 w-auto max-w-[56px] object-contain",
            logo.invertOnDark && "dark:invert",
            // White-on-transparent marks: invert in light mode, double-invert
            // back to the original white in dark mode (no light: variant).
            logo.invertOnLight && "invert dark:invert"
          )}
        />
      ) : (
        <span className="flex h-9 w-9 items-center justify-center">
          <FallbackIcon
            className="h-[26px] w-[26px] text-muted-foreground"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </span>
      )}
      <span className="text-center text-[11px] font-medium leading-tight text-muted-foreground">
        {name}
      </span>
    </div>
  );
}

export default function Skills() {
  const ref = React.useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Gentle chip choreography: chips settle in as the section enters.
  // Distinct from other sections - this one pulses softly instead of sliding rows.
  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      const chips = ref.current.querySelectorAll<HTMLElement>("[data-skill-chip]");
      if (!chips.length) return;
      gsap.fromTo(
        chips,
        { opacity: 0, y: 14, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.045,
          scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
        }
      );
    },
    { dependencies: [reduceMotion], scope: ref }
  );

  const renderChips = (items: string[]) =>
    items.map((item) =>
      ICON_SLUGS[item] || ICON_LOGOS[item] || ICON_LUCIDE[item] ? (
        <SkillIcon key={item} name={item} />
      ) : (
        <Pill key={item}>{item}</Pill>
      )
    );

  return (
    <section
      id="skills"
      ref={ref}
      className="atmosphere-band relative border-y border-border/60 px-6 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          size="sm"
          title="What I work with."
          description="A practical toolkit spanning development, AI, robotics, and security."
        />

        <div className="mt-14">
          {categories.map((category, i) => (
            <Reveal key={category.label} delay={i * 0.04}>
              <div className="grid gap-4 border-t border-border/70 py-7 md:grid-cols-[10rem_1fr] md:gap-8">
                <p className="pt-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {category.label}
                </p>
                <div className="flex flex-wrap items-start gap-2.5">
                  {renderChips(category.skills)}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="grid gap-4 border-t border-border/70 py-7 md:grid-cols-[10rem_1fr] md:gap-8">
              <p className="pt-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Tools
              </p>
              <div className="flex flex-wrap items-start gap-2.5">{renderChips(tools)}</div>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="grid gap-4 border-t border-border/70 py-7 md:grid-cols-[10rem_1fr] md:gap-8">
              <p className="pt-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Platforms
              </p>
              <div className="flex flex-wrap items-start gap-2.5">{renderChips(platforms)}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
