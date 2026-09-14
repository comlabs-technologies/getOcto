"use client";

import { CreditCard, KeyRound, ScrollText, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";
import { securityFeatures, type SecurityFeature } from "@/lib/data";

const ICONS: Record<SecurityFeature["icon"], LucideIcon> = {
  soc: ShieldCheck,
  gdpr: ScrollText,
  pci: CreditCard,
  encryption: KeyRound,
};

export function SecuritySection() {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="on-dark px-page bg-dark pt-16 pb-16 text-white md:pt-20 md:pb-20 lg:pt-24 lg:pb-24"
    >
      <Reveal>
        <h2 id="security-heading" className="type-section max-w-[760px] text-white">
          Security designed into
          <br />
          every workflow.
        </h2>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="type-body mt-6 max-w-[520px] text-white/55">
          Octo is designed around controlled access, data minimisation,
          auditability and secure integration with customer-operation systems.
        </p>
        <a href="#security" className="btn btn-paper btn-sm mt-7 min-h-[38px]">
          Read more
        </a>
      </Reveal>

      <ul className="mt-14 grid grid-cols-1 gap-px bg-dark-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {securityFeatures.map((feature, i) => {
          const Icon = ICONS[feature.icon];
          return (
            <Reveal
              as="li"
              key={feature.id}
              delay={i * 0.06}
              className="group flex min-h-[248px] flex-col justify-between border border-transparent bg-dark p-6 transition-[border-color] duration-[200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-white/28 lg:min-h-[268px]"
            >
              <Icon
                size={22}
                strokeWidth={1.25}
                aria-hidden="true"
                className="text-white/45 transition-colors duration-[200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:text-white"
              />
              <div>
                <h3 className="text-[17px] tracking-[-0.02em] text-white">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[12.5px] leading-[18px] text-white/50">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={0.06}>
        <p className="mt-8 text-[12px] leading-[17px] text-white/40">
          Security capabilities shown are part of this conceptual product
          demonstration.
        </p>
      </Reveal>
    </section>
  );
}
