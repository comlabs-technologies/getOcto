"use client";

import Image from "next/image";
import { OctoMark } from "@/components/brand";
import { Reveal } from "@/components/primitives/reveal";
import { integrationRows, type IntegrationCell } from "@/lib/data";

export function IntegrationGrid() {
  return (
    <section
      id="integrations"
      aria-labelledby="integrations-heading"
      className="bg-background pt-16 pb-4 md:pt-20 lg:pt-24"
    >
      <div className="px-page">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <h2 id="integrations-heading" className="type-section text-ink">
            Works with the tools
            <br />
            your teams already use.
          </h2>
          <p className="type-body mx-auto mt-6 max-w-[560px] text-muted">
            Octo connects customer conversations and operational signals across
            your existing support stack&mdash;without forcing teams to replace
            the systems they already depend on.
          </p>
        </Reveal>
      </div>

      {/* Wide grid, clipped by the viewport on both sides. */}
      <Reveal className="mt-12 md:mt-16" amount={0.1}>
        <div className="flex w-full justify-center overflow-hidden border-t border-line">
          <div
            className="grid shrink-0 [--cell:62px] sm:[--cell:78px] lg:[--cell:96px] xl:[--cell:108px]"
            style={{ gridTemplateColumns: "repeat(14, var(--cell))" }}
          >
            {integrationRows.map((row, rowIndex) =>
              row.map((cell, cellIndex) => (
                <Cell
                  key={`${rowIndex}-${cellIndex}`}
                  cell={cell}
                  rowIndex={rowIndex}
                />
              )),
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Cell({
  cell,
  rowIndex,
}: {
  cell: IntegrationCell;
  rowIndex: number;
}) {
  const base =
    "group relative flex h-[var(--cell)] w-[var(--cell)] items-center justify-center border-r border-b border-line";

  if (cell.kind === "empty") {
    return <div className={`${base} bg-[#f4f2f0]`} aria-hidden="true" />;
  }

  if (cell.kind === "brand") {
    return (
      <div className={`${base} bg-ink`}>
        <OctoMark className="h-[46%] w-[46%] text-white" />
        <span className="sr-only">Octo</span>
      </div>
    );
  }

  if (cell.kind === "mark") {
    return (
      <div className={`${base} bg-[#fbfaf9] p-[20%]`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- remote SVG */}
        <img
          src={cell.src}
          alt={cell.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain opacity-35 transition-opacity duration-[200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:opacity-70"
        />
      </div>
    );
  }

  if (cell.kind === "tile") {
    return (
      <div className={`${base} bg-[#fbfaf9] p-[18%]`}>
        <span className="relative h-full w-full opacity-45 transition-opacity duration-[200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:opacity-80">
          <Image
            src={cell.src}
            alt={cell.name}
            fill
            sizes="108px"
            loading={rowIndex === 0 ? undefined : "lazy"}
            className="object-contain"
          />
        </span>
      </div>
    );
  }

  return (
    <div className={`${base} bg-[#fbfaf9] px-[8%]`}>
      <span className="text-center text-[9px] leading-[11px] tracking-[-0.01em] text-ink/40 transition-colors duration-[200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:text-ink/75 sm:text-[10px] lg:text-[11.5px] lg:leading-[13px]">
        {cell.name}
      </span>
    </div>
  );
}
