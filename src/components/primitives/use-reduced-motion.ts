"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Hydration-safe reduced-motion signal.
 *
 * Motion's own `useReducedMotion` reads `matchMedia` during the very first
 * client render, which produces markup that differs from the server output for
 * anyone with the OS setting enabled. `useSyncExternalStore` uses the server
 * snapshot while hydrating and only then reconciles to the real value, so the
 * first paint always matches and the preference is still respected — and kept
 * up to date if the user changes it mid-session.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
