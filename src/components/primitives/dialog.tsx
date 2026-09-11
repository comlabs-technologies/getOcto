"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { easeEditorial } from "@/lib/motion";
import { useScrollLock } from "./scroll-lock";
import { usePrefersReducedMotion } from "./use-reduced-motion";

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,iframe,[tabindex]:not([tabindex="-1"])';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
  /** Rendered behind the surface; defaults to a dark scrim. */
  overlayClassName?: string;
  surfaceClassName?: string;
};

/**
 * Modal dialog primitive: portalled, scroll-locking, focus-trapping, closes on
 * Escape and backdrop press, and restores focus to the opener.
 */
export function Dialog({
  open,
  onClose,
  label,
  children,
  overlayClassName,
  surfaceClassName,
}: DialogProps) {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useScrollLock(open);

  // Remember the opener and move focus into the dialog.
  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;

    const frame = requestAnimationFrame(() => {
      const surface = surfaceRef.current;
      if (!surface) return;
      const first = surface.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? surface).focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(frame);
      openerRef.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const surface = surfaceRef.current;
      if (!surface) return;
      const nodes = Array.from(
        surface.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((node) => node.offsetParent !== null || node === surface);
      if (nodes.length === 0) {
        event.preventDefault();
        surface.focus({ preventScroll: true });
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === surface)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, onKeyDown]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className={`fixed inset-0 z-[100] flex items-center justify-center ${overlayClassName ?? "bg-black/88 px-page"}`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.35, ease: "linear" }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={surfaceRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className={`relative outline-none ${surfaceClassName ?? ""}`}
            initial={reduced ? false : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{
              duration: reduced ? 0 : 0.45,
              ease: easeEditorial,
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
