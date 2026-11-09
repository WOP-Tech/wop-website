"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/motion";
import { isIllustrative, testimonials } from "./data";
import { TestimonialCard } from "./TestimonialCard";

const AUTOPLAY_MS = 6500;

const arrowButton =
  "size-11 cursor-pointer rounded-full border-[1.5px] border-brown bg-cream font-display text-[1.2rem] leading-none font-bold transition-[background-color,color] duration-250 hover:bg-brown hover:text-cream min-[701px]:size-[52px]";

/** « Elles ont osé WOP » : bandeau de témoignages qui défile seul, en pause au survol, au focus ou au toucher. */
export function TestimonialsCarousel({ title }: { title: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);

  const cards = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const goTo = (target: number) => {
    const track = trackRef.current;
    const list = cards();
    if (!track || !list.length) return;
    indexRef.current = (target + list.length) % list.length;
    track.scrollTo({
      left: list[indexRef.current].offsetLeft - list[0].offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const syncIndex = () => {
    const track = trackRef.current;
    const list = cards();
    if (!track || list.length < 2) return;
    // En bout de bande, le défilement est plafonné : on considère alors la dernière carte comme active.
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) {
      indexRef.current = list.length - 1;
      return;
    }
    const step = list[1].offsetLeft - list[0].offsetLeft;
    indexRef.current = Math.max(0, Math.min(list.length - 1, Math.round(track.scrollLeft / Math.max(1, step))));
  };

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      if (!pausedRef.current && !document.hidden) goTo(indexRef.current + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `goTo` ne lit que des refs
  }, [reducedMotion]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <section id="histoire" className="py-[clamp(46.08px,7.92vh,86.4px)]">
      <Container>
        <div className="mb-[clamp(28px,5vh,48px)] flex items-end justify-between gap-5">
          <Reveal as="h2" className="heading-section max-w-[14em]">
            {title}
          </Reveal>
          <div className="flex gap-2.5">
            <button type="button" aria-label="Témoignage précédent" onClick={() => goTo(indexRef.current - 1)} className={arrowButton}>
              ←
            </button>
            <button type="button" aria-label="Témoignage suivant" onClick={() => goTo(indexRef.current + 1)} className={arrowButton}>
              →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          tabIndex={0}
          aria-label="Témoignages de Wopers"
          onScroll={syncIndex}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          className="flex snap-x snap-mandatory gap-[clamp(16px,2vw,28px)] overflow-x-auto px-0.5 pt-1.5 pb-[22px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.name}
              testimonial={t}
              className="min-h-[clamp(200px,28vh,260px)] flex-[0_0_90%] snap-start text-[clamp(1.1rem,1.5vw,1.4rem)] min-[701px]:flex-[0_0_min(80%,640px)]"
            />
          ))}
        </div>

        {isIllustrative && (
          <p className="mt-0 inline-block rounded-full border-[1.5px] border-brown/40 px-3.5 py-[7px] text-[0.85rem]">
            Témoignages illustratifs à remplacer par des voix réelles et consenties
          </p>
        )}
      </Container>
    </section>
  );
}
