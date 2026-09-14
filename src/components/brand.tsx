"use client";

import { useState } from "react";

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
 * Octo wordmark lockup. Drawn from the mark plus live type rather than a
 * bitmap or remote SVG, so it stays crisp at any size and picks up the page's
 * own typeface and colour tokens.
 */
export function BrandLogo({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <span
      className={`inline-flex items-center gap-[7px] ${
        tone === "paper" ? "text-white" : "text-ink"
      } ${className ?? ""}`}
    >
      <OctoMark className="h-[19px] w-[19px] shrink-0 text-orange" />
      <span className="text-[17px] leading-none tracking-[-0.03em]">Octo</span>
    </span>
  );
}

/**
 * The Octo mark: a domed mantle with two eyes and four tapering tentacles,
 * drawn as one evenodd path — mantle, four tentacles and two eyes each a
 * closed subpath — so the eyes stay knocked out on any background and
 * the whole glyph inherits `currentColor`. Sized on a 24-unit grid with the
 * artwork spanning 3–21, so it optically centres next to text.
 */
export function OctoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3 13A9 10 0 0 1 21 13Z
           M3 13a2.25 8 0 0 0 4.5 0Z
           M7.5 13a2.25 8 0 0 0 4.5 0Z
           M12 13a2.25 8 0 0 0 4.5 0Z
           M16.5 13a2.25 8 0 0 0 4.5 0Z
           M10.45 10.2a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 1 1 2.9 0Z
           M16.45 10.2a1.45 1.45 0 1 1-2.9 0 1.45 1.45 0 1 1 2.9 0Z"
      />
    </svg>
  );
}
