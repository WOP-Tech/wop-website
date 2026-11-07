"use client";

import { useRef } from "react";
import { clamp, useScrollFrame } from "@/lib/motion";

/** Rail vertical de la frise : se remplit (corail → doré) au rythme de la lecture, un point lumineux en tête. */
export function TimelineRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLElement>(null);

  useScrollFrame(() => {
    const section = railRef.current?.parentElement;
    if (!section || !fillRef.current || !dotRef.current) return;
    const rect = section.getBoundingClientRect();
    const progress = clamp((window.innerHeight * 0.55 - rect.top) / Math.max(1, rect.height));
    const percent = `${(progress * 100).toFixed(2)}%`;
    fillRef.current.style.height = percent;
    dotRef.current.style.top = percent;
  });

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className="absolute top-0 bottom-0 left-(--rx) z-[2] -ml-0.5 w-1 rounded bg-coral/35"
    >
      <i ref={fillRef} className="absolute top-0 left-0 h-0 w-full rounded bg-[linear-gradient(180deg,var(--color-coral),var(--color-sun))]" />
      <i
        ref={dotRef}
        className="absolute top-0 left-1/2 -mt-[11px] -ml-[11px] size-[22px] rounded-full bg-sun shadow-[0_0_0_7px_rgba(246,181,74,0.3),0_0_30px_8px_rgba(246,181,74,0.6)]"
      />
    </div>
  );
}
