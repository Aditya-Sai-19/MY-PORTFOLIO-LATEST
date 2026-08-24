"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectorOption = {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  /** Optional outbound link shown when the option is active. */
  href?: string;
  /** How the image fills the card: cover (crop to fill, default) or contain (full image, no crop). */
  imageFit?: "cover" | "contain";
};

type InteractiveSelectorProps = {
  options?: SelectorOption[];
  /** Optional heading; omit or pass "" to hide the header block. */
  heading?: string;
  subheading?: string;
  ariaLabel?: string;
  className?: string;
};

const InteractiveSelector = ({
  options = [],
  heading = "",
  subheading,
  ariaLabel = "Interactive selector",
  className,
}: InteractiveSelectorProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [options]);

  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        "relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-3xl font-sans",
        className
      )}
    >
      {heading ? (
        <div className="mb-2 mt-8 w-full max-w-2xl px-6 text-center">
          <h2 className="animate-fadeInTop delay-300 mb-3 text-4xl font-extrabold tracking-tight text-foreground drop-shadow-lg md:text-5xl">
            {heading}
          </h2>
          {subheading ? (
            <p className="animate-fadeInTop delay-600 mx-auto max-w-xl text-lg font-medium text-muted-foreground md:text-xl">
              {subheading}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="h-8" />

      {/* Options Container */}
      <div className="options relative mx-0 flex h-[420px] w-full items-stretch overflow-x-auto overflow-y-hidden sm:min-w-0">
        {options.map((option, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className={cn(
                "option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out",
                isActive && "active"
              )}
              style={{
                backfaceVisibility: "hidden",
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? "translateX(0)" : "translateX(-60px)",
                minWidth: "60px",
                minHeight: "100px",
                margin: 0,
                borderRadius: 0,
                cursor: "pointer",
                flex: isActive ? "7 1 0%" : "1 1 0%",
                zIndex: isActive ? 10 : 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                position: "relative",
                overflow: "hidden",
                willChange: "flex-grow, box-shadow",
              }}
              onClick={() => handleOptionClick(index)}
            >
              {/* Image layer */}
              <img
                src={option.image}
                alt={option.title}
                className="pointer-events-none absolute inset-0 h-full w-full transition-all duration-700 ease-in-out"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
                draggable={false}
              />
              {/* Theme-aware border overlay */}
              <div
                className="pointer-events-none absolute inset-0 border-2 transition-all duration-700 ease-in-out"
                style={{
                  borderColor: isActive
                    ? "hsl(var(--foreground))"
                    : "hsl(var(--border))",
                }}
              />

              {/* Shadow gradient overlay for text readability */}
              <div
                className="shadow pointer-events-none absolute left-0 right-0 transition-all duration-700 ease-in-out"
                style={{
                  bottom: isActive ? "0" : "-40px",
                  height: "120px",
                  boxShadow: isActive
                    ? "inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000"
                    : "inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000",
                }}
              />

              {/* Label with icon and info */}
              <div className="label pointer-events-none absolute bottom-5 left-0 right-0 z-2 flex h-12 w-full items-center justify-start gap-3 px-4">
                <div className="icon flex h-[44px] min-w-[44px] max-w-[44px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-full border-2 border-border/60 bg-background/85 shadow-[0_1px_4px_rgba(0,0,0,0.18)] backdrop-blur-[10px] transition-all duration-200 dark:border-white/20 dark:bg-black/70">
                  {option.icon}
                </div>
                <div className="info relative whitespace-pre text-white">
                  <div
                    className="main text-lg font-bold transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(25px)",
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="sub text-base text-white/70 transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(25px)",
                    }}
                  >
                    {option.description}
                  </div>
                  {option.href ? (
                    <a
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      tabIndex={isActive ? 0 : -1}
                      aria-hidden={isActive ? undefined : true}
                      className={cn(
                        "mt-1 flex items-center gap-1 text-[13px] font-semibold text-white/90 transition-all duration-700 ease-in-out hover:text-white",
                        isActive ? "pointer-events-auto" : "pointer-events-none"
                      )}
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateX(0)" : "translateX(25px)",
                      }}
                    >
                      View project
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  );
};

export default InteractiveSelector;
