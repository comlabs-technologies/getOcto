"use client";

import { useScroll, useMotionValueEvent } from "motion/react";
import { useRef, useState, type RefObject } from "react";

type StickyProgressResult = {
  /** Attach to the tall outer section. */
  ref: RefObject<HTMLDivElement | null>;
  /** 0 → 1 across the pinned scroll distance, sampled at `steps` resolution. */
  progress: number;
};

/**
 * Reads scroll progress across a pinned section using Motion's scroll values —
 * no unthrottled scroll listeners. Progress is quantised so React only
 * re-renders when the value moves a meaningful amount.
 */
export function useStickyProgress(steps = 120): StickyProgressResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const quantised = Math.round(latest * steps) / steps;
    setProgress((current) => (current === quantised ? current : quantised));
  });

  return { ref, progress };
}
