import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** En-tête de section des pages intérieures (maquettes : `.sec-h`) : surtitre, titre révélé au défilement, chapeau optionnel. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Contenu supplémentaire sous le chapeau. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-[clamp(24px,4vh,40px)] max-w-[40rem] ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Reveal as="h2" className="heading-section">
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" className="mt-3.5 max-w-[32rem] opacity-85">
          {lead}
        </Reveal>
      )}
      {children}
    </div>
  );
}
