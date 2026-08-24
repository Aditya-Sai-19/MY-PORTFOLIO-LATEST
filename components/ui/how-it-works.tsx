"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  colorTheme = "blue",
  rotate,
  colors: customColors,
}: CardProps) => {
  const defaultBgColors = {
    orange: "bg-orange-50 dark:bg-orange-500/10",
    blue: "bg-blue-50 dark:bg-blue-500/10",
    purple: "bg-purple-50 dark:bg-purple-500/10",
  };
  const defaultTextColors = {
    orange: "text-orange-500 dark:text-orange-400",
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
  };
  const defaultBorderColors = {
    orange: "border-orange-100 dark:border-orange-500/20",
    blue: "border-blue-100 dark:border-blue-500/20",
    purple: "border-purple-100 dark:border-purple-500/20",
  };

  const bgColor = customColors?.bg || defaultBgColors[colorTheme];
  const textColor = customColors?.text || defaultTextColors[colorTheme];
  const borderColor = customColors?.border || defaultBorderColors[colorTheme];

  return (
    <div
      className={`transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate}`}
    >
      <div className="bg-white dark:bg-neutral-900 p-2 rounded-[25px] shadow-[0px_10px_20px_0px_#D3D3D3] dark:shadow-none border border-neutral-100 dark:border-neutral-800">
        <Pin className={`w-8 h-8 ${textColor} z-20 mb-6 mx-auto`} />
        <div
          className={`${bgColor} border ${borderColor} rounded-[15px] p-[15px] h-full flex flex-col relative overflow-hidden`}
        >
          <span
            className={`${textColor} text-4xl font-handwriting mb-5`}
            style={{
              fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif',
            }}
          >
            {number}
          </span>
          <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 leading-none mb-[10px]">
            {title}
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm/5 tracking-tight whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
  children?: React.ReactNode;
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { rotate: "rotate-2" },
  { rotate: "-rotate-2" },
  { rotate: "rotate-2" },
  { rotate: "-rotate-2" },
  { rotate: "rotate-2" },
  { rotate: "-rotate-2" },
];

export default function HowItWorks({
  features,
  className,
  stepPositions,
  children,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: "Create Account",
      description:
        "Sign up in minutes. Enter your details and verify your email to get started.",
      colorTheme: "orange",
    },
    {
      title: "Verify Identity",
      description:
        "Complete your profile verification to ensure secure transactions and compliance.",
      colorTheme: "blue",
    },
    {
      title: "Select Plan",
      description:
        "Choose from a variety of investment plans tailored to your financial goals.",
      colorTheme: "purple",
    },
    {
      title: "Analyze & Invest",
      description:
        "Review returns and make your first investment with confidence.",
      colorTheme: "orange",
    },
    {
      title: "Track Growth",
      description:
        "Monitor your portfolio in real-time and watch your wealth grow over time.",
      colorTheme: "blue",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`bg-white dark:bg-black max-md:pt-10 max-md:pb-25 md:py-20 px-8 relative ${className}`}
      >
        {children}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15]"
          style={{
            backgroundImage: "linear-gradient(#000 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
        ></div>
        <div
          className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-[0.1]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
        ></div>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Timeline layout: center vertical line + alternating left/right cards */}
          <div className="relative">
            {/* Center vertical dashed line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block z-0">
              <div className="h-full border-l border-dashed border-neutral-300 dark:border-neutral-700" />
            </div>

            {data.map((step, index) => {
              const position = positions[index % positions.length];
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.title}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_3rem_1fr] gap-y-6 md:gap-y-10 items-start"
                >
                  {isLeft ? (
                    <>
                      {/* Card on left */}
                      <div className="flex justify-end">
                        <div className="w-full max-w-md">
                          <Card
                            number={`0${index + 1}`}
                            title={step.title}
                            description={step.description}
                            colorTheme={step.colorTheme || "blue"}
                            colors={step.colors}
                            rotate={position.rotate}
                          />
                        </div>
                      </div>

                      {/* Center connector — horizontal from card to center line */}
                      <div className="hidden md:flex items-start justify-center pt-[22px] relative">
                        <div className="w-full border-t border-dashed border-neutral-300 dark:border-neutral-700" />
                        {/* Dot at the junction */}
                        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 border-2 border-white dark:border-neutral-900" />
                      </div>

                      {/* Empty right column */}
                      <div />
                    </>
                  ) : (
                    <>
                      {/* Empty left column */}
                      <div />

                      {/* Center connector — horizontal from center line to card */}
                      <div className="hidden md:flex items-start justify-center pt-[22px] relative">
                        <div className="w-full border-t border-dashed border-neutral-300 dark:border-neutral-700" />
                        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 border-2 border-white dark:border-neutral-900" />
                      </div>

                      {/* Card on right */}
                      <div className="flex justify-start">
                        <div className="w-full max-w-md">
                          <Card
                            number={`0${index + 1}`}
                            title={step.title}
                            description={step.description}
                            colorTheme={step.colorTheme || "blue"}
                            colors={step.colors}
                            rotate={position.rotate}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
