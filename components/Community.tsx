"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

interface CommunityRole {
  role: string;
  organization: string;
  description: string;
  logo: string;
  logoAlt: string;
}

const communityRoles: CommunityRole[] = [
  {
    role: "Core Team Member",
    organization: "MFUGH · Microsoft Fabric Users Group Hyderabad",
    description:
      "Organizing events and engaging with the data and AI community around the Microsoft Fabric ecosystem.",
    logo: "/MFUGH.jpeg",
    logoAlt: "Microsoft Fabric Users Group Hyderabad logo",
  },
  {
    role: "Community Ambassador",
    organization: "AI ANYTIME Community",
    description:
      "Supporting AI learning initiatives, sharing knowledge, and helping grow the AI developer community.",
    logo: "/AI%20ANYTIME.jpeg",
    logoAlt: "AI ANYTIME Community logo",
  },
  {
    role: "Vice President",
    organization: "AI4AP Community",
    description:
      "Leading initiatives, managing team efforts, and driving AI awareness and collaboration activities.",
    logo: "/AI4AP.jpeg",
    logoAlt: "AI4AP Community logo",
  },
];

export default function Community() {
  return (
    <section id="community" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          size="md"
          title="Beyond the code."
        />

        <Reveal delay={0.1}>
          <p className="display mt-10 max-w-3xl text-[clamp(1.6rem,3.8vw,2.8rem)]">
            Building impact through collaboration, events, and growing the AI
            community.
          </p>
        </Reveal>

        <div className="mt-16 max-w-4xl divide-y divide-border/70 border-t border-border/70">
          {communityRoles.map((item, i) => (
            <Reveal key={item.role} delay={i * 0.08}>
              <div className="grid gap-4 py-8 md:grid-cols-[3.5rem_1fr_auto] md:items-center md:gap-8">
                <span className="glass-subtle flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
                  <Image
                    src={item.logo}
                    alt={item.logoAlt}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-foreground">
                    {item.role}
                  </p>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-accent md:text-right">
                  {item.organization}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
