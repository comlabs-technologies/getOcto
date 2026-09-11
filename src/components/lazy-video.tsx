"use client";

import { useEffect, useRef, useState } from "react";
import { media } from "@/lib/media";

/**
 * The MP4 preview is only wired up once the element is actually on screen —
 * `src` stays unset until then, so the file is never fetched for visitors who
 * do not scroll this far.
 */
export function LazyVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const node = ref.current;
    if (!node || src) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSrc(media.rhoPreview);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    if (!src) return;
    const node = ref.current;
    if (!node) return;
    const play = node.play();
    if (play && typeof play.catch === "function") play.catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      poster={media.rhoPoster}
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    />
  );
}
