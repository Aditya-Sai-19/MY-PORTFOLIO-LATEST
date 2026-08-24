"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_ITEMS, SITE } from "@/constants/theme";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // True while the cinematic motion footer (last section, #contact) is on screen:
  // the navbar then morphs into a vertical rail on the right edge.
  const [inFooter, setInFooter] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  // Scroll state via GSAP ScrollTrigger (controlled scroll state)
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: "top -24",
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => st.kill();
  }, []);

  // Morph to the vertical right rail only while the motion footer (last
  // section, #contact) is on screen. A plain scroll listener on the live
  // bounding rect is bulletproof here — GSAP caches trigger positions and can
  // go stale while the lazy video/images settle the page height.
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("contact");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const active = rect.top <= window.innerHeight;
      setInFooter((prev) => {
        if (active && !prev) setOpen(false);
        return active;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Track the section currently in view
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const links = (vertical: boolean) => (
    <div className={cn("items-center gap-1", vertical ? "flex flex-col" : "hidden md:flex")}>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className={cn(
            "relative rounded-full text-sm font-medium transition-colors duration-300",
            vertical ? "px-3 py-1.5 text-left" : "px-3 py-2",
            active === item.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {active === item.id && (
            <motion.span
              layoutId="nav-active"
              className="glass-subtle absolute inset-0 rounded-full"
              transition={{ duration: 0.45, ease: EASE }}
            />
          )}
          <span className="relative">{item.label}</span>
        </button>
      ))}
    </div>
  );

  const themeToggle = (
    <button
      onClick={toggleTheme}
      className="glass-subtle flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:text-foreground"
      aria-label="Toggle color theme"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );

  return (
    <AnimatePresence>
      {inFooter ? (
        /* ---- Vertical rail on the right edge (motion footer section only) ---- */
        <motion.div
          key="nav-side"
          initial={{ opacity: 0, x: 56, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-end px-4 md:px-6"
        >
          <nav
            className="glass pointer-events-auto flex w-auto flex-col items-center gap-1.5 rounded-[2rem] p-2.5 shadow-glass-lg"
            aria-label="Primary navigation"
          >
            <button
              onClick={() => scrollTo("hero")}
              className="glass mb-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-foreground transition-transform duration-300 ease-out-expo hover:scale-105"
              aria-label="Back to top"
            >
              AS
            </button>
            {links(true)}
            {themeToggle}
          </nav>
        </motion.div>
      ) : (
        /* ---- Horizontal pill at the top (every other section) ---- */
        <motion.div
          key="nav-top"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
          className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6"
        >
          <motion.nav
            initial={{ y: -32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className={cn(
              "glass mx-auto flex max-w-4xl items-center justify-between rounded-full pl-2 pr-2 transition-all duration-300 ease-out-expo md:pl-3",
              scrolled
                ? "scale-[0.98] bg-white/60 py-1.5 shadow-glass-lg dark:bg-[#101514]/60"
                : "py-2"
            )}
            aria-label="Primary navigation"
          >
            {/* Logo */}
            <button
              onClick={() => scrollTo("hero")}
              className="group flex items-center gap-2.5 rounded-full pr-2"
              aria-label="Back to top"
            >
              <span className="glass flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-foreground transition-transform duration-300 ease-out-expo group-hover:scale-105">
                AS
              </span>
              <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:block">
                {SITE.name}
              </span>
            </button>

            {/* Desktop links */}
            {links(false)}

            {/* Right controls */}
            <div className="flex items-center gap-1">
              {themeToggle}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="glass-subtle flex h-9 w-9 items-center justify-center rounded-full text-foreground md:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </motion.nav>

          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="glass mx-auto mt-2 max-w-4xl rounded-3xl p-2 md:hidden"
              >
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3, ease: EASE }}
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      "flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors duration-300",
                      active === item.id
                        ? "glass-subtle text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
