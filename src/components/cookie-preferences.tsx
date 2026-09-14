"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Pressable } from "@/components/primitives/pressable";
import { usePrefersReducedMotion } from "@/components/primitives/use-reduced-motion";
import { easeEditorial } from "@/lib/motion";

const STORAGE_KEY = "octo.cookie-preferences";

type Preferences = {
  productAnalytics: boolean;
  visitorInsights: boolean;
};

const DEFAULTS: Preferences = {
  productAnalytics: false,
  visitorInsights: false,
};

type CookieContextValue = { open: () => void };

const CookieContext = createContext<CookieContextValue | null>(null);

export function useCookiePreferences() {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error(
      "useCookiePreferences must be used inside <CookiePreferencesProvider>",
    );
  }
  return context;
}

function read(): Preferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Preferences>;
    return {
      productAnalytics: Boolean(parsed.productAnalytics),
      visitorInsights: Boolean(parsed.visitorInsights),
    };
  } catch {
    return null;
  }
}

function write(preferences: Preferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Storage unavailable (private mode, blocked cookies) — stay silent.
  }
}

/**
 * Local-only cookie preference panel. Choices are persisted to localStorage and
 * nothing else: no analytics scripts are loaded or requested from this page.
 */
export function CookiePreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  // Read on first client render. Nothing derived from `draft` is rendered while
  // the panel is closed, so this can never produce a hydration mismatch.
  const [draft, setDraft] = useState<Preferences>(() =>
    typeof window === "undefined" ? DEFAULTS : (read() ?? DEFAULTS),
  );
  const reduced = usePrefersReducedMotion();

  // First visit only: reveal the panel once, restrained and dismissible.
  useEffect(() => {
    if (read()) return;
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const open = useCallback(() => {
    setDraft(read() ?? DEFAULTS);
    setVisible(true);
  }, []);

  const persist = useCallback((preferences: Preferences) => {
    write(preferences);
    setDraft(preferences);
    setVisible(false);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <CookieContext.Provider value={value}>
      {children}

      {/*
        The panel is fixed, so it would otherwise anchor to the viewport and
        float outside the boxed page on wide screens. This wrapper re-centres
        it on the shell; it is inert until the panel appears.
      */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] mx-auto w-full max-w-[var(--shell)]">
        <AnimatePresence>
          {visible ? (
            <motion.div
                role="dialog"
                aria-labelledby="cookie-preferences-title"
                id="cookie-settings"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: reduced ? 0 : 0.35, ease: easeEditorial }}
                className="pointer-events-auto m-[var(--page-x)] max-h-[calc(100svh-2*var(--page-x))] overflow-y-auto border border-line bg-paper sm:max-w-[384px]"
              >
                <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
                  <h2
                    id="cookie-preferences-title"
                    className="text-[15px] tracking-[-0.02em] text-ink"
                  >
                    Cookie preferences
                  </h2>
                  <button
                    type="button"
                    onClick={() => setVisible(false)}
                    aria-label="Close cookie preferences"
                    className="-mt-1.5 -mr-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xs text-muted transition-colors duration-[160ms] hover:text-ink"
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>

                <div className="px-5 py-4">
                  <p className="text-[12.5px] leading-[18px] text-muted">
                    We use a small number of cookies to keep this site working and to
                    understand how it is used. You can change your choices at any
                    time.
                  </p>

                  <ul className="mt-4 flex flex-col border-t border-line">
                    <li className="flex items-start justify-between gap-4 border-b border-line py-3.5">
                      <span className="min-w-0">
                        <span className="block text-[13px] tracking-[-0.01em] text-ink">
                          Necessary
                        </span>
                        <span className="mt-0.5 block text-[11.5px] leading-[16px] text-muted">
                          Required for the site to load and function.
                        </span>
                      </span>
                      <span className="mt-0.5 shrink-0 border border-line bg-panel px-2 py-1 text-[10px] leading-none text-muted">
                        Always on
                      </span>
                    </li>

                    <Toggle
                      label="Product analytics"
                      description="Aggregated usage data so we can improve the product pages."
                      checked={draft.productAnalytics}
                      onChange={(next) =>
                        setDraft((current) => ({
                          ...current,
                          productAnalytics: next,
                        }))
                      }
                    />
                    <Toggle
                      label="Visitor insights"
                      description="Helps us understand which organisations find Octo useful."
                      checked={draft.visitorInsights}
                      onChange={(next) =>
                        setDraft((current) => ({
                          ...current,
                          visitorInsights: next,
                        }))
                      }
                    />
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Pressable
                      size="sm"
                      variant="outline"
                      className="min-h-[38px]"
                      onClick={() =>
                        persist({ productAnalytics: false, visitorInsights: false })
                      }
                    >
                      Decline all
                    </Pressable>
                    <Pressable
                      size="sm"
                      variant="ink"
                      className="min-h-[38px]"
                      onClick={() =>
                        persist({ productAnalytics: true, visitorInsights: true })
                      }
                    >
                      Accept all
                    </Pressable>
                    <Pressable
                      size="sm"
                      variant="orange"
                      className="ml-auto min-h-[38px]"
                      onClick={() => persist(draft)}
                    >
                      Save choices
                    </Pressable>
                  </div>
                </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </CookieContext.Provider>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4 border-b border-line py-3.5">
      <span className="min-w-0">
        <span className="block text-[13px] tracking-[-0.01em] text-ink">
          {label}
        </span>
        <span className="mt-0.5 block text-[11.5px] leading-[16px] text-muted">
          {description}
        </span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative mt-0.5 inline-flex h-[22px] w-[38px] shrink-0 items-center border transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{
          backgroundColor: checked ? "#fe4c00" : "#efedeb",
          borderColor: checked ? "#fe4c00" : "rgba(30,30,30,0.15)",
        }}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className="block h-[16px] w-[16px] bg-white transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{
            transform: checked ? "translateX(19px)" : "translateX(2px)",
            boxShadow: checked ? "none" : "0 0 0 1px rgba(30,30,30,0.12)",
          }}
        />
      </button>
    </li>
  );
}
