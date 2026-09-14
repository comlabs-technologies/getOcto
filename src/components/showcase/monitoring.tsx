"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { OctoMark } from "@/components/brand";
import { Dot, Rail, ShowcaseCard, Texture } from "./parts";
import { media } from "@/lib/media";

const SPAN_THIRD = "md:col-span-2";
const SPAN_HALF = "md:col-span-3";

export function MonitoringCards() {
  return (
    <>
      {/* 1 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_THIRD}
        title="See beyond the score"
        description="Understand the interaction, behaviour and customer outcome behind every quality metric."
        surfaceClassName="bg-[#ded9d3]"
      >
        <Texture src={media.textureMarbleWaves} />
        <div className="relative flex h-full flex-col justify-center gap-2.5 p-3.5">
          <ScoreGroup
            heading="Low scores"
            rows={[
              { name: "Chris Bryant", time: "4 min", score: 20 },
              { name: "Lauren Ivanov", time: "7 min", score: 35 },
            ]}
          />
          <ScoreGroup
            heading="High scores"
            rows={[
              { name: "Marcus Bell", time: "6 min", score: 80 },
              { name: "Tomi Adeyemi", time: "9 min", score: 90 },
            ]}
          />
        </div>
      </ShowcaseCard>

      {/* 2 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_THIRD}
        title="Learn from strong resolutions"
        description="Turn successful human decisions into reusable guidance for the wider operation."
        surfaceClassName="bg-dark"
      >
        <div className="flex h-full flex-col">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src={media.avatarJames}
              alt="James Smith, senior support specialist"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover object-top"
            />
            <span className="absolute top-3 left-3 border border-white/20 bg-black/45 px-2 py-1 text-[10px] leading-none text-white/85">
              Human resolution
            </span>
          </div>
          <div className="on-dark bg-dark px-3.5 py-3.5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[13px] tracking-[-0.02em] text-white">
                James Smith
              </p>
              <p className="text-[10.5px] text-white/50">20 mins</p>
            </div>
            <p className="mt-0.5 text-[11.5px] leading-[16px] text-white/55">
              Billing Error Correction — customer charged twice after a failed
              retry.
            </p>
            <span
              aria-hidden="true"
              className="btn btn-orange btn-sm mt-3 min-h-[32px] w-full"
            >
              Begin
            </span>
          </div>
        </div>
      </ShowcaseCard>

      {/* 3 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_THIRD}
        title="Catch risk while it is recoverable"
        description="Detect complaints, incorrect answers and failed handoffs before they escalate."
      >
        <div className="flex h-full flex-col p-3.5">
          <p className="type-label mb-2.5 text-muted">Complaint signals</p>
          <ul className="border border-line">
            {[
              { label: "Customer threatening to leave", meta: "2 min ago" },
              { label: "Wrong product info given", meta: "11 min ago" },
              { label: "Complaint forming, not escalated", meta: "26 min ago" },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2.5 border-b border-line-soft px-3 py-2.5 last:border-b-0"
              >
                <Dot tone="orange" />
                <span className="min-w-0 flex-1 truncate text-[11.5px] tracking-[-0.01em] text-ink">
                  {item.label}
                </span>
                <span className="shrink-0 text-[10px] text-muted">
                  {item.meta}
                </span>
              </li>
            ))}
          </ul>

          <div className="relative mt-auto flex items-center gap-3 overflow-hidden border border-line bg-panel p-3">
            <span className="pointer-events-none absolute inset-y-0 right-0 w-[86px]">
              <Texture src={media.textureAlertGreen} opacity={0.9} />
            </span>
            <OctoMark className="relative h-4 w-4 shrink-0 text-orange" />
            <p className="relative text-[11px] leading-[15px] tracking-[-0.01em] text-ink">
              <span className="text-muted">Octo</span> — 4 new complaints
              detected in the last hour.
            </p>
          </div>
        </div>
      </ShowcaseCard>

      {/* 4 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_HALF}
        title="Keep complex cases moving"
        description="Coordinate classification, ownership, documentation and deadlines in one traceable flow."
      >
        <div className="flex h-full gap-4 p-4 md:gap-8 md:p-5">
          <div className="min-w-0 flex-1">
            <p className="type-label mb-3 text-muted">Case CX-4187</p>
            <Rail
              steps={[
                { label: "Received & classified", meta: "09:02", state: "done" },
                {
                  label: "Payment dispute auto-tagged",
                  meta: "09:02",
                  state: "done",
                },
                { label: "Routed to compliance", meta: "09:03", state: "done" },
                {
                  label: "Assigned and documented",
                  meta: "09:04",
                  state: "done",
                },
                { label: "Resolution in progress", state: "active" },
                { label: "Deadline tracked automatically", state: "todo" },
                { label: "Customer notified", state: "todo" },
              ]}
            />
          </div>
          <div className="hidden w-[42%] shrink-0 border border-line bg-panel p-3.5 sm:block">
            <p className="type-label text-muted">Regulatory clock</p>
            <p className="mt-2 text-[30px] leading-none tracking-[-0.03em] text-ink">
              6d 04h
            </p>
            <p className="mt-1.5 text-[11px] leading-[15px] text-muted">
              remaining of the 15 business day response window
            </p>
            <div className="mt-4 h-[3px] w-full bg-[#e4e1dd]">
              <span className="block h-full w-[58%] bg-orange" />
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[10.5px] text-muted">
              <Check size={11} className="text-orange" aria-hidden="true" />
              Audit trail written for every step
            </p>
          </div>
        </div>
      </ShowcaseCard>

      {/* 5 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_HALF}
        title="Improve the system, not one ticket"
        description="Trace repeated failures back to the workflow, policy or knowledge gap causing them."
        surfaceClassName="bg-[#d9d4ce]"
      >
        <Texture src={media.textureStoneRelief} />
        <div className="relative flex h-full items-center p-4 md:p-6">
          <ol className="w-full max-w-[280px]">
            {[
              "Complaint detected",
              "Categorized",
              "Route to team lead",
              "Document to case log",
            ].map((label, i, all) => (
              <li key={label} className="relative flex gap-3">
                <span className="relative flex w-3 shrink-0 justify-center">
                  {i < all.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-4 bottom-0 w-px bg-ink/25"
                    />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="relative mt-[11px] h-[7px] w-[7px] rounded-full bg-orange"
                  />
                </span>
                <span className="mb-2 flex-1 border border-line bg-paper/92 px-3 py-2 text-[11.5px] leading-[16px] tracking-[-0.01em] text-ink backdrop-blur-[1px] last:mb-0">
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </ShowcaseCard>
    </>
  );
}

function ScoreGroup({
  heading,
  rows,
}: {
  heading: string;
  rows: { name: string; time: string; score: number }[];
}) {
  return (
    <div className="border border-line bg-paper/94 backdrop-blur-[1px]">
      <p className="border-b border-line-soft px-3 py-1.5 text-[9.5px] leading-none tracking-[0.03em] text-muted uppercase">
        {heading}
      </p>
      {rows.map((row) => (
        <div
          key={row.name}
          className="flex items-center gap-2.5 border-b border-line-soft px-3 py-2 last:border-b-0"
        >
          <Image
            src={media.avatarReviewer}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 shrink-0 object-cover"
          />
          <span className="min-w-0 flex-1 truncate text-[11.5px] tracking-[-0.01em] text-ink">
            {row.name}
          </span>
          <span className="shrink-0 text-[10px] text-muted">{row.time}</span>
          <span
            className="shrink-0 px-1.5 py-0.5 text-[10.5px] leading-none"
            style={{
              backgroundColor:
                row.score < 50 ? "rgba(254,76,0,0.12)" : "rgba(30,30,30,0.06)",
              color: row.score < 50 ? "#fe4c00" : "#1e1e1e",
            }}
          >
            {row.score}
          </span>
        </div>
      ))}
    </div>
  );
}
