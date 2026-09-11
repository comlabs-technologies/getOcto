"use client";

import { Rail, ShowcaseCard, Texture, UiIcon } from "./parts";
import { media } from "@/lib/media";

const SPAN_THIRD = "md:col-span-2";
const SPAN_HALF = "md:col-span-3";

export function SelfImprovementCards() {
  return (
    <>
      {/* 1 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_THIRD}
        title="Improve onboarding journeys"
        description="Stalled applications are chased on the channel the customer actually answers."
      >
        <div className="flex h-full flex-col p-4">
          <p className="type-label mb-4 text-muted">Merchant 8842 — onboarding</p>
          <ol className="flex flex-1 flex-col justify-between">
            {[
              {
                label: "Application stalled",
                meta: "KYC step 3",
                date: "12 Jun",
                icon: media.iconPhone,
                tone: "alert" as const,
              },
              {
                label: "Follow-up sent via WhatsApp",
                meta: "Automated",
                date: "13 Jun",
                icon: media.iconPhone,
                tone: "base" as const,
              },
              {
                label: "Bank statement received",
                meta: "Verified",
                date: "14 Jun",
                icon: media.iconDownload,
                tone: "base" as const,
              },
              {
                label: "$5,000 account funded",
                meta: "Activated",
                date: "15 Jun",
                icon: media.iconDollar,
                tone: "good" as const,
              },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 border-b border-line-soft pb-3 last:border-b-0 last:pb-0"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center border border-line"
                  style={{
                    backgroundColor:
                      item.tone === "alert"
                        ? "rgba(254,76,0,0.1)"
                        : item.tone === "good"
                          ? "rgba(75,157,99,0.12)"
                          : "#f7f7f4",
                  }}
                >
                  <UiIcon src={item.icon} className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11.5px] tracking-[-0.01em] text-ink">
                    {item.label}
                  </span>
                  <span className="block text-[10px] text-muted">
                    {item.meta}
                  </span>
                </span>
                <span className="shrink-0 text-[10px] text-muted">
                  {item.date}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </ShowcaseCard>

      {/* 2 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_THIRD}
        title="Close knowledge gaps"
        description="Missing answers become drafted knowledge articles, reviewed before they go live."
        surfaceClassName="bg-[#e7e3de]"
      >
        <Texture src={media.decorKnowledge} opacity={0.85} />
        <div className="relative flex h-full flex-col justify-end gap-2 p-4">
          {[
            {
              code: "KYC",
              title: "Identity verification steps",
              status: "Draft ready",
            },
            {
              code: "KYB",
              title: "Business registry checks",
              status: "In review",
            },
            {
              code: "UBO",
              title: "Beneficial ownership evidence",
              status: "Gap detected",
            },
          ].map((doc) => (
            <div
              key={doc.code}
              className="flex items-center gap-3 border border-line bg-paper/94 px-3 py-2.5 backdrop-blur-[1px]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-line bg-panel text-[9px] tracking-[0.02em] text-ink">
                {doc.code}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11.5px] tracking-[-0.01em] text-ink">
                  {doc.title}
                </span>
                <span
                  className="block text-[10px]"
                  style={{
                    color:
                      doc.status === "Gap detected" ? "#fe4c00" : "#74706d",
                  }}
                >
                  {doc.status}
                </span>
              </span>
              <UiIcon
                src={media.iconDownload}
                className="h-3.5 w-3.5 shrink-0 opacity-60"
              />
            </div>
          ))}
        </div>
      </ShowcaseCard>

      {/* 3 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_THIRD}
        title="Remediate at scale"
        description="Long-running sweeps run themselves and report progress every day."
        surfaceClassName="bg-[#e4e0db]"
      >
        <Texture src={media.decorRemediation} opacity={0.8} />
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[14px] tracking-[-0.02em] text-ink">
                Remediation sweep
              </p>
              <p className="mt-0.5 text-[11px] text-muted">
                Address re-verification
              </p>
            </div>
            <span className="border border-line bg-paper/90 px-2 py-1 text-[10px] leading-none text-ink">
              Day 3
            </span>
          </div>

          <div className="border border-line bg-paper/94 p-3.5 backdrop-blur-[1px]">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[22px] leading-none tracking-[-0.03em] text-ink">
                2,940
              </p>
              <p className="text-[11px] text-muted">/ 3,412 accounts</p>
            </div>
            <div
              className="mt-3 h-[3px] w-full bg-[#e4e1dd]"
              role="progressbar"
              aria-valuenow={86}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Remediation sweep progress"
            >
              <span className="block h-full w-[86%] bg-orange" />
            </div>
            <p className="mt-3 text-[10.5px] text-muted">
              Daily report sent — 22 Jun
            </p>
          </div>
        </div>
      </ShowcaseCard>

      {/* 4 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_HALF}
        title="Learn what drives reactivation"
        description="Dormant revenue is ranked, contacted, and measured merchant by merchant."
        surfaceClassName="bg-[#ddd8d2]"
      >
        <Texture src={media.texturePayment} />
        <div className="relative flex h-full items-center p-4 md:p-5">
          <div className="w-full max-w-[420px] border border-line bg-paper/94 backdrop-blur-[1px]">
            <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
              <p className="type-label text-ink">Dormant accounts</p>
              <p className="text-[10px] text-muted">Last 30 days</p>
            </div>
            <table className="w-full">
              <caption className="sr-only">
                Dormant merchant accounts by prior monthly volume
              </caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Merchant</th>
                  <th scope="col">Prior volume</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Finflier", value: "$42,000", status: "Contacted" },
                  {
                    name: "Northwind Ltd",
                    value: "$28,500",
                    status: "Replied",
                  },
                  { name: "Vertex Pay", value: "$15,200", status: "Queued" },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-line-soft">
                    <td className="px-3.5 py-2.5 text-[11.5px] tracking-[-0.01em] text-ink">
                      {row.name}
                    </td>
                    <td className="px-2 py-2.5 text-right text-[11.5px] text-ink">
                      {row.value}
                    </td>
                    <td className="px-3.5 py-2.5 text-right text-[10px] text-muted">
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="flex items-center gap-2 px-3.5 py-2.5 text-[10.5px] text-muted">
              <span
                className="h-1.5 w-1.5 rounded-full bg-orange"
                aria-hidden="true"
              />
              Outreach running per merchant
            </p>
          </div>
        </div>
      </ShowcaseCard>

      {/* 5 ------------------------------------------------------------- */}
      <ShowcaseCard
        span={SPAN_HALF}
        title="Resolve recurring exceptions"
        description="The same KYB exception is handled the same way every time, and returned decision-ready."
      >
        <div className="flex h-full gap-4 p-4 md:gap-8 md:p-5">
          <div className="min-w-0 flex-1">
            <p className="type-label mb-3 text-muted">KYB exception — case 2214</p>
            <Rail
              steps={[
                { label: "Name mismatch flagged", meta: "08:41", state: "done" },
                { label: "Missing document", meta: "08:44", state: "done" },
                {
                  label: "Name mismatch resolved",
                  meta: "09:12",
                  state: "done",
                },
                {
                  label: "Missing UBO document chased",
                  meta: "09:26",
                  state: "active",
                },
                { label: "Returned decision-ready", state: "todo" },
              ]}
            />
          </div>
          <div className="hidden w-[42%] shrink-0 border border-line bg-panel p-3.5 sm:block">
            <p className="type-label text-muted">Exception rate</p>
            <p className="mt-2 text-[30px] leading-none tracking-[-0.03em] text-ink">
              −41%
            </p>
            <p className="mt-1.5 text-[11px] leading-[15px] text-muted">
              since the KYB checklist was rewritten from Rulebase findings
            </p>
            <dl className="mt-4 flex flex-col gap-2 border-t border-line pt-3">
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-[10.5px] text-muted">Median handling</dt>
                <dd className="text-[11.5px] text-ink">34 min</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-[10.5px] text-muted">Reopened</dt>
                <dd className="text-[11.5px] text-ink">2%</dd>
              </div>
            </dl>
          </div>
        </div>
      </ShowcaseCard>
    </>
  );
}
