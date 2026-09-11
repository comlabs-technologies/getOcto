"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Check, Search, Sparkles, TriangleAlert } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/primitives/use-reduced-motion";
import { easePanel } from "@/lib/motion";
import { media } from "@/lib/media";

/** The six states the hero demonstration walks through, once, after hydration. */
const STATES = [
  "conversation",
  "analyzing",
  "traces",
  "path",
  "issue",
  "fix",
] as const;

type DemoState = (typeof STATES)[number];

const TIMELINE: { state: DemoState; at: number }[] = [
  { state: "analyzing", at: 2200 },
  { state: "traces", at: 3600 },
  { state: "path", at: 5100 },
  { state: "issue", at: 6500 },
  { state: "fix", at: 8600 },
];

const STATUS: Record<DemoState, string> = {
  conversation: "Live conversation",
  analyzing: "Analyzing interaction",
  traces: "Investigating traces",
  path: "Incorrect resolution path",
  issue: "Issue found",
  fix: "Fix ready",
};

const index = (state: DemoState) => STATES.indexOf(state);

const panelTransition = { duration: 0.55, ease: easePanel } as const;

export function HeroConversationDemo() {
  const reduced = usePrefersReducedMotion();
  const [played, setPlayed] = useState<DemoState>("conversation");

  // Under reduced motion the sequence never autoplays — the resolved state is
  // simply what gets rendered.
  const state: DemoState = reduced ? "fix" : played;

  useEffect(() => {
    if (reduced) return;
    const timers = TIMELINE.map(({ state: next, at }) =>
      setTimeout(() => setPlayed(next), at),
    );
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  const step = index(state);
  const flagged = step >= index("path");
  const showPanel = step >= index("analyzing");

  return (
    <div className="relative w-full max-w-[400px] md:max-w-[430px] xl:max-w-[452px]">
      {/* ---------------------------------------------------------------- */}
      {/* Conversation                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative z-10 border border-line bg-paper">
        <div className="flex items-center gap-2.5 border-b border-line-soft px-4 py-3">
          <Image
            src={media.ashlynnAvatar}
            alt=""
            width={30}
            height={30}
            className="h-[30px] w-[30px] shrink-0 object-cover"
          />
          <span className="flex flex-col leading-none">
            <span className="text-[13px] tracking-[-0.01em] text-ink">
              Ashlynn
            </span>
            <span className="mt-1 text-[11px] leading-none text-muted">
              CX AI Agent
            </span>
          </span>
          <span className="ml-auto flex items-center gap-1.5 border border-line-soft bg-panel px-2 py-1">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: flagged ? "#fe4c00" : "#4b9d63",
              }}
              aria-hidden="true"
            />
            <span className="text-[10px] leading-none tracking-[0.01em] text-muted">
              {STATUS[state]}
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-2.5 px-4 py-4">
          <Bubble tone="customer">
            I paid £240 and it left my account, but the order still says unpaid.
          </Bubble>
          <Bubble tone="agent" flagged={flagged}>
            The payment failed at the bank. Refunds take up to 30 days.
          </Bubble>
          <Bubble tone="customer">30 days? My rent is due Friday.</Bubble>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Floating diagnostic panel                                         */}
      {/* ---------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-x-[-10px] top-[calc(100%-20px)] z-20 sm:inset-x-[-22px] xl:left-[-34px] xl:right-[22px]">
        <AnimatePresence mode="wait" initial={false}>
          {showPanel ? (
            <motion.div
              key={
                step >= index("issue")
                  ? "issue"
                  : step === index("path")
                    ? "path"
                    : step === index("traces")
                      ? "traces"
                      : "analyzing"
              }
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={reduced ? { duration: 0 } : panelTransition}
              className="pointer-events-auto border border-line bg-paper"
            >
              {state === "analyzing" ? <AnalyzingPanel /> : null}
              {state === "traces" ? <TracesPanel /> : null}
              {state === "path" ? <PathPanel /> : null}
              {step >= index("issue") ? <IssuePanel /> : null}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Final notification */}
        <AnimatePresence>
          {state === "fix" ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={reduced ? { duration: 0 } : panelTransition}
              className="pointer-events-auto mt-2 flex items-center gap-2 border border-line bg-dark px-3 py-2.5"
            >
              <span
                className="flex h-4 w-4 items-center justify-center bg-orange"
                aria-hidden="true"
              >
                <Check size={11} strokeWidth={3} className="text-white" />
              </span>
              <span className="text-[12px] tracking-[-0.01em] text-white">
                Fix ready to apply
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Announce progress without moving anything on screen. */}
      <p className="sr-only" aria-live="polite">
        {STATUS[state]}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Bubble({
  tone,
  flagged = false,
  children,
}: {
  tone: "customer" | "agent";
  flagged?: boolean;
  children: React.ReactNode;
}) {
  if (tone === "customer") {
    return (
      <p className="max-w-[86%] bg-[#f1efed] px-3 py-2 text-[12.5px] leading-[18px] tracking-[-0.01em] text-ink">
        {children}
      </p>
    );
  }

  return (
    <p
      className="ml-auto max-w-[86%] border px-3 py-2 text-[12.5px] leading-[18px] tracking-[-0.01em] transition-[background-color,border-color,color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
      style={{
        backgroundColor: flagged ? "rgba(254,76,0,0.08)" : "#ffffff",
        borderColor: flagged ? "rgba(254,76,0,0.45)" : "rgba(30,30,30,0.15)",
        color: "#1e1e1e",
      }}
    >
      {children}
    </p>
  );
}

function PanelHead({
  icon,
  title,
  tone = "neutral",
}: {
  icon: React.ReactNode;
  title: string;
  tone?: "neutral" | "alert";
}) {
  return (
    <div className="flex items-center gap-2 border-b border-line-soft px-3.5 py-2.5">
      <span
        className="flex h-4 w-4 items-center justify-center"
        style={{ color: tone === "alert" ? "#fe4c00" : "#74706d" }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-[11.5px] tracking-[-0.01em] text-ink">{title}</span>
    </div>
  );
}

function AnalyzingPanel() {
  return (
    <>
      <PanelHead icon={<Sparkles size={13} />} title="Analyzing interaction" />
      <div className="px-3.5 py-3.5">
        <div className="relative h-[3px] overflow-hidden bg-[#eceae7]">
          <span
            className="absolute inset-y-0 left-0 w-1/3 bg-orange"
            style={{ animation: "sweep 1.3s linear infinite" }}
            aria-hidden="true"
          />
        </div>
        <p className="mt-3 text-[11.5px] leading-[16px] text-muted">
          Reading transcript, tool calls, and the outcome the customer actually
          received.
        </p>
      </div>
    </>
  );
}

function TracesPanel() {
  const traces = [
    { label: "payment.intent.failed", meta: "bank decline" },
    { label: "kb.article.refund-window", meta: "retrieved" },
    { label: "sop.card-reversal", meta: "not retrieved" },
  ];

  return (
    <>
      <PanelHead icon={<Search size={13} />} title="Investigating traces" />
      <ul className="flex flex-col">
        {traces.map((trace, i) => (
          <li
            key={trace.label}
            className="flex items-center justify-between gap-3 border-b border-line-soft px-3.5 py-2 last:border-b-0"
          >
            <span className="font-mono text-[11px] tracking-[-0.01em] text-ink">
              {trace.label}
            </span>
            <span
              className="text-[10.5px] leading-none"
              style={{ color: i === 2 ? "#fe4c00" : "#74706d" }}
            >
              {trace.meta}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function PathPanel() {
  const nodes = [
    { label: "Payment failed", ok: true },
    { label: "Quoted 30 days", ok: false },
    { label: "Customer waiting", ok: false },
  ];

  return (
    <>
      <PanelHead
        icon={<TriangleAlert size={13} />}
        title="Incorrect resolution path"
        tone="alert"
      />
      <div className="flex items-stretch px-3.5 py-4">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-1 items-center">
            <div className="flex flex-1 flex-col items-center gap-2">
              <span
                className="h-2 w-2"
                style={{ backgroundColor: node.ok ? "#74706d" : "#fe4c00" }}
                aria-hidden="true"
              />
              <span className="text-center text-[10px] leading-[13px] text-muted">
                {node.label}
              </span>
            </div>
            {i < nodes.length - 1 ? (
              <span
                className="mb-[18px] h-px flex-1 bg-line"
                aria-hidden="true"
              />
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}

function IssuePanel() {
  const stats = [
    { value: "118", label: "Affected customers" },
    { value: "9", label: "Incorrect escalations" },
    { value: "209", label: "Handoffs" },
  ];

  return (
    <>
      <PanelHead
        icon={<TriangleAlert size={13} />}
        title="Issue found"
        tone="alert"
      />
      <div className="px-3.5 pt-3 pb-3.5">
        <p className="text-[11.5px] leading-[16px] tracking-[-0.01em] text-ink">
          Agent quoted a 30 day refund window. The SOP and knowledge base both
          say a failed card payment reverses in 3 to 5 business days.
        </p>

        <dl className="mt-3 grid grid-cols-3 gap-px border border-line-soft bg-line-soft">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-paper px-2 py-2">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-[15px] leading-none tracking-[-0.03em] text-ink">
                {stat.value}
              </dd>
              <p className="mt-1.5 text-[9.5px] leading-[12px] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>

        <div className="mt-3 flex items-end justify-between gap-3">
          <span className="text-[10px] leading-none text-muted">
            25 Jun – 23 Aug
          </span>
          <IssueChart />
        </div>

        {/* Illustrative controls — this is a mockup, not a live console. */}
        <div className="mt-3.5 flex items-center gap-2" aria-hidden="true">
          <span className="btn btn-outline btn-sm min-h-[30px]">
            Simulate fix
          </span>
          <span className="btn btn-orange btn-sm min-h-[30px]">
            Apply KB fix
          </span>
        </div>
      </div>
    </>
  );
}

function IssueChart() {
  return (
    <svg
      viewBox="0 0 132 30"
      className="h-[30px] w-[132px]"
      role="img"
      aria-label="Incorrect refund quotes rising between 25 June and 23 August"
      preserveAspectRatio="none"
    >
      <line x1="0" y1="29.5" x2="132" y2="29.5" stroke="rgba(30,30,30,0.15)" />
      <polyline
        points="0,24 16,22 32,25 48,18 64,20 80,12 96,14 112,6 132,3"
        fill="none"
        stroke="#fe4c00"
        strokeWidth="1.25"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="132" cy="3" r="2" fill="#fe4c00" />
    </svg>
  );
}
