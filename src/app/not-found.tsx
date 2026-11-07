import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page introuvable",
};

/** Page 404, dans la charte des hauts de page intérieurs. */
export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center pt-[clamp(104px,14vh,150px)] pb-[clamp(40px,7vh,84px)]">
      <Container className="w-full">
        <p className="eyebrow anim:animate-rise">Erreur 404</p>
        <h1
          style={{ animationDelay: "0.08s" }}
          className="max-w-[16em] font-display text-[clamp(1.72rem,3.43vw,3.28rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance anim:animate-rise"
        >
          Cette page s’est <em className="text-coral-ink not-italic">égarée.</em>
        </h1>
        <p
          style={{ animationDelay: "0.16s" }}
          className="mt-[clamp(24px,4vh,40px)] max-w-[34rem] text-[clamp(1rem,1.15vw,1.1rem)] anim:animate-rise"
        >
          Le lien est peut-être incorrect, ou la page a été déplacée. Reprenons depuis l’accueil.
        </p>
        <div style={{ animationDelay: "0.24s" }} className="mt-[clamp(24px,4vh,40px)] flex flex-wrap gap-3 anim:animate-rise">
          <ButtonLink href="/" variant="brown">
            Revenir à l’accueil
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost-dark" arrow={false}>
            Nous contacter
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
