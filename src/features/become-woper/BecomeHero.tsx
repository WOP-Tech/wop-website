import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { applicationHref } from "@/data/site";
import heroPhoto from "@/assets/images/devenir-woper/hero.jpg";

export function BecomeHero() {
  return (
    <PageHero
      eyebrow="Devenir Woper"
      title={
        <>
          Révèle la <em>leader en toi.</em>
        </>
      }
      intro="Rejoins une communauté qui t’aide à révéler ton potentiel, développer ton leadership et porter ta vision avec audace."
      actions={
        <>
          <ButtonLink href={applicationHref} variant="apply">
            Candidater
          </ButtonLink>
          <ButtonLink href="#parcours" variant="ghost-dark" arrow={false}>
            Voir le parcours de candidature
          </ButtonLink>
          <p className="mt-1.5 flex basis-full items-center gap-2 font-display text-[0.9rem] leading-none font-semibold">
            <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-sun text-[0.7rem]">
              ✓
            </span>
            Inscription rapide et 100 % gratuite
          </p>
        </>
      }
      image={heroPhoto}
      imageAlt="Une jeune femme souriante"
    />
  );
}
