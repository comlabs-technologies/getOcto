"use client";

import { useRef, useState } from "react";
import { CrossfadePanel } from "@/components/primitives/crossfade-panel";
import { Reveal } from "@/components/primitives/reveal";
import { MonitoringCards } from "@/components/showcase/monitoring";
import { SelfImprovementCards } from "@/components/showcase/self-improvement";
import { CustomerIntelligenceCards } from "@/components/showcase/customer-intelligence";
import { showcaseModes, type ShowcaseMode } from "@/lib/data";

const PANELS: Record<ShowcaseMode["id"], () => React.ReactElement> = {
  monitoring: MonitoringCards,
  "self-improvement": SelfImprovementCards,
  "customer-intelligence": CustomerIntelligenceCards,
};

export function OutcomeShowcase() {
  const [active, setActive] = useState<ShowcaseMode["id"]>("monitoring");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const Panel = PANELS[active];

  // The selector is vertical on desktop and horizontal on phones, so both
  // arrow axes move between modes.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !back) return;
    event.preventDefault();
    const current = showcaseModes.findIndex((mode) => mode.id === active);
    const next =
      (current + (forward ? 1 : -1) + showcaseModes.length) %
      showcaseModes.length;
    setActive(showcaseModes[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="outcomes"
      aria-labelledby="outcomes-heading"
      className="px-page border-b border-line bg-background pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24"
    >
      <Reveal>
        <h2 id="outcomes-heading" className="type-section text-ink">
          Every conversation.
          <br />
          Better outcomes.
        </h2>
      </Reveal>

      <div className="mt-10 flex flex-col gap-8 md:mt-14 lg:flex-row lg:gap-12">
        {/* Mode selector — vertical on desktop, horizontally scrollable on phones */}
        <div
          role="tablist"
          aria-label="Product area"
          onKeyDown={onKeyDown}
          className="bleed-until-lg flex shrink-0 gap-2 overflow-x-auto pb-1 lg:w-[228px] lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0 xl:w-[258px]"
        >
          {showcaseModes.map((mode, i) => {
            const selected = mode.id === active;
            return (
              <button
                key={mode.id}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                type="button"
                role="tab"
                tabIndex={selected ? 0 : -1}
                aria-selected={selected}
                aria-controls={
                  selected ? `showcase-panel-${mode.id}` : undefined
                }
                id={`showcase-tab-${mode.id}`}
                onClick={() => setActive(mode.id)}
                className="group relative flex min-h-[44px] shrink-0 flex-col justify-center border border-line px-3.5 py-2.5 text-left transition-[background-color,border-color,color] duration-[200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:border-0 lg:border-t lg:px-0 lg:py-5 lg:last:border-b"
                style={{
                  backgroundColor: selected
                    ? "rgba(255,255,255,0.55)"
                    : "transparent",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 left-0 hidden w-[2px] transition-[background-color] duration-[200ms] lg:block"
                  style={{
                    backgroundColor: selected ? "#fe4c00" : "transparent",
                  }}
                />
                <span
                  className="text-[14px] whitespace-nowrap transition-colors duration-[200ms] lg:whitespace-normal lg:pl-4 lg:text-[16px] lg:tracking-[-0.02em]"
                  style={{ color: selected ? "#1e1e1e" : "#74706d" }}
                >
                  {mode.title}
                </span>
                <span className="mt-1.5 hidden pl-4 text-[12.5px] leading-[17px] text-muted lg:block">
                  {mode.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Card grid */}
        <CrossfadePanel
          activeKey={active}
          className="min-w-0 flex-1"
          innerClassName="grid grid-cols-1 gap-x-5 gap-y-9 md:grid-cols-6"
          innerProps={{
            role: "tabpanel",
            id: `showcase-panel-${active}`,
            "aria-labelledby": `showcase-tab-${active}`,
            tabIndex: 0,
          }}
        >
          <Panel />
        </CrossfadePanel>
      </div>
    </section>
  );
}
