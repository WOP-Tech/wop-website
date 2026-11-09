"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Progression (0 → 1) du défilement à travers une section « épinglée » :
 * 0 quand son haut touche le haut de l'écran, 1 quand son bas touche le bas.
 */
export function pinnedProgress(el: Element) {
  const rect = el.getBoundingClientRect();
  return clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
}

export function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

/** Appelle `callback` au plus une fois par image, au défilement et au redimensionnement. */
export function useScrollFrame(callback: () => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    let frame = 0;
    const run = () => {
      frame = 0;
      callbackRef.current();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}
