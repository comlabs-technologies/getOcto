"use client";

import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { megaMenu } from "@/lib/data";

type ProductMegaMenuProps = {
  open: boolean;
  id: string;
  labelledBy: string;
  onNavigate: () => void;
};

/**
 * Full-width white panel that drops beneath the header. Visibility is driven by
 * CSS (opacity / visibility / translate) so there is no mount-unmount flicker
 * and the panel keeps its place in the DOM for focus management.
 */
export const ProductMegaMenu = forwardRef<HTMLDivElement, ProductMegaMenuProps>(
  function ProductMegaMenu({ open, id, labelledBy, onNavigate }, ref) {
    return (
      <div
        ref={ref}
        id={id}
        aria-labelledby={labelledBy}
        inert={!open}
        className="absolute inset-x-0 top-full hidden border-b border-line bg-paper lg:block"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transform: open ? "translateY(0)" : "translateY(-6px)",
          transition:
            "opacity 180ms cubic-bezier(0.2,0.8,0.2,1), transform 180ms cubic-bezier(0.2,0.8,0.2,1), visibility 180ms linear",
        }}
      >
        <div className="px-page">
          <div className="grid grid-cols-2 gap-px bg-line">
            {megaMenu.columns.map((column) => (
              <div key={column.heading} className="bg-paper py-9 pr-10">
                <p className="type-label mb-6 text-muted">{column.heading}</p>
                <ul className="flex flex-col">
                  {column.items.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.href}
                        onClick={onNavigate}
                        className="group flex flex-col gap-1 rounded-xs py-3 transition-colors duration-[160ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                      >
                        <span className="flex items-center gap-1.5 text-[17px] tracking-[-0.02em] text-ink transition-colors duration-[160ms] group-hover:text-orange">
                          {item.title}
                          <ArrowUpRight
                            size={14}
                            aria-hidden="true"
                            className="translate-y-px opacity-0 transition-opacity duration-[160ms] group-hover:opacity-100"
                          />
                        </span>
                        <span className="text-[14px] leading-[20px] text-muted">
                          {item.description}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-line">
            <a
              href={megaMenu.footer.href}
              onClick={onNavigate}
              className="group flex items-baseline gap-4 py-6"
            >
              <span className="text-[17px] tracking-[-0.02em] text-ink transition-colors duration-[160ms] group-hover:text-orange">
                {megaMenu.footer.title}
              </span>
              <span className="text-[14px] leading-[20px] text-muted">
                {megaMenu.footer.description}
              </span>
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="ml-auto translate-y-px text-muted opacity-0 transition-opacity duration-[160ms] group-hover:opacity-100"
              />
            </a>
          </div>
        </div>
      </div>
    );
  },
);
