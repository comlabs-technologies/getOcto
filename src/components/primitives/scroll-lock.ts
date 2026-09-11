"use client";

import { useEffect } from "react";

let lockCount = 0;
let restoreWidth = "";

/** Locks body scrolling while `active` is true, refcounted across consumers. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    if (lockCount === 0) {
      const gutter = window.innerWidth - document.documentElement.clientWidth;
      restoreWidth = document.body.style.paddingRight;
      if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
      document.body.dataset.scrollLocked = "true";
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        delete document.body.dataset.scrollLocked;
        document.body.style.paddingRight = restoreWidth;
      }
    };
  }, [active]);
}
