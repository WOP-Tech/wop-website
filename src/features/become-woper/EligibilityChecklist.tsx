"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { applicationHref } from "@/data/site";
import { criteria } from "./data";

/** Critères à cocher : compteur et barre de progression se mettent à jour à chaque case. */
export function EligibilityChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() => criteria.map(() => false));
  const count = checked.filter(Boolean).length;

  const toggle = (index: number) => setChecked((prev) => prev.map((value, i) => (i === index ? !value : value)));

  return (
    <Reveal className="grid gap-3">
      {criteria.map((criterion, i) => (
        <label
          key={criterion.title}
          className="group/chk relative grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-[22px] border-[1.5px] border-brown bg-cream px-[clamp(16px,2vw,26px)] py-[clamp(14px,1.6vw,22px)] transition-[background-color,color,translate] duration-250 hover:-translate-y-0.5 has-checked:bg-brown has-checked:text-cream has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-coral"
        >
          <input
            type="checkbox"
            checked={checked[i]}
            onChange={() => toggle(i)}
            className="absolute size-px opacity-0"
          />
          <span className="font-display text-[max(0.82rem,13px)] leading-none font-semibold tracking-[0.14em] group-has-checked/chk:text-sun">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="grid gap-1">
            <b className="font-display text-[1.25rem] leading-[1.1] font-semibold tracking-[-0.03em]">{criterion.title}</b>
            <span className="text-[0.95rem]">{criterion.text}</span>
          </span>
          <i
            aria-hidden="true"
            className="grid size-[30px] place-items-center rounded-full border-[1.5px] border-brown text-[0.85rem] text-transparent not-italic transition-[background-color,color,border-color] duration-250 group-has-checked/chk:border-sun group-has-checked/chk:bg-sun group-has-checked/chk:text-brown"
          >
            ✓
          </i>
        </label>
      ))}

      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <div
          role="status"
          aria-live="polite"
          className="grid min-w-48 gap-2 font-display text-[max(0.82rem,13px)] leading-none font-semibold"
        >
          <b className="text-[1.6rem] font-black tracking-[-0.04em]">{count}</b> / {criteria.length} critères
          <i aria-hidden="true" className="block h-1 overflow-hidden rounded bg-brown/15">
            <u
              style={{ transform: `scaleX(${count / criteria.length})` }}
              className="block size-full origin-left bg-[linear-gradient(90deg,var(--color-coral),var(--color-sun))] no-underline transition-transform duration-400 ease-out"
            />
          </i>
        </div>
        <ButtonLink href={applicationHref} variant="apply">
          Je candidate
        </ButtonLink>
      </div>
    </Reveal>
  );
}
