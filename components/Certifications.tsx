"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionWord } from "@/components/ui/section-word";

interface Certification {
  name: string;
  platform: string;
  date: string;
  category: string;
  description: string;
  link: string;
  /** Local preview image of the certificate (public/certificates/*). */
  preview?: string;
}

const certifications: Certification[] = [
  {
    name: "Introduction to Agent Skills",
    platform: "Anthropic",
    date: "2026",
    category: "AI/ML",
    description: "Fundamentals of AI agents, tool usage, and autonomous workflows.",
    link: "https://verify.skilljar.com/c/2niomiw739th",
    preview: "/certificates/anthropic-agent-skills.jpg",
  },
  {
    name: "Claude Code in Action",
    platform: "Anthropic",
    date: "April 2026",
    category: "AI/ML",
    description: "Hands-on AI-powered coding workflows using Claude.",
    link: "https://verify.skilljar.com/c/fdxfahjxy3cc",
    preview: "/certificates/anthropic-claude-code.jpg",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    platform: "Oracle",
    date: "October 2025",
    category: "AI/Cloud",
    description: "Expertise in Oracle Cloud Infrastructure and Generative AI services.",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=0BC5481C6D8F23D8372FE1FDE216279DEE629D205BFAF74BBBF0AA1A7E848A93",
    preview: "/certificates/oracle-oci-genai.png",
  },
  {
    name: "Explore Generative AI with the Vertex AI Gemini API",
    platform: "Google",
    date: "April 2025",
    category: "AI/Cloud",
    description: "Hands-on experience building generative AI apps with Vertex AI Gemini APIs.",
    link: "https://www.credly.com/badges/fbc08338-501f-4fae-9136-08f9d9b1b6a9/linked_in_profile",
    preview: "/certificates/google-vertex-gemini.png",
  },
  {
    name: "Build Real World AI Applications with Gemini and Imagen",
    platform: "Google",
    date: "April 2025",
    category: "AI/Cloud",
    description: "Building real-world AI applications with Gemini and Imagen models.",
    link: "https://www.credly.com/badges/d1f3f166-c6dd-4f23-b868-02bc8caeff89/linked_in_profile",
    preview: "/certificates/google-gemini-imagen.png",
  },
  {
    name: "Prompt Design in Vertex AI",
    platform: "Google",
    date: "April 2025",
    category: "AI/Cloud",
    description: "Prompt engineering and designing effective prompts for Gemini models.",
    link: "https://www.credly.com/badges/0463ad58-3936-4dd4-b043-c0ca17b4cc12/linked_in_profile",
    preview: "/certificates/google-prompt-design.png",
  },
  {
    name: "Intro to Machine Learning",
    platform: "Kaggle",
    date: "December 2024",
    category: "AI/ML",
    description: "Core ML concepts including supervised learning and model evaluation.",
    link: "https://www.kaggle.com/learn/certification/supremekas/intro-to-machine-learning",
    preview: "/certificates/kaggle-intro-ml.png",
  },
  {
    name: "Automate Cybersecurity Tasks with Python",
    platform: "Google",
    date: "December 2024",
    category: "Cybersecurity",
    description: "Automation scripts for cybersecurity tasks using Python and best practices.",
    link: "https://www.coursera.org/account/accomplishments/verify/F3YKLODQFDYU",
    preview: "/certificates/google-automate-cyber-python.jpeg",
  },
  {
    name: "Automation Design & Robotics",
    platform: "Skillsoft",
    date: "June 2024",
    category: "Robotics",
    description: "Advanced robotics design principles and automation systems.",
    link: "https://skillsoft.digitalbadges.skillsoft.com/2683ba58-0064-4ce9-badc-f039b2d27e4d#acc.WjqaPlfD",
    preview: "/certificates/skillsoft-automation-robotics.png",
  },
  {
    name: "Build a Computer Vision App with Azure Cognitive Services",
    platform: "Microsoft (Coursera)",
    date: "Dec 2023",
    category: "AI/ML",
    description: "Computer vision application development using Azure AI.",
    link: "https://www.coursera.org/account/accomplishments/verify/LNSYYGMWEDPQ",
    preview: "/certificates/azure-cv-coursera.jpeg",
  },
  {
    name: "Foundations of Cybersecurity",
    platform: "Google (Coursera)",
    date: "Feb 2024",
    category: "Cybersecurity",
    description: "Fundamental cybersecurity concepts and threat analysis.",
    link: "https://www.coursera.org/account/accomplishments/verify/7GZEHN6NE57J?utm_product=course",
    preview: "/certificates/google-foundations-cybersecurity.jpeg",
  },
  {
    name: "ROBOPACK 3-Day Workshop",
    platform: "My Equation",
    date: "May 2024",
    category: "Robotics",
    description: "Hands-on robotics workshop with practical applications.",
    link: "https://www.linkedin.com/in/aditya-sai-3317702a6/details/certifications/1719408945902/single-media-viewer/?profileId=ACoAAEnLrNUBtlmX5R017dHOdXAeUJe3FjIgtD4",
    preview: "/certificates/robopack-workshop.jpg",
  },
  {
    name: "Building Smart Business Assistants with IBM Watson",
    platform: "Coursera",
    date: "Jan 2024",
    category: "AI/ML",
    description: "AI-powered business assistant development.",
    link: "https://www.coursera.org/account/accomplishments/verify/THPNPBPC2C2F?utm_product=project",
    preview: "/certificates/ibm-watson-assistants.jpeg",
  },
  {
    name: "Create a Lead Generation Messenger Chatbot using Chatfuel",
    platform: "Coursera",
    date: "Jan 2024",
    category: "AI/ML",
    description: "Chatbot development for lead generation and automation.",
    link: "https://www.coursera.org/account/accomplishments/verify/GHBPKQT2NW92",
    preview: "/certificates/chatfuel-chatbot-coursera.jpeg",
  },
  {
    name: "Data Encryption using AWS KMS",
    platform: "UST (Coursera)",
    date: "Jan 2024",
    category: "Cybersecurity",
    description: "Advanced data encryption and key management systems.",
    link: "https://www.coursera.org/account/accomplishments/verify/FHRPWEQA6LAX?utm_product=project",
    preview: "/certificates/aws-kms-encryption.jpeg",
  },
  {
    name: "Deep Learning with PyTorch: Image Segmentation",
    platform: "Coursera",
    date: "Jan 2024",
    category: "AI/ML",
    description: "Deep learning techniques for computer vision tasks.",
    link: "https://www.coursera.org/account/accomplishments/verify/GVCPAZFTYFA7?utm_product=project",
    preview: "/certificates/pytorch-image-segmentation.jpeg",
  },
  {
    name: "Introduction to AI",
    platform: "Great Learning",
    date: "May 2024",
    category: "AI/ML",
    description: "Foundational artificial intelligence concepts and applications.",
    link: "https://www.linkedin.com/in/aditya-sai-3317702a6/details/certifications/1719409723471/single-media-viewer/?profileId=ACoAAEnLrNUBtlmX5R017dHOdXAeUJe3FjIgtD4",
    preview: "/certificates/great-learning-intro-ai.jpg",
  },
  {
    name: "UI/UX for Beginners",
    platform: "Great Learning",
    date: "June 2024",
    category: "Design",
    description: "User interface and experience design fundamentals.",
    link: "https://www.linkedin.com/in/aditya-sai-3317702a6/details/certifications/1719413150133/single-media-viewer/?type=DOCUMENT&profileId=ACoAAEnLrNUBtlmX5R017dHOdXAeUJe3FjIgtD4",
    preview: "/certificates/great-learning-uiux.jpg",
  },
  {
    name: "Google Ads for Beginners",
    platform: "Coursera",
    date: "Sep 2024",
    category: "Marketing",
    description: "Digital marketing and advertising campaign management.",
    link: "https://www.coursera.org/account/accomplishments/verify/OBQPYZW4GUEE",
    preview: "/certificates/google-ads-coursera.jpeg",
  },
];

/** Short, scannable label rendered under each gallery card (the 3D labels are
 *  painted on canvas at 30px bold, so they need to stay compact). */
const LABELS: Record<string, string> = {
  "Introduction to Agent Skills": "Agent Skills",
  "Claude Code in Action": "Claude Code",
  "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional": "OCI GenAI",
  "Explore Generative AI with the Vertex AI Gemini API": "Vertex Gemini",
  "Build Real World AI Applications with Gemini and Imagen": "Gemini & Imagen",
  "Prompt Design in Vertex AI": "Prompt Design",
  "Intro to Machine Learning": "Intro to ML",
  "Automate Cybersecurity Tasks with Python": "Cyber Python",
  "Automation Design & Robotics": "Automation & Robotics",
  "Build a Computer Vision App with Azure Cognitive Services": "Azure Vision",
  "Foundations of Cybersecurity": "Cyber Foundations",
  "ROBOPACK 3-Day Workshop": "Robopack",
  "Building Smart Business Assistants with IBM Watson": "IBM Watson",
  "Create a Lead Generation Messenger Chatbot using Chatfuel": "Chatbot Builder",
  "Data Encryption using AWS KMS": "AWS KMS",
  "Deep Learning with PyTorch: Image Segmentation": "PyTorch Vision",
  "Introduction to AI": "Intro to AI",
  "UI/UX for Beginners": "UI/UX Basics",
  "Google Ads for Beginners": "Google Ads",
};

function parseDate(date: string): number {
  const normalized = date.trim();
  if (/^\d{4}$/.test(normalized)) {
    return new Date(Number(normalized), 11, 31).getTime();
  }
  const [month, year] = normalized.split(" ");
  if (month && year && /^\d{4}$/.test(year)) {
    const parsed = new Date(`${month} 1, ${year}`);
    if (!Number.isNaN(parsed.getTime())) return parsed.getTime();
  }
  const fallback = new Date(normalized);
  return Number.isNaN(fallback.getTime()) ? 0 : fallback.getTime();
}

/** Static grid fallback (reduced motion). */
function StaticGrid({ items }: { items: Certification[] }) {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {items.map((cert) => (
        <a
          key={cert.name}
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${cert.name} — verify on ${cert.platform}`}
          className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card transition-transform duration-300 hover:scale-[1.02]"
        >
          {cert.preview && (
            <img
              src={cert.preview}
              alt={cert.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain p-2 opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
          <span className="absolute left-2 top-2 rounded-full bg-background/75 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-foreground backdrop-blur-sm">
            {cert.category}
          </span>
          <div className="absolute inset-x-0 bottom-0 border-t border-border/60 bg-card/90 px-3 py-2 backdrop-blur-sm">
            <p className="line-clamp-1 text-[12px] font-semibold leading-snug text-foreground">
              {cert.name}
            </p>
            <p className="mt-0.5 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{cert.platform} · {cert.date}</span>
              <span className="inline-flex items-center gap-0.5 font-semibold text-accent">
                Verify
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function Certifications() {
  const reduceMotion = useReducedMotion();

  const sorted = useMemo(
    () => [...certifications].sort((a, b) => parseDate(b.date) - parseDate(a.date)),
    []
  );

  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      sorted
        .filter((cert) => cert.preview)
        .map((cert) => ({
          image: cert.preview!,
          text: LABELS[cert.name] ?? cert.name,
          href: cert.link,
        })),
    [sorted]
  );

  const platformCount = new Set(certifications.map((c) => c.platform)).size;
  const categoryCount = new Set(certifications.map((c) => c.category)).size;

  return (
    <section id="certifications" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <SectionWord>Archive</SectionWord>

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          size="md"
          title="Proof of the learning habit."
          description="A habit of continuous learning across AI, cloud, cybersecurity, robotics, and design."
        />

        <Reveal delay={0.1}>
          <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
            <span>{certifications.length} certifications</span>
            <span className="h-3 w-px bg-border" aria-hidden="true" />
            <span>{platformCount} platforms</span>
            <span className="h-3 w-px bg-border" aria-hidden="true" />
            <span>{categoryCount} categories</span>
            <span className="h-3 w-px bg-border" aria-hidden="true" />
            <span>drag or scroll — click a card to verify</span>
          </p>
        </Reveal>
      </div>

      {reduceMotion ? (
        <div className="mx-auto mt-14 max-w-6xl">
          <StaticGrid items={sorted} />
        </div>
      ) : (
        <div className="relative mx-auto mt-14 h-[560px] w-full max-w-[1200px] rounded-3xl md:h-[640px]">
          <CircularGallery
            items={galleryItems}
            bend={3}
            borderRadius={0.05}
            scrollEase={0.02}
            className="rounded-3xl"
          />
          <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-muted-foreground">
            click any card to view &amp; verify the certificate
          </p>
        </div>
      )}
    </section>
  );
}
