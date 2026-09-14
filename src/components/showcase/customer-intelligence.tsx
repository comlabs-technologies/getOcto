"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, Copy } from "lucide-react";
import { OctoMark } from "@/components/brand";
import { Rail, ShowcaseCard, Texture } from "./parts";
import { media } from "@/lib/media";

const SPAN_HALF = "md:col-span-3";

export function CustomerIntelligenceCards() {
  return (
    <>
      {/* 1 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_HALF}
        title="Ask every conversation"
        description="Ask a question in plain language and get the answer from every interaction you have ever had."
        surfaceClassName="bg-[#dcd7d1]"
      >
        <Texture src={media.textureChatStone} />
        <div className="relative flex h-full flex-col justify-end gap-2.5 p-4 md:p-5">
          <div className="max-w-[400px] border border-line bg-paper/94 p-3.5 backdrop-blur-[1px]">
            <div className="flex items-center gap-2">
              <OctoMark className="h-4 w-4 text-orange" />
              <p className="type-label text-muted">Octo</p>
            </div>
            <p className="mt-2.5 text-[12px] leading-[17px] tracking-[-0.01em] text-ink">
              Onboarding completions fell 18% after Tuesday. 62% of stalled
              applications stopped at document upload on mobile Safari, where
              the file picker silently failed.
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {["412 conversations", "9 tickets", "3 root causes"].map(
                (chip) => (
                  <li
                    key={chip}
                    className="border border-line bg-panel px-2 py-1 text-[10px] leading-none text-muted"
                  >
                    {chip}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="flex items-center gap-2 border border-line bg-paper px-3 py-2.5">
            <p className="min-w-0 flex-1 truncate text-[12px] tracking-[-0.01em] text-ink">
              Why did onboarding drop last week?
            </p>
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center bg-orange"
              aria-hidden="true"
            >
              <ArrowUp size={13} strokeWidth={2.4} className="text-white" />
            </span>
          </div>
        </div>
      </ShowcaseCard>

      {/* 2 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_HALF}
        title="Customer signals, unified"
        description="One timeline per customer across support, product usage and risk — not three disconnected tools."
      >
        <div className="flex h-full gap-4 p-4 md:gap-8 md:p-5">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <p className="text-[13px] tracking-[-0.02em] text-ink">
                Adaeze O.
              </p>
              <p className="text-[10px] text-muted">Merchant · 14 months</p>
            </div>
            <Rail
              steps={[
                { label: "Signed up", meta: "14 Mar", state: "done" },
                { label: "KYC stalled", meta: "19 Mar", state: "done" },
                { label: "Three failed attempts", meta: "21 Mar", state: "done" },
                {
                  label: "Two unresolved complaints",
                  meta: "2 Apr",
                  state: "done",
                },
                { label: "Churn signal detected", meta: "6 May", state: "active" },
                { label: "No login in 24 days", state: "todo" },
              ]}
            />
          </div>
          <div className="hidden w-[42%] shrink-0 flex-col justify-between border border-line bg-panel p-3.5 sm:flex">
            <div>
              <p className="type-label text-muted">Churn probability</p>
              <p className="mt-2 text-[30px] leading-none tracking-[-0.03em] text-orange">
                78%
              </p>
              <p className="mt-1.5 text-[11px] leading-[15px] text-muted">
                driven by unresolved billing complaints
              </p>
            </div>
            <div className="border-t border-line pt-3">
              <p className="text-[10.5px] text-muted">Monthly volume at risk</p>
              <p className="mt-1 text-[14px] tracking-[-0.02em] text-ink">
                $31,400
              </p>
            </div>
          </div>
        </div>
      </ShowcaseCard>

      {/* 3 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_HALF}
        title="Emerging signals and root causes"
        description="Movements are surfaced with the conversations that caused them, not as a number without context."
        surfaceClassName="bg-[#e2ded9]"
      >
        <Texture src={media.textureScore} opacity={0.8} />
        <div className="relative flex h-full flex-col justify-between p-4 md:p-5">
          <p className="type-label text-ink">Last 7 days</p>
          <dl className="grid grid-cols-3 gap-px border border-line bg-line">
            {[
              { label: "Complaints", value: "+28%", tone: "alert" },
              { label: "Sentiment", value: "-32pts", tone: "alert" },
              { label: "Churn signals", value: "14%", tone: "neutral" },
            ].map((metric) => (
              <div key={metric.label} className="bg-paper/95 px-3 py-3.5">
                <dd
                  className="text-[19px] leading-none tracking-[-0.03em]"
                  style={{
                    color: metric.tone === "alert" ? "#fe4c00" : "#1e1e1e",
                  }}
                >
                  {metric.value}
                </dd>
                <dt className="mt-2 text-[10.5px] leading-[14px] text-muted">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
          <ul className="flex flex-col gap-1.5">
            {[
              "Failed card retries after the 3DS change",
              "Refund window quoted incorrectly by the AI agent",
            ].map((cause) => (
              <li
                key={cause}
                className="flex items-center gap-2 border border-line bg-paper/92 px-3 py-2 text-[11px] leading-[15px] tracking-[-0.01em] text-ink backdrop-blur-[1px]"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
                  aria-hidden="true"
                />
                {cause}
              </li>
            ))}
          </ul>
        </div>
      </ShowcaseCard>

      {/* 4 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_HALF}
        title="Intelligence where teams work"
        description="Connect the Octo server and query customer operations data from the tools your team already uses."
        surfaceClassName="bg-dark"
      >
        <Texture src={media.textureMcp} opacity={0.55} />
        <div className="on-dark relative flex h-full flex-col justify-between p-4 md:p-5">
          <div>
            <p className="type-label text-white/55">MCP server</p>
            <p className="mt-2 max-w-[300px] text-[15px] leading-[21px] tracking-[-0.02em] text-white">
              Add Octo to any MCP-compatible client your team runs.
            </p>
          </div>
          <CopyServerUrl />
        </div>
      </ShowcaseCard>
    </>
  );
}

function CopyServerUrl() {
  const url = "https://mcp.octo.systems/sse";
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard permission denied — still confirm the URL is selectable.
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-stretch border border-white/20 bg-black/35">
        <code className="min-w-0 flex-1 truncate px-3 py-2.5 font-mono text-[11.5px] text-white/85">
          {url}
        </code>
        <button
          type="button"
          onClick={copy}
          className="flex min-h-[40px] w-11 shrink-0 items-center justify-center border-l border-white/20 text-white/70 transition-colors duration-[160ms] hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <Check size={14} aria-hidden="true" />
          ) : (
            <Copy size={14} aria-hidden="true" />
          )}
          <span className="sr-only">Copy MCP server URL</span>
        </button>
      </div>
      <p className="mt-2 h-4 text-[10.5px] leading-4" aria-live="polite">
        {copied ? (
          <span className="text-orange">Copied to clipboard</span>
        ) : (
          <span className="text-white/45">Read-only access by default</span>
        )}
      </p>
    </div>
  );
}
