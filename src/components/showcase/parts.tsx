"use client";

import Image from "next/image";
import type { ReactNode } from "react";

/** Full-bleed texture layer behind a card's UI. */
export function Texture({
  src,
  className,
  opacity,
}: {
  src: string;
  className?: string;
  opacity?: number;
}) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="(min-width: 1024px) 34vw, 100vw"
      style={opacity ? { opacity } : undefined}
      className={`object-cover ${className ?? ""}`}
    />
  );
}

/** The visual block of a showcase card plus its caption beneath. */
export function ShowcaseCard({
  title,
  description,
  span,
  surfaceClassName,
  children,
}: {
  title: string;
  description: string;
  span: string;
  surfaceClassName?: string;
  children: ReactNode;
}) {
  return (
    <article className={`flex min-w-0 flex-col ${span}`}>
      <div
        className={`relative h-[312px] overflow-hidden border border-line ${surfaceClassName ?? "bg-paper"}`}
      >
        {children}
      </div>
      <div className="mt-4 min-h-[62px]">
        <h3 className="text-[15px] tracking-[-0.02em] text-ink">{title}</h3>
        <p className="mt-1 text-[13px] leading-[18px] text-muted">
          {description}
        </p>
      </div>
    </article>
  );
}

/** Small labelled row used across several product mockups. */
export function Row({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function Dot({ tone }: { tone: "orange" | "muted" | "green" | "ink" }) {
  const colors: Record<string, string> = {
    orange: "#fe4c00",
    muted: "rgba(30,30,30,0.28)",
    green: "#4b9d63",
    ink: "#1e1e1e",
  };
  return (
    <span
      aria-hidden="true"
      className="h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ backgroundColor: colors[tone] }}
    />
  );
}

/** Remote UI icon (SVG) rendered through a plain <img>. */
export function UiIcon({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote SVG
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

/** Vertical rail used by the timeline mockups. */
export function Rail({
  steps,
  className,
}: {
  steps: { label: string; meta?: string; state: "done" | "active" | "todo" }[];
  className?: string;
}) {
  return (
    <ol className={`relative flex flex-col ${className ?? ""}`}>
      {steps.map((step, i) => (
        <li key={step.label} className="relative flex gap-3 pb-[13px] last:pb-0">
          <span className="relative flex w-3 shrink-0 justify-center">
            {i < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-3 bottom-[-13px] w-px bg-line"
              />
            ) : null}
            <span
              aria-hidden="true"
              className="relative mt-[5px] h-[7px] w-[7px] rounded-full"
              style={{
                backgroundColor:
                  step.state === "todo" ? "transparent" : "#fe4c00",
                border:
                  step.state === "todo"
                    ? "1px solid rgba(30,30,30,0.28)"
                    : "1px solid #fe4c00",
                opacity: step.state === "active" ? 1 : undefined,
              }}
            />
          </span>
          <span className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
            <span
              className="text-[11.5px] leading-[17px] tracking-[-0.01em]"
              style={{
                color: step.state === "todo" ? "#74706d" : "#1e1e1e",
              }}
            >
              {step.label}
            </span>
            {step.meta ? (
              <span className="shrink-0 text-[10px] leading-[16px] text-muted">
                {step.meta}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}
