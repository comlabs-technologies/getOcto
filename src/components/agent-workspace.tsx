"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WorkflowGlyph } from "@/components/workflow-glyph";
import { usePrefersReducedMotion } from "@/components/primitives/use-reduced-motion";
import { workspaceTabs, type WorkspaceCard } from "@/lib/data";
import { easeEditorial } from "@/lib/motion";

/** Static class strings so Tailwind can see every column count it must emit. */
const COLUMN_CLASS: Record<number, string> = {
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export function AgentWorkspace() {
  const [active, setActive] = useState<"ai" | "human">("ai");
  const reduced = usePrefersReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = workspaceTabs.findIndex((tab) => tab.id === active);
  const activeTab = workspaceTabs[activeIndex];

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next =
      (activeIndex + delta + workspaceTabs.length) % workspaceTabs.length;
    setActive(workspaceTabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="agent-workspace"
      aria-labelledby="agent-workspace-heading"
      className="px-page border-b border-line bg-background pt-10 pb-14 md:pt-12 md:pb-16 lg:pt-14 lg:pb-20"
    >
      {/* The reference shows only the tabs here; the heading keeps the
          document outline intact for assistive technology. */}
      <h2 id="agent-workspace-heading" className="sr-only">
        Monitoring for AI and human agents
      </h2>

      <div
        role="tablist"
        aria-label="Agent type"
        onKeyDown={onKeyDown}
        className="flex w-fit gap-px border border-line bg-line"
      >
        {workspaceTabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              // Only the selected panel is in the DOM, so only the selected
              // tab may point at one.
              aria-controls={
                selected ? `${baseId}-panel-${tab.id}` : undefined
              }
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className="min-h-[38px] px-4 text-[13px] tracking-[-0.01em] transition-[background-color,color] duration-[160ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                backgroundColor: selected ? "#ffffff" : "#efedeb",
                color: selected ? "#1e1e1e" : "#74706d",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Fixed-height stage: panels crossfade in place, the section never resizes. */}
      <div className="relative mt-4 grid min-h-[520px] overflow-hidden border border-line bg-line sm:min-h-[460px] lg:min-h-[430px] xl:min-h-[460px]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={active}
            role="tabpanel"
            id={`${baseId}-panel-${active}`}
            aria-labelledby={`${baseId}-tab-${active}`}
            tabIndex={0}
            style={{ gridArea: "1 / 1 / 2 / 2" }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              reduced
                ? undefined
                : {
                    opacity: 0,
                    pointerEvents: "none",
                    position: "absolute",
                    inset: 0,
                  }
            }
            transition={{ duration: reduced ? 0 : 0.3, ease: easeEditorial }}
            className={`grid gap-px bg-line ${COLUMN_CLASS[activeTab.cards.length]}`}
          >
            {activeTab.cards.map((card, i) => (
              <WorkspaceColumn key={card.id} card={card} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function WorkspaceColumn({
  card,
  index,
}: {
  card: WorkspaceCard;
  index: number;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex flex-col justify-between bg-paper px-4 pt-7 pb-6 sm:px-5 lg:px-6 lg:pt-10 lg:pb-7">
      <div className="pointer-events-none px-1 pb-8">
        <WorkflowGlyph id={card.id} />
      </div>

      <div>
        <h3 className="text-[17px] tracking-[-0.02em] text-ink">
          {card.title}
        </h3>
        <div
          className="grid transition-[grid-template-rows,opacity,margin-top] duration-[280ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{
            gridTemplateRows: revealed ? "1fr" : "0fr",
            opacity: revealed ? 1 : 0,
            marginTop: revealed ? 8 : 0,
            transitionDelay: `${index * 60}ms`,
          }}
        >
          <p className="overflow-hidden text-[13.5px] leading-[19px] text-muted">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}
