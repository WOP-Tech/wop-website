import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

type PageHeroProps = {
  eyebrow: string;
  /** Titre principal ; entourer le mot mis en valeur d'un `<em>`. */
  title: ReactNode;
  intro: ReactNode;
  /** Boutons ; la zone garde son espacement même vide, comme dans les maquettes. */
  actions?: ReactNode;
  /** Sans image, le texte occupe toute la largeur (maquette Contact : `.ph-solo`). */
  image?: StaticImageData;
  imageAlt?: string;
  imagePosition?: string;
  /** Élément posé sur l'arche (citation…). */
  overlay?: ReactNode;
  /** `story` : page Découvrir ; `page` : pages intérieures (maquettes : `.dh.ph`). */
  spacing?: "story" | "page";
};

const spacings = {
  story: "pt-[clamp(79.2px,10.8vh,108px)] pb-[clamp(56px,9vh,96px)]",
  page: "pt-[clamp(104px,14vh,150px)] pb-[clamp(28px,5vh,56px)]",
};

/** Chaque ligne du texte monte à son tour (maquettes : `.dh-copy > *`, décalage de 80 ms). */
const riseDelay = (i: number) => ({ animationDelay: `${i * 0.08}s` });

/** Haut de page des pages intérieures : texte à gauche, photo en arche ombrée de corail à droite. */
export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  image,
  imageAlt,
  imagePosition = "50% 50%",
  overlay,
  spacing = "page",
}: PageHeroProps) {
  return (
    <section id="haut" className={`relative overflow-hidden ${spacings[spacing]}`}>
      <Container
        className={`relative grid items-center gap-[clamp(32px,5vw,80px)] ${
          image ? "min-[901px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" : ""
        }`}
      >
        <div>
          <p className="eyebrow anim:animate-rise">{eyebrow}</p>
          <h1
            style={riseDelay(1)}
            className={`${image ? "max-w-[13em]" : "max-w-[16em]"} font-display text-[clamp(1.72rem,3.43vw,3.28rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance anim:animate-rise [&_em]:text-coral-ink [&_em]:not-italic`}
          >
            {title}
          </h1>
          <p
            style={riseDelay(2)}
            className="mt-[clamp(24px,4vh,40px)] max-w-[34rem] text-[clamp(1rem,1.15vw,1.1rem)] anim:animate-rise"
          >
            {intro}
          </p>
          <div style={riseDelay(3)} className="mt-[clamp(24px,4vh,40px)] flex flex-wrap gap-3 anim:animate-rise">
            {actions}
          </div>
        </div>

        {image && (
          <div className="relative mb-14 ml-[8%] w-full max-w-[320px] justify-self-start min-[901px]:ml-0 min-[901px]:max-w-[420px] min-[901px]:justify-self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_28px_28px] bg-brown/6 shadow-[18px_18px_0_var(--color-coral)]">
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 901px) 420px, 320px"
                style={{ objectPosition: imagePosition }}
                className="object-cover"
              />
            </div>
            {overlay}
          </div>
        )}
      </Container>
    </section>
  );
}
