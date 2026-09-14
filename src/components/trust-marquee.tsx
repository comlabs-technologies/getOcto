"use client";

import { LogoMark } from "@/components/brand";
import { Marquee } from "@/components/primitives/marquee";
import { trustLogos, type TrustLogo } from "@/lib/data";

export function TrustMarquee() {
  return (
    <section
      aria-label="Product concept"
      className="px-page border-b border-line bg-background py-9 md:py-11"
    >
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-12">
        <div className="max-w-[260px] shrink-0 lg:max-w-[210px]">
          <p className="type-label text-muted">
            Built as a concept for complex, high-volume customer operations.
          </p>
          <p className="type-label mt-2 text-muted/70">
            Independent product concept
          </p>
        </div>

        <Marquee
          label="Illustrative marks for the kinds of operations Octo is built for"
          className="min-w-0 flex-1 [mask-image:linear-gradient(to_right,transparent,#000_36px,#000_calc(100%-36px),transparent)]"
          durationSeconds={45}
        >
          {trustLogos.map((logo) => (
            <TrustTile key={logo.name} logo={logo} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function TrustTile({ logo }: { logo: TrustLogo }) {
  return (
    <div className="group ml-2 flex h-[92px] w-[132px] shrink-0 flex-col justify-between border border-line bg-paper p-2.5 transition-[background-color,border-color,box-shadow,transform] duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] first:ml-0 hover:-translate-y-px hover:border-ink/30 hover:bg-panel hover:shadow-[0_1px_0_0_rgba(30,30,30,0.12)] md:h-[96px] md:w-[142px]">
      <span className="text-[9.5px] leading-none tracking-[0.02em] text-muted">
        {logo.label ?? " "}
      </span>
      <span className="flex flex-1 items-center justify-center px-1">
        <LogoMark
          src={logo.src}
          name={logo.name}
          imgClassName="max-h-[24px] w-auto max-w-[96px] object-contain opacity-80 transition-opacity duration-[180ms] group-hover:opacity-100"
          wordmarkClassName={logo.wordmarkClass}
        />
      </span>
      <span aria-hidden="true" className="h-[9px]" />
    </div>
  );
}
