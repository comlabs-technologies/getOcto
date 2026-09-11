import type { Transition } from "motion/react";

/** Shared editorial easing curves, mirrored by the CSS custom properties. */
export const easeEditorial = [0.22, 1, 0.36, 1] as const;
export const easeSwift = [0.2, 0.8, 0.2, 1] as const;
export const easePanel = [0.16, 1, 0.3, 1] as const;

export const transitions = {
  /** Hero entrance — long, calm, non-looping. */
  entrance: (duration: number, delay = 0): Transition => ({
    duration,
    delay,
    ease: easeEditorial,
  }),
  /** Floating diagnostic / problem panels. */
  panel: { duration: 0.55, ease: easePanel } as Transition,
  /** Product mode crossfade — deliberately not a spring. */
  crossfade: { duration: 0.4, ease: easeEditorial } as Transition,
  /** Modal surface. */
  modal: { duration: 0.45, ease: easeEditorial } as Transition,
  overlay: { duration: 0.35, ease: "linear" } as Transition,
} as const;
