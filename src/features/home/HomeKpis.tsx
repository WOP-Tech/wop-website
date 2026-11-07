"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { pinnedProgress, isInViewport, useScrollFrame } from "@/lib/motion";
import { kpis } from "./data";

/** « WOP en quelques chiffres » : section épinglée, un chiffre par tiers de défilement. */
export function HomeKpis() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useScrollFrame(() => {
    const section = sectionRef.current;
    if (!section || !isInViewport(section)) return;
    setActive(Math.min(kpis.length - 1, Math.floor(pinnedProgress(section) * kpis.length)));
  });

  return (
    <section id="chiffres" ref={sectionRef} className="relative h-[330vh] motion-reduce:h-auto">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden bg-cream motion-reduce:static motion-reduce:h-auto motion-reduce:py-[16vh]">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-[clamp(24px,6vw,120px)] z-[1] mt-[calc(min(38vw,56vh)*-0.625_-_10px)] hidden aspect-[4/5] w-[min(38vw,56vh)] rounded-[999px_999px_28px_28px] border-2 border-brown bg-cream tab:block"
        >
          <div className="absolute top-5 left-5 -z-1 size-full rounded-[inherit] bg-[linear-gradient(160deg,var(--color-coral),var(--color-salmon)_55%,var(--color-sun))]" />
          {kpis.map((kpi, i) => (
            <Image
              key={kpi.value}
              src={kpi.image}
              alt=""
              fill
              sizes="(min-width: 860px) 40vw, 1px"
              style={{ objectPosition: kpi.imagePosition }}
              className={`rounded-[inherit] object-cover transition-[opacity,scale] duration-[700ms,1100ms] ease-out motion-reduce:transition-none ${
                i === active ? "scale-100 opacity-100" : "scale-[1.12] opacity-0"
              }`}
            />
          ))}
        </div>

        <Container className="relative z-[2] w-full *:tab:ml-auto *:tab:w-[min(40%,540px)]">
          <p className="eyebrow">WOP en quelques chiffres</p>
          <div className="relative grid gap-16 anim:block anim:min-h-[min(60svh,540px)]">
            {kpis.map((kpi, i) => (
              <div
                key={kpi.value}
                aria-hidden={i !== active ? true : undefined}
                className={`w-full transition-[opacity,translate] duration-[500ms,600ms] ease-out anim:absolute anim:top-0 anim:left-0 ${
                  i === active ? "" : "anim:translate-y-10 anim:opacity-0"
                }`}
              >
                <p className="font-display text-[clamp(3.9rem,min(20vh,11vw),7.8rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-coral-ink">
                  {kpi.prefix}
                  {kpi.value}
                </p>
                <p className="mt-5 max-w-[13em] font-display text-[clamp(1.2rem,2.2vw,1.9rem)] leading-[1.1] font-bold tracking-[-0.02em]">
                  {kpi.label}
                </p>
                <p className="mt-[18px] max-w-[27em] text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.55]">{kpi.story}</p>
                {kpi.chips && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {kpi.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full border-[1.5px] border-brown bg-coral/18 px-4 py-2 font-display text-[max(0.82rem,13px)] leading-none font-semibold"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="mt-5 flex gap-2 motion-reduce:hidden">
            {kpis.map((kpi, i) => (
              <i
                key={kpi.value}
                className={`block h-1 rounded transition-[width,background-color] duration-300 ${
                  i === active ? "w-12 bg-brown" : "w-[18px] bg-brown/15"
                }`}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
