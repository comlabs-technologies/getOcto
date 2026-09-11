"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { HeroConversationDemo } from "@/components/hero-conversation-demo";
import { StaggerText } from "@/components/primitives/stagger-text";
import { usePrefersReducedMotion } from "@/components/primitives/use-reduced-motion";
import { useVideoModal } from "@/components/video-modal";
import { easeEditorial } from "@/lib/motion";
import { media } from "@/lib/media";

const HEADLINE = ["Monitor every agent.", "Improve every outcome."];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { open } = useVideoModal();

  /** Shared entrance helper: opacity + rise, played once after hydration. */
  const rise = (duration: number, delay: number, y = 14) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: easeEditorial },
        };

  return (
    <section id="top" aria-label="Rulebase" className="relative">
      <div className="grid lg:min-h-[calc(100svh-60px)] lg:grid-cols-2">
        {/* ---------------------------------------------------------------- */}
        {/* Left — near-black editorial column                                */}
        {/* ---------------------------------------------------------------- */}
        <div className="on-dark px-page relative flex flex-col justify-center bg-dark py-14 md:py-16 lg:py-20 xl:py-24">
          <div className="w-full max-w-[560px] lg:max-w-[600px] xl:max-w-[660px]">
            <motion.div {...rise(0.9, 0.15)}>
              <button
                type="button"
                onClick={open}
                className="group flex w-full max-w-[330px] items-center gap-3 border border-dark-line bg-white/[0.04] p-2 text-left transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-white/25 hover:bg-white/[0.08]"
              >
                <span className="relative block h-[44px] w-[62px] shrink-0 overflow-hidden bg-dark-raised">
                  <Image
                    src={media.rhoThumbnail}
                    alt=""
                    fill
                    sizes="62px"
                    className="object-cover"
                  />
                  <span
                    className="absolute inset-0 flex items-center justify-center bg-black/25"
                    aria-hidden="true"
                  >
                    <Play size={12} fill="currentColor" className="text-white" />
                  </span>
                </span>
                <span className="text-[11.5px] leading-[15px] tracking-[-0.01em] text-white/70 transition-colors duration-[180ms] group-hover:text-white/90">
                  Watch how Rho monitors their CX team to operate faster and
                  reduce risk
                </span>
              </button>
            </motion.div>

            <h1 className="type-hero mt-10 text-white md:mt-12 lg:mt-14">
              <StaggerText
                groups={HEADLINE}
                delay={0.3}
                stagger={0.08}
                duration={0.85}
                y={20}
              />
            </h1>

            <motion.p
              {...rise(0.9, 0.52, 16)}
              className="type-body mt-6 max-w-[470px] text-white/62 md:mt-7"
            >
              Rulebase monitors every AI and human customer interaction, finds
              where outcomes break, and shows the prompt, knowledge, coaching,
              or process fix that improves resolution.
            </motion.p>

            <motion.div {...rise(0.9, 0.62, 16)} className="mt-8 md:mt-9">
              <a href="#footer" className="btn btn-orange">
                Schedule a Demo
              </a>
            </motion.div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Right — carved stone relief with the floating demonstration       */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          className="relative min-h-[640px] overflow-hidden bg-[#d8d3cd] sm:min-h-[680px] lg:min-h-0"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 1, ease: easeEditorial }}
        >
          <Image
            src={media.heroRelief}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
          <div className="px-page absolute inset-0 flex items-start justify-center pt-9 sm:pt-12 lg:items-center lg:pt-0 lg:pb-[210px] xl:pb-[190px]">
            <HeroConversationDemo />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
