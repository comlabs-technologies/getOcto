"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { BrandLogo } from "@/components/brand";
import { ProductMegaMenu } from "@/components/product-mega-menu";
import { Disclosure } from "@/components/primitives/disclosure";
import { usePrefersReducedMotion } from "@/components/primitives/use-reduced-motion";
import { useScrollLock } from "@/components/primitives/scroll-lock";
import { megaMenu, primaryNav } from "@/lib/data";
import { easeEditorial } from "@/lib/motion";

const CLOSE_DELAY = 140;

export function SiteHeader() {
  const [productOpen, setProductOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  const menuId = useId();
  const triggerId = useId();
  const mobileId = useId();

  const zoneRef = useRef<HTMLLIElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useScrollLock(mobileOpen);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setProductOpen(false), CLOSE_DELAY);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  // Escape closes whichever surface is open; outside clicks close the mega menu.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (productOpen) {
        setProductOpen(false);
        triggerRef.current?.focus();
      }
      if (mobileOpen) setMobileOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!productOpen) return;
      const target = event.target as Node;
      if (zoneRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setProductOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [productOpen, mobileOpen]);

  // Close the desktop menu once focus leaves both the trigger and the panel.
  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (!next) return;
    if (zoneRef.current?.contains(next)) return;
    if (panelRef.current?.contains(next)) return;
    setProductOpen(false);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.7, ease: easeEditorial }}
      onBlur={handleBlur}
    >
      <div className="relative border-b border-line bg-nav">
        <div className="px-page flex h-[60px] items-center justify-between gap-6">
          <div className="flex items-center gap-9">
            <a
              href="#top"
              className="flex items-center rounded-xs"
              aria-label="Octo — home"
            >
              <BrandLogo />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                <li
                  ref={zoneRef}
                  onMouseEnter={() => {
                    cancelClose();
                    setProductOpen(true);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    ref={triggerRef}
                    id={triggerId}
                    type="button"
                    aria-expanded={productOpen}
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={() => setProductOpen((value) => !value)}
                    className="flex h-[60px] items-center gap-1.5 text-[15px] tracking-[-0.01em] text-ink/80 transition-colors duration-[160ms] hover:text-ink"
                  >
                    Platform
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                      style={{
                        transform: productOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </button>
                </li>
                {primaryNav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex h-[60px] items-center text-[15px] tracking-[-0.01em] text-ink/80 transition-colors duration-[160ms] hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#footer"
              className="btn btn-orange btn-sm hidden min-h-[36px] lg:inline-flex"
            >
              Book a walkthrough
            </a>
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls={mobileId}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-xs text-ink lg:hidden"
            >
              {mobileOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <ProductMegaMenu
          ref={panelRef}
          open={productOpen}
          id={menuId}
          labelledBy={triggerId}
          onNavigate={() => setProductOpen(false)}
        />
      </div>

      {/* Mobile disclosure panel — same information architecture as the mega menu. */}
      <div
        id={mobileId}
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
        className="px-page absolute inset-x-0 top-full max-h-[calc(100svh-60px)] overflow-y-auto border-b border-line bg-paper lg:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          visibility: mobileOpen ? "visible" : "hidden",
          transform: mobileOpen ? "translateY(0)" : "translateY(-6px)",
          transition:
            "opacity 180ms cubic-bezier(0.2,0.8,0.2,1), transform 180ms cubic-bezier(0.2,0.8,0.2,1), visibility 180ms linear",
        }}
      >
        <nav aria-label="Mobile" className="flex flex-col pb-7">
          {megaMenu.columns.map((column) => (
            <Disclosure
              key={column.heading}
              summary={column.heading}
              className="border-b border-line py-2"
            >
              <ul className="flex flex-col pb-3">
                {column.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[44px] flex-col justify-center py-2"
                    >
                      <span className="text-[16px] tracking-[-0.02em] text-ink">
                        {item.title}
                      </span>
                      <span className="text-[13px] leading-[18px] text-muted">
                        {item.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Disclosure>
          ))}

          <a
            href={megaMenu.footer.href}
            onClick={() => setMobileOpen(false)}
            className="flex min-h-[44px] flex-col justify-center border-b border-line py-3"
          >
            <span className="text-[16px] tracking-[-0.02em] text-ink">
              {megaMenu.footer.title}
            </span>
            <span className="text-[13px] leading-[18px] text-muted">
              {megaMenu.footer.description}
            </span>
          </a>

          {primaryNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[52px] items-center border-b border-line text-[16px] tracking-[-0.02em] text-ink"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#footer"
            onClick={() => setMobileOpen(false)}
            className="btn btn-orange mt-6 w-full"
          >
            Book a walkthrough
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
