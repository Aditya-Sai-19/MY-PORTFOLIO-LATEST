"use client";

import * as React from "react";
import {
  BrainCircuit,
  FileSearch,
  Flower2,
  Home,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import InteractiveSelector, {
  type SelectorOption,
} from "@/components/ui/interactive-selector";
import { SOCIAL_LINKS } from "@/constants/theme";

const PROJECT_OPTIONS: SelectorOption[] = [
  {
    title: "Fake Review Detection",
    description:
      "A Flask-based web app that detects fake Amazon food reviews using a hybrid deep learning model combining CNN, LSTM, and fuzzy logic.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    icon: <BrainCircuit size={24} className="text-white" />,
    href: SOCIAL_LINKS.github,
  },
  {
    title: "IRIS Classification Model",
    description:
      "Supervised learning model that classifies iris flower species from petal and sepal dimensions using decision trees and logistic regression.",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    icon: <Flower2 size={24} className="text-white" />,
    href: "https://huggingface.co/spaces/Aditya-Sai-19/iris-classification-app",
  },
  {
    title: "House Price Prediction",
    description:
      "Regression model predicting housing prices from location, size, and amenities with feature engineering and multi-algorithm comparison.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    icon: <Home size={24} className="text-white" />,
    href: "https://huggingface.co/spaces/Aditya-Sai-19/House_Price_Predictor",
  },
  {
    title: "Phishing URL Detection",
    description:
      "Classifies URLs as phishing or legitimate from structural and lexical features, reaching up to 96.9% accuracy with Random Forest, KNN, Logistic Regression, and Naive Bayes.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    icon: <ShieldCheck size={24} className="text-white" />,
    href: "https://huggingface.co/spaces/Aditya-Sai-19/PHISHING-URL-DETECTION",
  },
  {
    title: "Cricket Document Similarity Search",
    description:
      "Semantic search app that finds the most relevant document about a cricketer using text embeddings and natural language queries, orchestrated with LangChain.",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    icon: <FileSearch size={24} className="text-white" />,
    href: "https://huggingface.co/spaces/Aditya-Sai-19/cricket_similarity_search",
  },
];

export default function Projects() {
  return (
    <section id="work" className="relative px-4 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Selected work"
          size="lg"
          title={
            <>
              Things I&apos;ve built,{" "}
              <span className="text-muted-foreground">carefully.</span>
            </>
          }
          description="Machine learning, deep learning, and applied AI — from classification models to deployed semantic search apps."
        />
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl md:mt-20">
        <InteractiveSelector
          options={PROJECT_OPTIONS}
          heading=""
          ariaLabel="Projects"
          className="min-h-[620px] rounded-3xl border border-white/10 shadow-2xl"
        />
      </div>
    </section>
  );
}
