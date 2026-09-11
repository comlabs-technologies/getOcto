"use client";

import { motion } from "motion/react";
import { easeEditorial } from "@/lib/motion";
import { usePrefersReducedMotion } from "./use-reduced-motion";

type StaggerTextProps = {
  /** Each entry is a meaningful group — usually a full headline line. */
  groups: string[];
  className?: string;
  groupClassName?: string;
  /** Animation start offset, in seconds. */
  delay?: number;
  /** Gap between consecutive groups, in seconds. */
  stagger?: number;
  duration?: number;
  y?: number;
  play?: boolean;
};

/**
 * Rises headline lines into place one group at a time. Each group keeps its own
 * block box so nothing reflows while the animation runs.
 */
export function StaggerText({
  groups,
  className,
  groupClassName,
  delay = 0,
  stagger = 0.075,
  duration = 0.85,
  y = 18,
  play = true,
}: StaggerTextProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <span className={className}>
      {groups.map((group, index) => (
        <span key={group} className="block overflow-hidden">
          <motion.span
            className={groupClassName ? `block ${groupClassName}` : "block"}
            initial={reduced ? false : { opacity: 0, y }}
            animate={
              reduced || play ? { opacity: 1, y: 0 } : { opacity: 0, y }
            }
            transition={
              reduced
                ? { duration: 0 }
                : {
                    duration,
                    delay: delay + index * stagger,
                    ease: easeEditorial,
                  }
            }
          >
            {group}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
