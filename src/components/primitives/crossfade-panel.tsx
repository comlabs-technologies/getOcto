"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { easeEditorial } from "@/lib/motion";
import { usePrefersReducedMotion } from "./use-reduced-motion";

type CrossfadePanelProps = {
  /** Changing this key triggers the crossfade. */
  activeKey: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Adds the 4px defocus used by the product-mode switcher. */
  blur?: boolean;
  duration?: number;
  /** Forwarded to the animated element, e.g. tabpanel semantics. */
  innerProps?: {
    role?: string;
    id?: string;
    tabIndex?: number;
    "aria-labelledby"?: string;
    "aria-label"?: string;
  };
};

/**
 * Stacks the outgoing and incoming panels in the same grid cell so the section
 * height never changes mid-transition.
 */
export function CrossfadePanel({
  activeKey,
  children,
  className,
  innerClassName,
  blur = true,
  duration = 0.4,
  innerProps,
}: CrossfadePanelProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className={className}>
        <div className={innerClassName} {...innerProps}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative grid ${className ?? ""}`}>
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={activeKey}
          {...innerProps}
          className={innerClassName}
          style={{ gridArea: "1 / 1 / 2 / 2" }}
          initial={{
            opacity: 0,
            y: 10,
            filter: blur ? "blur(4px)" : "blur(0px)",
          }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            y: -8,
            filter: blur ? "blur(4px)" : "blur(0px)",
            pointerEvents: "none",
            // Taken out of flow so the container resizes once, not twice.
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
          transition={{ duration, ease: easeEditorial }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
