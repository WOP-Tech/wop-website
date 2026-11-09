import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { applicationHref } from "@/data/site";
import { programs } from "@/features/programs/data";
import { TestimonialsGrid } from "@/features/testimonials/TestimonialsGrid";
import { steps } from "./data";
import { EligibilityChecklist } from "./EligibilityChecklist";

/** Mention « à valider » sous la liste des critères : à retirer une fois les critères confirmés par l'équipe. */
const criteriaToConfirm = true;

const splitGrid = "grid items-start gap-[clamp(28px,5vw,80px)] min-[901px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]";

/** « Qu'est-ce qu'une Woper ? » */
export function BecomeDefinition() {
  return (
    <Section id="woper">
      <Container className="grid items-start gap-[clamp(28px,5vw,80px)] min-[901px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <p className="eyebrow">Qu’est-ce qu’une Woper ?</p>
          <h2 className="max-w-[11em] font-display text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.1] font-semibold tracking-[-0.04em]">
            Une femme qui décide de <em className="text-coral not-italic">prendre sa place.</em>
          </h2>
        </Reveal>
        <div className="grid gap-[18px] text-[1.1rem]">
          <Reveal as="p" className="max-w-[34rem]">
            Une Woper est une jeune femme engagée dans son propre développement : elle suit un programme WOP, s’implique
            dans la communauté et met en pratique ce qu’elle apprend.
          </Reveal>
          <Reveal as="p" delay={0.08} className="max-w-[34rem]">
            Ce n’est pas un statut réservé à celles qui savent déjà. C’est un engagement : venir avec ses doutes,
            travailler sérieusement, contribuer aux autres.
          </Reveal>
          <Reveal delay={0.16} className="rounded-[22px] bg-brown p-[clamp(18px,2vw,26px)] text-base leading-normal text-cream">
            Devenir Woper est la seule porte d’entrée de l’écosystème, et elle ouvre tout : programmes, rencontres et
            mentorat.
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** « Suis-je concernée ? » : critères à cocher. */
export function BecomeEligibility() {
  return (
    <Section id="pour-toi">
      <Container className={splitGrid}>
        <SectionHeader
          eyebrow="Cette communauté est-elle faite pour toi ?"
          title="Suis-je concernée ?"
          lead="Quatre critères, aucun diplôme exigé. Aucun secteur ni niveau d’expérience n’est requis. Coche ce qui te correspond."
        >
          <Reveal
            as="p"
            className="mt-[18px] font-display text-[clamp(1.2rem,1.8vw,1.6rem)] leading-[1.2] font-semibold tracking-[-0.02em]"
          >
            Et la bonne nouvelle : c’est{" "}
            <b className="inline-block rounded-full bg-sun px-3.5 py-0.5 font-black">gratuit.</b>
          </Reveal>
        </SectionHeader>
        <EligibilityChecklist />
      </Container>
      {criteriaToConfirm && (
        <Container>
          <p className="mt-[18px] text-[max(0.82rem,13px)] opacity-70">Critères à valider avec l’équipe WOP.</p>
        </Container>
      )}
    </Section>
  );
}

/** « Le parcours » : quatre étapes numérotées. */
export function BecomeSteps() {
  return (
    <Section id="parcours">
      <Container>
        <SectionHeader eyebrow="Le parcours" title="Quatre étapes, et tu y es." />
        <ol className="grid max-w-[760px]">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.1}
              className="grid grid-cols-[clamp(56px,7vw,92px)_minmax(0,1fr)] gap-x-5 border-t-[1.5px] border-brown py-[22px] last:border-b-[1.5px]"
            >
              <span className="row-span-2 self-start font-display text-[clamp(2rem,3vw,2.8rem)] leading-none font-semibold tracking-[-0.05em] text-coral">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-start-2 mb-1.5 font-display text-[1.25rem] leading-[1.1] font-semibold tracking-[-0.03em]">
                {step.title}
              </h3>
              <p className="col-start-2 text-[0.95rem]">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/** « Les programmes » : liste compacte, nom / accroche / thème. */
export function BecomePrograms() {
  return (
    <Section id="programmes">
      <Container className={splitGrid}>
        <SectionHeader
          eyebrow="Les programmes"
          title="Choisis par où commencer."
          lead="Chaque programme répond à une envie précise. Une fois Woper, tu peux en suivre un, ou plusieurs."
        />
        <ul className="border-b-[1.5px] border-brown/15">
          {programs.map((program, i) => (
            <Reveal
              as="li"
              key={program.slug}
              delay={i * 0.08}
              className="grid items-center gap-[18px] border-t-[1.5px] border-brown/15 py-[18px] min-[901px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto]"
            >
              <h3 className="font-display text-[clamp(1.25rem,1.9vw,1.65rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
                {program.name}
              </h3>
              <p className="text-[0.95rem]">{program.pitch}</p>
              <span className="inline-block rounded-full border-[1.5px] border-brown bg-coral/18 px-3.5 py-[7px] font-display text-[max(0.82rem,13px)] leading-none font-semibold">
                {program.theme}
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** « Mots de Woper » : témoignages en grille. */
export function BecomeTestimonials() {
  return (
    <Section id="mots">
      <Container>
        <SectionHeader eyebrow="Mots de Woper" title="Elles ont hésité, exactement comme toi." />
        <TestimonialsGrid />
      </Container>
    </Section>
  );
}

/** Appel final à candidater. */
export function BecomeApply() {
  return (
    <Section id="rejoindre">
      <Container>
        <Reveal className="relative isolate grid items-end gap-[clamp(20px,3vw,48px)] overflow-hidden rounded-[32px] bg-brown p-[clamp(26px,3.4vw,52px)] text-cream min-[901px]:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <p className="max-w-[26em] font-display text-[clamp(1.2rem,1.9vw,1.6rem)] leading-[1.35] font-medium tracking-[-0.02em]">
            Ta candidature est l’occasion de te présenter, de partager ce qui te motive et les défis que tu souhaites
            relever avec WOP.
          </p>
          <div className="grid justify-items-start gap-3">
            <ButtonLink href={applicationHref} variant="cream">
              Candidater
            </ButtonLink>
            <p className="text-[0.9rem] opacity-85">Inscription rapide et 100 % gratuite</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
