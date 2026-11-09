import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SocialGlyph, SocialLinkItem } from "@/components/ui/SocialIcon";
import { site, socialLinks } from "@/data/site";
import { ContactForm } from "./ContactForm";

export function ContactHero() {
  return (
    <PageHero
      eyebrow="Nous contacter"
      title={
        <>
          Parlons de ce que nous pouvons <em>construire ensemble.</em>
        </>
      }
      intro="Une question, une idée, une envie de collaborer ? L’équipe WOP est à l’écoute."
    />
  );
}

/** Formulaire de contact. */
export function ContactFormSection() {
  return (
    <Section id="formulaire">
      <Container className="grid items-start gap-[clamp(28px,5vw,80px)] min-[901px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <SectionHeader
          eyebrow="Formulaire de contact"
          title="Un message, une réponse."
          lead="Préciser l’objet de la demande permet qu’elle arrive à la bonne personne."
        />
        <ContactForm />
      </Container>
    </Section>
  );
}

/** Bloc « Par e-mail ». */
export function ContactEmail() {
  return (
    <Section id="mail">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 rounded-[30px] bg-brown p-[clamp(24px,3vw,44px)] text-cream">
          <div>
            <p className="eyebrow text-sun">Par e-mail</p>
            <p className="max-w-[20rem] font-display text-[clamp(1.2rem,1.8vw,1.6rem)] leading-[1.2] font-semibold tracking-[-0.025em]">
              Pour toute question, proposition de collaboration ou demande d’information, l’équipe WOP vous répond avec
              plaisir.
            </p>
          </div>
          <div className="grid justify-items-start gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-block border-b-2 border-sun pt-[9px] pb-1 font-display text-[clamp(1.15rem,1.9vw,1.7rem)] leading-[1.05] font-semibold tracking-[-0.04em] [overflow-wrap:anywhere] text-cream select-all hover:text-sun"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** « Réseaux sociaux ». */
export function ContactSocials() {
  const pending = socialLinks.some((link) => !link.href);

  return (
    <Section id="reseaux">
      <Container>
        <SectionHeader
          eyebrow="Réseaux sociaux"
          title="Retrouvez WOP en ligne."
          lead="Suivez l’actualité de la communauté, ses rencontres et ses programmes."
        />
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <Reveal key={link.label} className="inline-flex">
              <SocialLinkItem
                link={link}
                className="inline-flex min-h-[52px] items-center gap-3 rounded-full border-[1.5px] border-brown pr-6 pl-[18px] font-display text-base leading-none font-semibold text-brown"
                activeClassName="hover:-translate-y-[3px] hover:bg-brown hover:text-cream focus-visible:bg-brown focus-visible:text-cream"
              >
                <SocialGlyph network={link.label} className="size-[22px]" />
                <span>{link.label}</span>
              </SocialLinkItem>
            </Reveal>
          ))}
        </div>
        {pending && <p className="mt-[18px] text-[max(0.82rem,13px)] opacity-70">Liens des réseaux de WOP à renseigner.</p>}
      </Container>
    </Section>
  );
}
