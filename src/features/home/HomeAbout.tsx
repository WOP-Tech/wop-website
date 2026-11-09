"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { clamp, isInViewport, pinnedProgress, useScrollFrame } from "@/lib/motion";
import { aboutText } from "./data";

const words = aboutText.split(" ");

/** « Qui sommes-nous ? » : section épinglée, le texte s'allume mot à mot au défilement. */
export function HomeAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useScrollFrame(() => {
    const section = sectionRef.current;
    if (!section || !isInViewport(section)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lit = clamp(pinnedProgress(section) / 0.85) * (words.length + 3);
    wordsRef.current.forEach((word, i) => {
      if (!word) return;
      const o = clamp((lit - i) / 3);
      word.style.opacity = (0.14 + 0.86 * o).toFixed(3);
      word.style.transform = `translate3d(0, ${((1 - o) * 14).toFixed(1)}px, 0)`;
    });
  });

  return (
    <section id="qui" ref={sectionRef} className="relative h-[210vh] motion-reduce:h-auto">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden bg-cream motion-reduce:static motion-reduce:h-auto motion-reduce:py-[18vh]">
        <Container className="relative z-[1] grid w-full items-center gap-[clamp(24px,5vw,80px)] min-[900px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow mb-[18px]">Qui sommes-nous ?</p>
            <h2 className="font-display text-[clamp(1.8rem,3.8vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance">
              Qu’est-ce que Woman of Power <em className="text-coral-ink not-italic">(WOP)</em> ?
            </h2>
          </div>
          <p className="max-w-[24em] font-display text-[clamp(1.1rem,1.8vw,1.75rem)] leading-[1.15] font-semibold tracking-[-0.025em]">
            {words.map((word, i) => (
              <span key={i}>
                <span
                  ref={(el) => {
                    wordsRef.current[i] = el;
                  }}
                  className="inline-block anim:opacity-[0.14]"
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </p>
        </Container>
      </div>
    </section>
  );
}
