"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useStickyProgress } from "@/components/primitives/sticky-progress";
import { usePrefersReducedMotion } from "@/components/primitives/use-reduced-motion";
import { problemPanels, problemStatement, type ProblemPanel } from "@/lib/data";
import { easePanel } from "@/lib/motion";

const WORDS = problemStatement.split(" ");

/** Scroll positions at which each floating panel is introduced. */
const PANEL_AT = [0.32, 0.52, 0.72];

const TONE_COLOR: Record<ProblemPanel["rows"][number]["tone"], string> = {
  neutral: "rgba(255,255,255,0.72)",
  warn: "#f0a05a",
  risk: "#fe4c00",
};

export function ProblemSequence() {
  const reduced = usePrefersReducedMotion();
  const { ref, progress } = useStickyProgress(WORDS.length * 2);

  // Words light up across the first two thirds; panels arrive behind them.
  const textProgress = clamp((progress - 0.05) / 0.6, 0, 1);
  const lit = reduced ? WORDS.length : Math.round(textProgress * WORDS.length);
  const panelVisible = (i: number) => reduced || progress >= PANEL_AT[i];

  return (
    <section
      ref={ref}
      aria-label="Why disconnected customer operations compound risk"
      className="problem-track relative bg-dark"
    >
      <div className="problem-stage on-dark">
        <div className="px-page relative flex h-full flex-col items-center justify-center gap-8 lg:gap-0">
          {/* Stone layers sit behind the panels on wide screens only. */}
          <TextureLayer
            src={problemPanels[0].texture}
            visible={panelVisible(0)}
            className="lg:left-[2%] lg:top-[8%] lg:h-[210px] lg:w-[230px]"
          />
          <TextureLayer
            src={problemPanels[2].texture}
            visible={panelVisible(2)}
            className="lg:right-[10%] lg:bottom-[6%] lg:h-[200px] lg:w-[240px]"
          />

          <FloatingPanel
            panel={problemPanels[0]}
            visible={panelVisible(0)}
            reduced={reduced}
            className="w-full max-w-[320px] lg:absolute lg:top-[14%] lg:left-[4%] lg:max-w-[262px] xl:left-[7%]"
          />

          <FloatingPanel
            panel={problemPanels[1]}
            visible={panelVisible(1)}
            reduced={reduced}
            className="hidden lg:absolute lg:top-[24%] lg:right-[5%] lg:block lg:w-[262px] xl:right-[8%]"
          />

          <p className="relative z-10 max-w-[1020px] text-center text-[24px] leading-[1.3] tracking-[-0.025em] md:text-[32px] lg:text-[40px] xl:text-[44px]">
            {WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                style={{
                  color: i < lit ? "#ffffff" : "rgba(255,255,255,0.2)",
                  transition: "color 100ms linear",
                }}
              >
                {word}
                {i < WORDS.length - 1 ? " " : ""}
              </span>
            ))}
          </p>

          <FloatingPanel
            panel={problemPanels[2]}
            visible={panelVisible(2)}
            reduced={reduced}
            className="w-full max-w-[320px] lg:absolute lg:bottom-[11%] lg:left-[13%] lg:max-w-[262px] xl:left-[16%]"
          />
        </div>
      </div>
    </section>
  );
}

function FloatingPanel({
  panel,
  visible,
  reduced,
  className,
}: {
  panel: ProblemPanel;
  visible: boolean;
  reduced: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative z-10 border border-dark-line bg-dark-raised ${className ?? ""}`}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={
        reduced || visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
      }
      transition={reduced ? { duration: 0 } : { duration: 0.55, ease: easePanel }}
    >
      <p className="border-b border-dark-line px-3.5 py-2.5 text-[11.5px] tracking-[-0.01em] text-white">
        {panel.heading}
      </p>
      <dl className="flex flex-col">
        {panel.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-3 border-b border-white/[0.07] px-3.5 py-2.5 last:border-b-0"
          >
            <dt className="text-[11px] leading-[15px] text-white/45">
              {row.label}
            </dt>
            <dd
              className="shrink-0 text-[11px] leading-[15px]"
              style={{ color: TONE_COLOR[row.tone] }}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}

function TextureLayer({
  src,
  visible,
  className,
}: {
  src?: string;
  visible: boolean;
  className?: string;
}) {
  if (!src) return null;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden overflow-hidden lg:block ${className ?? ""}`}
      style={{
        opacity: visible ? 0.5 : 0,
        transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <Image src={src} alt="" fill sizes="240px" className="object-cover" />
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
