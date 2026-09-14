"use client";

import Image from "next/image";
import { BrandLogo } from "@/components/brand";
import { useCookiePreferences } from "@/components/cookie-preferences";
import { footerColumns } from "@/lib/data";
import { media } from "@/lib/media";

export function SiteFooter() {
  const { open } = useCookiePreferences();

  return (
    <footer
      id="footer"
      className="bg-background pt-16 pb-10 md:pt-20 lg:pt-[64px]"
    >
      <div className="px-page">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 border-t border-line pt-12 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] lg:gap-x-8">
          {/* Identity ---------------------------------------------------- */}
          <div className="col-span-full lg:col-span-1">
            <BrandLogo />
            <p className="mt-4 max-w-[220px] text-[13px] leading-[19px] text-muted">
              Every conversation. A clearer outcome.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <Image
                src={media.badgeSoc}
                alt="Security programme badge"
                width={52}
                height={52}
                className="h-[52px] w-auto object-contain"
              />
              <Image
                src={media.badgeGdpr}
                alt="Data protection badge"
                width={52}
                height={52}
                className="h-[52px] w-auto object-contain"
              />
            </div>
          </div>

          {/* Link columns ------------------------------------------------ */}
          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="type-label mb-4 text-ink">{column.heading}</h2>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.action === "cookies" ? (
                      <button
                        type="button"
                        onClick={open}
                        className="text-left text-[13px] leading-[18px] text-muted transition-colors duration-[160ms] hover:text-ink"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[13px] leading-[18px] text-muted transition-colors duration-[160ms] hover:text-ink"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom row ---------------------------------------------------- */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-muted">
            © Octo Systems 2026 — Independent product concept
          </p>
          <p className="flex items-center gap-2.5 text-[12px] text-muted">
            Backed by
            <Image
              src={media.badgeYc}
              alt="Y Combinator"
              width={92}
              height={20}
              className="h-5 w-auto object-contain"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
