"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Full loop duration, in seconds. */
  durationSeconds?: number;
  /** Accessible description of the duplicated content. */
  label: string;
};

/**
 * CSS-driven infinite marquee. The track holds the row twice so the loop is
 * seamless; the duplicate is hidden from assistive technology.
 */
export function Marquee({
  children,
  className,
  durationSeconds = 45,
  label,
}: MarqueeProps) {
  return (
    <div
      className={`marquee-viewport relative overflow-hidden ${className ?? ""}`}
      aria-label={label}
      role="group"
    >
      <div
        className="marquee-track"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
