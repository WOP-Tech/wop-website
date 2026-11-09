import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/** Bandeau d'appel final en dégradé corail (maquettes : `.cta-box`). */
export function CtaBanner({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <Section>
      <Container>
        <Reveal className="flex flex-wrap items-center justify-between gap-6 rounded-[30px] bg-[linear-gradient(135deg,var(--color-coral)_0%,var(--color-salmon)_100%)] p-[clamp(24px,3vw,44px)] text-cream [text-shadow:0_1px_10px_rgba(105,65,44,0.3)]">
          <h2 className="max-w-[16em] font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
            {title}
          </h2>
          <div className="flex flex-wrap gap-3">{children}</div>
        </Reveal>
      </Container>
    </Section>
  );
}
