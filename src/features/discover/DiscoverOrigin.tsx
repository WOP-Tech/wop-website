import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import originPhoto from "@/assets/images/decouvrir/origine.jpg";

/** « Pourquoi nous existons » : titre épinglé à gauche, récit qui défile à droite. */
export function DiscoverOrigin() {
  return (
    <section id="pourquoi" className="py-[clamp(40.32px,7.2vh,86.4px)]">
      <Container className="grid items-start gap-[clamp(32px,6vw,96px)] min-[901px]:grid-cols-2">
        <div className="min-[901px]:sticky min-[901px]:top-[110px] motion-reduce:static">
          <p className="eyebrow">Pourquoi nous existons</p>
          <Reveal as="h2" className="heading-section">
            WOP est née d’un constat devenu une mission.
          </Reveal>
        </div>
        <div className="grid gap-[22px] text-[1.08rem]">
          <Reveal as="p" className="font-display text-[clamp(1.25rem,1.8vw,1.6rem)] leading-[1.3] font-medium tracking-[-0.02em]">
            Partout dans le monde, de jeunes femmes portent des idées, des talents et une vision capable de faire
            évoluer leur environnement. Pourtant, beaucoup ne disposent pas encore de la confiance, des outils, des
            modèles ou des connexions nécessaires pour prendre pleinement leur place.
          </Reveal>
          <Reveal as="p">
            <strong>Woman Of Power est née pour créer ce passage entre le potentiel et l’action.</strong> Un espace où
            chaque jeune femme peut se révéler, développer son leadership, apprendre au contact d’autres femmes et
            avancer avec davantage de clarté, d’audace et d’intention.
          </Reveal>
          <Reveal className="relative mt-3.5 aspect-[16/10] overflow-hidden rounded-[28px] shadow-[14px_14px_0_var(--color-sun)]">
            <Image
              src={originPhoto}
              alt="Une jeune femme souriante devant son équipe"
              fill
              placeholder="blur"
              sizes="(min-width: 901px) 500px, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
