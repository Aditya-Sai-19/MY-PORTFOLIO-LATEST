"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export function ArrowLink({ children, className, ...props }: ArrowLinkProps) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:text-accent",
        className
      )}
      {...props}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        aria-hidden="true"
      />
    </a>
  );
}
