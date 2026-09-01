"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

export type StaggerTestimonial = {
  id: number;
  quote: string;
  by: string;
  imgSrc: string;
  linkedin?: string;
};

const defaultTestimonials: StaggerTestimonial[] = [
  {
    id: 0,
    quote: "My favorite solution in the market. We work 5x faster with COMPANY.",
    by: "Alex, CEO at TechCorp",
    imgSrc: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 1,
    quote: "I'm confident my data is safe with COMPANY. I can't say that about other providers.",
    by: "Dan, CTO at SecureNet",
    imgSrc: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 2,
    quote: "I know it's cliche, but we were lost before we found COMPANY. Can't thank you guys enough!",
    by: "Stephanie, COO at InnovateCo",
    imgSrc: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    quote: "COMPANY's products make planning for the future seamless. Can't recommend them enough!",
    by: "Marie, CFO at FuturePlanning",
    imgSrc: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 4,
    quote: "If I could give 11 stars, I'd give 12.",
    by: "Andre, Head of Design at CreativeSolutions",
    imgSrc: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 5,
    quote: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    by: "Jeremy, Product Manager at TimeWise",
    imgSrc: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 6,
    quote: "Took some convincing, but now that we're on COMPANY, we're never going back.",
    by: "Pam, Marketing Director at BrandBuilders",
    imgSrc: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 7,
    quote: "I would be lost without COMPANY's in-depth analytics. The ROI is EASILY 100X for us.",
    by: "Daniel, Data Scientist at AnalyticsPro",
    imgSrc: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 8,
    quote: "It's just the best. Period.",
    by: "Fernando, UX Designer at UserFirst",
    imgSrc: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 9,
    quote: "I switched 5 years ago and never looked back.",
    by: "Andy, DevOps Engineer at CloudMasters",
    imgSrc: "https://i.pravatar.cc/150?img=10",
  },
  {
    id: 10,
    quote: "I've been searching for a solution like COMPANY for YEARS. So glad I finally found one!",
    by: "Pete, Sales Director at RevenueRockets",
    imgSrc: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 11,
    quote: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    by: "Marina, HR Manager at TalentForge",
    imgSrc: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 12,
    quote: "COMPANY's customer support is unparalleled. They're always there when we need them.",
    by: "Olivia, Customer Success Manager at ClientCare",
    imgSrc: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 13,
    quote: "The efficiency gains we've seen since implementing COMPANY are off the charts!",
    by: "Raj, Operations Manager at StreamlineSolutions",
    imgSrc: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 14,
    quote: "COMPANY has revolutionized how we handle our workflow. It's a game-changer!",
    by: "Lila, Workflow Specialist at ProcessPro",
    imgSrc: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 15,
    quote: "The scalability of COMPANY's solution is impressive. It grows with our business seamlessly.",
    by: "Trevor, Scaling Officer at GrowthGurus",
    imgSrc: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 16,
    quote: "I appreciate how COMPANY continually innovates. They're always one step ahead.",
    by: "Naomi, Innovation Lead at FutureTech",
    imgSrc: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: 17,
    quote: "The ROI we've seen with COMPANY is incredible. It's paid for itself many times over.",
    by: "Victor, Finance Analyst at ProfitPeak",
    imgSrc: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: 18,
    quote: "COMPANY's platform is so robust, yet easy to use. It's the perfect balance.",
    by: "Yuki, Tech Lead at BalancedTech",
    imgSrc: "https://i.pravatar.cc/150?img=19",
  },
  {
    id: 19,
    quote: "We've tried many solutions, but COMPANY stands out in terms of reliability and performance.",
    by: "Zoe, Performance Manager at ReliableSystems",
    imgSrc: "https://i.pravatar.cc/150?img=20",
  },
];

/* ------------------------------------------------------------------ */
/*  Desktop – Stagger fan (original layout)                            */
/* ------------------------------------------------------------------ */
interface DesktopCardProps {
  position: number;
  testimonial: StaggerTestimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const DesktopCard: React.FC<DesktopCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-primary"
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.15) * position}px)
          translateY(${isCenter ? -72 : position % 2 ? 22 : -22}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border))"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />
      <div className="flex h-full flex-col pt-2">
        <img
          src={testimonial.imgSrc}
          alt={testimonial.by.split(",")[0]}
          className="mb-4 h-14 w-12 bg-muted object-cover object-top"
          style={{ boxShadow: "3px 3px 0px hsl(var(--background))" }}
        />
        <div className="min-h-0 flex-1 overflow-hidden">
          <h3
            className={cn(
              "line-clamp-10 font-medium leading-relaxed",
              isCenter ? "text-primary-foreground" : "text-foreground"
            )}
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 0.9rem)" }}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </h3>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p
            className={cn(
              "text-sm italic",
              isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
            )}
          >
            - {testimonial.by}
          </p>
          {testimonial.linkedin && (
            <a
              href={testimonial.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "inline-flex items-center justify-center transition-colors",
                isCenter
                  ? "text-primary-foreground/60 hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-accent"
              )}
              aria-label={`${testimonial.by.split(",")[0]} on LinkedIn`}
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Mobile – single card carousel                                      */
/* ------------------------------------------------------------------ */
const MobileTestimonialCard: React.FC<{
  testimonial: StaggerTestimonial;
}> = ({ testimonial }) => (
  <div className="relative mx-auto w-full max-w-sm rounded-2xl border-2 border-primary bg-primary p-6 text-primary-foreground shadow-lg">
    {/* Decorative corner */}
    <span
      className="absolute block origin-top-right rotate-45 bg-primary-foreground/20"
      style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
    />

    <img
      src={testimonial.imgSrc}
      alt={testimonial.by.split(",")[0]}
      className="mb-4 h-14 w-12 bg-primary-foreground/10 object-cover object-top"
      style={{ boxShadow: "3px 3px 0px hsl(var(--background))" }}
    />

    <h3
      className="mb-6 font-medium leading-relaxed text-primary-foreground"
      style={{ fontSize: "clamp(0.85rem, 4vw, 1rem)" }}
    >
      &ldquo;{testimonial.quote}&rdquo;
    </h3>

    <div className="flex items-center justify-between">
      <p className="text-sm italic text-primary-foreground/80">
        - {testimonial.by}
      </p>
      {testimonial.linkedin && (
        <a
          href={testimonial.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-primary-foreground/60 transition-colors hover:text-primary-foreground"
          aria-label={`${testimonial.by.split(",")[0]} on LinkedIn`}
        >
          <Linkedin className="h-4 w-4" />
        </a>
      )}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
type StaggerTestimonialsProps = {
  testimonials?: StaggerTestimonial[];
  /** Index of the testimonial that should appear centered by default. */
  initialCenter?: number;
};

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  testimonials = defaultTestimonials,
  initialCenter,
}) => {
  const [cardSize, setCardSize] = useState(400);
  const [isMobile, setIsMobile] = useState(false);

  /* Ordered list for desktop stagger fan */
  const [list, setList] = useState<StaggerTestimonial[]>(() =>
    testimonials.map((t, i) => ({ ...t, id: t.id ?? i }))
  );

  /* Active index for mobile carousel */
  const [activeIdx, setActiveIdx] = useState(
    initialCenter ?? Math.floor(testimonials.length / 2)
  );

  const handleMove = useCallback(
    (steps: number) => {
      setList((prev) => {
        const next = [...prev];
        if (steps > 0) {
          for (let i = steps; i > 0; i--) {
            const item = next.shift();
            if (!item) return prev;
            next.push({ ...item, id: Math.random() });
          }
        } else {
          for (let i = steps; i < 0; i++) {
            const item = next.pop();
            if (!item) return prev;
            next.unshift({ ...item, id: Math.random() });
          }
        }
        return next;
      });
    },
    []
  );

  const goPrev = useCallback(() => {
    setActiveIdx((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }, [testimonials.length]);

  const goNext = useCallback(() => {
    setActiveIdx((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }, [testimonials.length]);

  /* Responsive breakpoint */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);

    const onBreakpoint = () => {
      const { matches: isLg } = window.matchMedia("(min-width: 1024px)");
      const { matches: isSm } = window.matchMedia("(min-width: 640px)");
      setCardSize(isLg ? 460 : isSm ? 380 : 320);
    };

    onBreakpoint();
    mq.addEventListener("change", () => setIsMobile(mq.matches));
    window.addEventListener("resize", onBreakpoint);
    return () => {
      mq.removeEventListener("change", () => setIsMobile(mq.matches));
      window.removeEventListener("resize", onBreakpoint);
    };
  }, []);

  /* ---- Touch swipe for mobile ---- */
  const touchStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      touchStartX.current = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      if (delta > 0) goNext();
      else goPrev();
    },
    [goNext, goPrev]
  );

  /* ---- Mobile layout ---- */
  if (isMobile) {
    return (
      <div
        className="relative w-full overflow-hidden bg-muted/30 px-4 py-6"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <MobileTestimonialCard testimonial={testimonials[activeIdx]} />

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-background transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Pagination dots */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === activeIdx
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === activeIdx ? "true" : undefined}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-background transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  /* ---- Desktop layout ---- */
  const centerOffset =
    initialCenter !== undefined
      ? initialCenter - Math.floor(list.length / 2)
      : 0;

  return (
    <div
      className="relative w-full overflow-hidden bg-muted/30"
      style={{ height: 780 }}
    >
      {list.map((testimonial, index) => {
        const position =
          index - Math.floor(list.length / 2) - centerOffset;
        return (
          <DesktopCard
            key={testimonial.id}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
