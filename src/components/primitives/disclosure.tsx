"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type DisclosureProps = {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

/**
 * Height-animating disclosure built on grid-template-rows so the collapsed
 * state has no measurable height and nothing jumps when it expands.
 */
export function Disclosure({
  summary,
  children,
  defaultOpen = false,
  className,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left text-[15px] tracking-[-0.01em] text-ink"
      >
        {summary}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="shrink-0 text-muted transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        id={panelId}
        inert={!open}
        aria-hidden={!open}
        className="grid transition-[grid-template-rows] duration-[260ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
