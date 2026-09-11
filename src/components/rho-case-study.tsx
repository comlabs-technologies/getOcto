"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { LazyVideo } from "@/components/lazy-video";
import { Reveal } from "@/components/primitives/reveal";
import { useVideoModal } from "@/components/video-modal";
import { media } from "@/lib/media";

const STATS = [
  { value: "95%", label: "Reduction in manual reviews" },
  { value: "20hrs", label: "per week saved" },
];

export function RhoCaseStudy() {
  const { open } = useVideoModal();

  return (
    <section
      id="case-study"
      aria-labelledby="case-study-heading"
      className="px-page border-b border-line bg-background pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <Reveal>
          <h2 id="case-study-heading" className="type-section max-w-[560px] text-ink">
            See how leading fintechs automate QA and deploy agents to run
            customer ops.
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col justify-end">
          <figure className="m-0">
            <blockquote className="max-w-[480px] text-[15px] leading-[23px] tracking-[-0.01em] text-ink">
              &ldquo;With Rulebase, every customer touchpoint is protected and
              optimized in real-time, giving us total confidence, total
              coverage, and the freedom to focus on what matters most&rdquo;
            </blockquote>

            <dl className="mt-9 flex gap-12 border-t border-line pt-7 md:gap-16">
              {STATS.map((stat) => (
                <div key={stat.value}>
                  <dd className="text-[38px] leading-none tracking-[-0.03em] text-ink md:text-[44px]">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 max-w-[150px] text-[12.5px] leading-[17px] text-muted">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            <figcaption className="mt-8 flex items-center gap-3">
              <Image
                src={media.avatarStas}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 object-cover"
              />
              <span className="flex flex-col">
                <span className="text-[13px] tracking-[-0.01em] text-ink">
                  Stas Johnson-Chyzhykov
                </span>
                <span className="text-[12px] text-muted">
                  Chief Operating Officer at Rho
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Video poster                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Reveal className="mt-12 md:mt-16" amount={0.15}>
        <button
          type="button"
          onClick={open}
          aria-label="Play the Rho customer story"
          className="group relative block w-full overflow-hidden border border-line bg-dark"
          style={{ aspectRatio: "16 / 7" }}
        >
          <LazyVideo className="absolute inset-0 h-full w-full object-cover" />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-black/10 transition-colors duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:bg-black/20"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 flex h-[54px] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 border border-white/25 bg-black/45 px-5 text-[13px] tracking-[-0.01em] text-white backdrop-blur-[2px] transition-[background-color,border-color] duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:border-white/45 group-hover:bg-black/65"
          >
            <Play size={13} fill="currentColor" />
            Watch video
          </span>
        </button>
      </Reveal>

      {/* ------------------------------------------------------------------ */}
      {/* Interswitch testimonial                                             */}
      {/* ------------------------------------------------------------------ */}
      <Reveal className="mt-20 md:mt-28 lg:mt-32" amount={0.3}>
        <figure className="mx-auto m-0 max-w-[880px] text-center">
          <blockquote className="text-[24px] leading-[1.24] tracking-[-0.03em] text-balance text-ink md:text-[30px] lg:text-[34px]">
            &ldquo;Rulebase is AI for customer ops at fintechs. It watches every
            interaction, flags risk in real time, and works the follow-up.&rdquo;
          </blockquote>
          <figcaption className="mt-9 flex flex-col items-center gap-3">
            <Image
              src={media.avatarOremeyi}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-cover"
            />
            <span className="flex flex-col items-center">
              <span className="text-[13px] tracking-[-0.01em] text-ink">
                Oremeyi Adeola Okah
              </span>
              <span className="text-[12px] text-muted">
                Chief Customer Officer at Interswitch
              </span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
