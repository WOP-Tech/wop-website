import Image from "next/image";
import type { Testimonial } from "./data";

const tones: Record<Testimonial["tone"], { card: string; program: string; avatar: string }> = {
  brown: { card: "bg-brown text-cream", program: "text-sun", avatar: "" },
  coral: {
    card: "bg-[linear-gradient(135deg,var(--color-coral)_0%,var(--color-salmon)_100%)] text-cream [text-shadow:0_1px_10px_rgba(105,65,44,0.3)]",
    program: "text-cream",
    avatar: "bg-cream [text-shadow:none]",
  },
  cream: {
    card: "border-2 border-brown bg-cream text-brown shadow-[10px_10px_0_var(--color-sun)]",
    program: "",
    avatar: "",
  },
};

/** Carte de témoignage (maquettes : `.tem-card`). La mise en page (largeur, taille du texte) vient du parent. */
export function TestimonialCard({ testimonial: t, className = "" }: { testimonial: Testimonial; className?: string }) {
  return (
    <figure
      className={`m-0 flex flex-col justify-between gap-5 rounded-[26px] p-[clamp(22px,2.4vw,34px)] ${tones[t.tone].card} ${className}`}
    >
      <blockquote className="font-display leading-[1.3] font-semibold tracking-[-0.03em]">
        «&nbsp;{t.quote}&nbsp;»
      </blockquote>
      <figcaption className="flex items-center gap-4">
        <span
          className={`grid size-16 flex-none place-items-center overflow-hidden rounded-full bg-[linear-gradient(135deg,var(--color-coral),var(--color-sun))] ${tones[t.tone].avatar}`}
        >
          <Image src={t.photo} alt="" sizes="64px" className="size-full object-cover object-[50%_22%]" />
        </span>
        <span>
          <b className="block font-display text-[1.1rem] leading-[1.1] font-bold">
            {t.name}, {t.age} ans
          </b>
          <em
            className={`font-display text-[0.72rem] leading-none font-semibold tracking-[0.1em] uppercase not-italic opacity-80 ${tones[t.tone].program}`}
          >
            {t.program}
          </em>
        </span>
      </figcaption>
    </figure>
  );
}
