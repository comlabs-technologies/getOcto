"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { easeEditorial } from "@/lib/motion";
import { usePrefersReducedMotion } from "./use-reduced-motion";

type RevealProps = {
  children: ReactNode;
  /** Vertical travel in pixels. */
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
  /** Fraction of the element that must be visible before playing. */
  amount?: number;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Plays a single fade + rise the first time the element enters the viewport.
 * Under reduced motion the final state is rendered immediately.
 */
export function Reveal({
  children,
  y = 16,
  delay = 0,
  duration = 0.7,
  className,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: easeEditorial }}
    >
      {children}
    </Tag>
  );
}
