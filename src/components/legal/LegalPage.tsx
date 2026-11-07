import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

/** Date de dernière mise à jour affichée en tête des pages légales. */
export const LEGAL_UPDATED_AT = "7 novembre 2026";

/** Gabarit des pages légales (maquettes : `.leg-h`, `.legal-wrap`) : en-tête, sommaire latéral épinglé, sections. */
export function LegalPage({
  title,
  lead,
  sections,
}: {
  title: string;
  lead: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="pt-[clamp(110px,16vh,160px)]">
        <Container>
          <p className="eyebrow">Informations légales</p>
          <h1 className="heading-section mt-2 mb-3.5">{title}</h1>
          <p className="max-w-[40em] opacity-85">{lead}</p>
          <p className="mt-3.5 text-[0.9rem] opacity-90">Dernière mise à jour : {LEGAL_UPDATED_AT}</p>
        </Container>
      </section>

      <Section>
        <Container className="grid grid-cols-[minmax(0,1fr)] items-start gap-[clamp(24px,5vw,72px)] min-[901px]:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
          <nav aria-label="Sommaire" className="grid gap-0.5 min-[901px]:sticky min-[901px]:top-24">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block border-b border-brown/15 py-2.5 text-[0.92rem] hover:underline"
              >
                {section.title}
              </a>
            ))}
          </nav>

          <div className="[&_li]:max-w-[46em] [&_li]:leading-[1.6] [&_p]:max-w-[46em] [&_p]:leading-[1.6] [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-1.5 [&_ul]:pl-[1.2em] [&_a]:underline [&_a]:underline-offset-2">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 pb-7">
                <h2 className="mb-3 font-display text-[clamp(1.3rem,2vw,1.7rem)] leading-[1.15] font-semibold tracking-[-0.03em]">
                  {section.title}
                </h2>
                {section.content}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

/** Sous-titre d'une section légale. */
export function LegalSubtitle({ children }: { children: ReactNode }) {
  return <h3 className="mt-[18px] mb-1.5 font-display text-[1.05rem] leading-[1.3] font-semibold">{children}</h3>;
}

/** Tableau « libellé / valeur » (maquettes : `.deftable`). */
export function DefinitionTable({ rows }: { rows: [ReactNode, ReactNode][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="mt-2 mb-3.5 w-full border-collapse text-[0.95rem]">
        <tbody>
          {rows.map(([label, value], i) => (
            <tr key={i} className="border-b border-brown/15">
              <th scope="row" className="w-[34%] px-3.5 py-3 text-left align-top font-semibold">
                {label}
              </th>
              <td className="px-3.5 py-3 text-left align-top">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
