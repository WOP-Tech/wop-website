import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import heroPhoto from "@/assets/images/decouvrir/hero.jpg";

export function DiscoverHero() {
  return (
    <PageHero
      spacing="story"
      eyebrow="Découvrir Woman of Power"
      title={
        <>
          Une vision pour révéler les femmes qui transformeront <em>demain.</em>
        </>
      }
      intro="Woman Of Power est une organisation internationale à impact, engagée dans l’émergence d’une nouvelle génération de femmes leaders responsables, inspirantes et impactantes."
      actions={
        <>
          <ButtonLink href="#origine" variant="brown" arrow="↓">
            Comprendre notre histoire
          </ButtonLink>
          <ButtonLink href="/devenir-woper" variant="ghost-dark" arrow={false}>
            Rejoindre la communauté
          </ButtonLink>
        </>
      }
      image={heroPhoto}
      imageAlt="Quatre jeunes femmes qui rient ensemble"
      imagePosition="50% 30%"
      overlay={
        <figure className="absolute -bottom-12 -left-[14%] w-[min(78%,300px)] rounded-[22px] bg-cream px-[22px] py-5 shadow-[0_18px_40px_rgba(105,65,44,0.18)]">
          <blockquote className="font-display text-[1.25rem] leading-[1.15] font-semibold tracking-[-0.03em]">
            Équiper une femme, c’est impacter une nation.
          </blockquote>
          <figcaption className="mt-3 font-display text-[0.72rem] leading-none font-semibold tracking-[0.16em] text-coral uppercase">
            Notre conviction
          </figcaption>
        </figure>
      }
    />
  );
}
