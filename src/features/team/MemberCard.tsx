import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { Member } from "./data";

/** Fond de l'arche, visible pendant le chargement de la photo (maquettes : 1re corail, 2e brun, 3e doré). */
const photoBackgrounds = ["bg-coral", "bg-brown", "bg-sun"];

const linkedinClass =
  "inline-flex items-center gap-2 justify-self-start rounded-full border-[1.5px] border-brown px-3.5 py-2 font-display text-[0.85rem] leading-none font-semibold text-brown";

function LinkedinBadge() {
  return (
    <span
      aria-hidden="true"
      className="grid size-5 place-items-center rounded-[5px] bg-brown font-display text-[0.72rem] leading-none font-bold text-cream transition-[background-color,color] duration-200 group-hover:bg-cream group-hover:text-brown"
    >
      in
    </span>
  );
}

export function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <Reveal as="article" delay={index * 0.1} className="grid content-start gap-1.5">
      <div
        className={`relative mb-2.5 aspect-[4/5] overflow-hidden rounded-[999px_999px_24px_24px] ${photoBackgrounds[index % 3]}`}
      >
        <Image
          src={member.photo}
          alt={member.photoAlt}
          fill
          sizes="(min-width: 901px) 344px, 100vw"
          className="object-cover object-[50%_15%]"
        />
      </div>
      <h3 className="font-display text-[clamp(1.25rem,1.7vw,1.6rem)] leading-none font-semibold tracking-[-0.03em]">
        {member.name}
      </h3>
      <span className="font-display text-[0.72rem] leading-none font-bold tracking-[0.16em] uppercase">{member.role}</span>
      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${member.name} (nouvel onglet)`}
          className={`group ${linkedinClass} transition-[background-color,color] duration-200 hover:bg-brown hover:text-cream`}
        >
          <LinkedinBadge />
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className={`${linkedinClass} opacity-40`} title="Lien LinkedIn à venir">
          <LinkedinBadge />
          LinkedIn
          <span className="sr-only"> (lien à venir)</span>
        </span>
      )}
    </Reveal>
  );
}
