"use client";

import { useState } from "react";
import { media } from "@/lib/media";

/**
 * Remote SVG wordmark with a typeset fallback. The SVGs are served from
 * their original host and are never copied locally; if one fails to load we
 * degrade to a wordmark rather than showing a broken image.
 */
export function LogoMark({
  src,
  name,
  className,
  imgClassName,
  wordmarkClassName,
}: {
  src: string;
  name: string;
  className?: string;
  imgClassName?: string;
  wordmarkClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`${className ?? ""} ${wordmarkClassName ?? ""} inline-flex items-center text-[15px] font-medium tracking-[-0.02em] text-ink`}
      >
        {name}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote SVG, must not pass through the image optimizer
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${className ?? ""} ${imgClassName ?? ""}`}
    />
  );
}

/**
 * Brand lockup used in the header and footer. The wordmark image itself is
 * left as-is for the separate visual-branding pass; only the accessible name
 * and the typeset fallback carry the Octo name.
 */
export function BrandLogo({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`inline-flex items-center gap-2 text-[17px] tracking-[-0.03em] ${
          tone === "paper" ? "text-white" : "text-ink"
        } ${className ?? ""}`}
      >
        <RabbitMark className="h-[18px] w-[18px]" />
        Octo
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote SVG, must not pass through the image optimizer
    <img
      src={media.rulebaseLogo}
      alt="Octo"
      width={108}
      height={20}
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-[20px] w-auto ${tone === "paper" ? "brightness-0 invert" : ""} ${className ?? ""}`}
    />
  );
}

/** Geometric rabbit-style mark used on the solid tile in the integration grid. */
export function RabbitMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M7.6 10.2C7.1 7.9 6.6 5.6 6.6 4.2c0-1 .5-1.5 1.2-1.5.9 0 1.5.9 1.9 2.3.4 1.4.7 3.2.8 4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4 10.2c.5-2.3 1-4.6 1-6 0-1-.5-1.5-1.2-1.5-.9 0-1.5.9-1.9 2.3-.4 1.4-.7 3.2-.8 4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.4c3.4 0 6.1 2.6 6.1 5.9 0 3.2-2.7 5.3-6.1 5.3s-6.1-2.1-6.1-5.3c0-3.3 2.7-5.9 6.1-5.9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="9.7" cy="14.6" r="1" fill="currentColor" />
      <circle cx="14.3" cy="14.6" r="1" fill="currentColor" />
    </svg>
  );
}
