import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonArrow, ButtonLink, buttonClasses } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SocialGlyph, SocialLinkItem } from "@/components/ui/SocialIcon";
import { donationHref, shareLinks } from "@/data/site";
import heroPhoto from "@/assets/images/soutenir/hero.jpg";
import { faqs, reports, showWorkNotes, type Report } from "./data";

function WorkNote({ children }: { children: ReactNode }) {
  if (!showWorkNotes) return null;
  return <p className="mt-[18px] text-[max(0.82rem,13px)] opacity-70">{children}</p>;
}

export function SupportHero() {
  return (
    <PageHero
      eyebrow="Soutenir WOP"
      title={
        <>
          Chaque soutien équipe une <em>femme</em> de plus.
        </>
      }
      intro="Votre soutien permet à WOP d’offrir ses programmes à plus de jeunes femmes, dans plus de pays."
      actions={
        <>
          <ButtonLink href="#facons" variant="brown">
            Faire un don
          </ButtonLink>
          <ButtonLink href="#facons" variant="ghost-dark" arrow={false}>
            Autres façons d’aider
          </ButtonLink>
        </>
      }
      image={heroPhoto}
      imageAlt="Des jeunes femmes de la communauté WOP"
    />
  );
}

type WayTone = "brown" | "coral" | "cream";

const wayTones: Record<WayTone, { card: string; number: string }> = {
  brown: { card: "border-brown bg-brown text-cream", number: "text-sun" },
  coral: {
    card: "border-transparent bg-[linear-gradient(135deg,var(--color-coral)_0%,var(--color-salmon)_100%)] text-cream [text-shadow:0_1px_10px_rgba(105,65,44,0.3)]",
    number: "text-cream",
  },
  cream: { card: "border-brown bg-cream text-brown", number: "text-coral" },
};

function WayCard({
  index,
  tone,
  title,
  text,
  action,
  delay = 0,
}: {
  index: number;
  tone: WayTone;
  title: string;
  text: string;
  action: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`grid items-center gap-[clamp(12px,2vw,28px)] rounded-[24px] border-[1.5px] px-[clamp(18px,2.4vw,34px)] py-[clamp(18px,2vw,26px)] min-[901px]:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(11rem,max-content)] ${wayTones[tone].card}`}
    >
      <span className={`font-display text-[0.8rem] leading-none font-semibold tracking-[0.16em] ${wayTones[tone].number}`}>
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="font-display text-[clamp(1.3rem,2vw,1.75rem)] leading-[1.05] font-semibold tracking-[-0.035em]">{title}</h3>
      <p className="text-[0.95rem]">{text}</p>
      <div className="justify-self-start min-[901px]:justify-self-end">{action}</div>
    </Reveal>
  );
}

/** « Comment soutenir » : quatre façons d'agir. */
export function SupportWays() {
  return (
    <Section id="facons">
      <Container>
        <SectionHeader eyebrow="Comment soutenir" title="Quatre façons d’agir avec nous." />
        <div className="grid gap-3">
          <WayCard
            index={1}
            tone="brown"
            title="Faire un don"
            text="Financez les programmes qui équipent les jeunes femmes."
            action={
              <ButtonLink href={donationHref} variant="cream" size="card" className="whitespace-nowrap">
                Donner
              </ButtonLink>
            }
          />
          <WayCard
            index={2}
            tone="coral"
            delay={0.08}
            title="Devenir partenaire"
            text="Associez votre organisation à une mission qui démultiplie l’impact des femmes."
            action={
              <ButtonLink href="/contact" variant="cream" size="card" className="whitespace-nowrap">
                Nous écrire
              </ButtonLink>
            }
          />
          <WayCard
            index={3}
            tone="cream"
            title="Partager bénévolement votre expertise"
            text="Intervenez auprès de la communauté et transmettez ce que vous savez."
            action={
              <ButtonLink href="/contact" variant="brown" size="card" className="whitespace-nowrap">
                Contacter WOP
              </ButtonLink>
            }
          />
          <WayCard
            index={4}
            tone="cream"
            delay={0.08}
            title="Faire connaître WOP"
            text="Parlez de WOP autour de vous : chaque partage peut atteindre une femme qui en a besoin."
            action={
              <div className="flex gap-2.5">
                {shareLinks.map((link) => (
                  <SocialLinkItem
                    key={link.label}
                    link={link}
                    iconOnly
                    className="grid size-[46px] place-items-center rounded-full border-[1.5px] border-current text-brown"
                    activeClassName="transition-[background-color,color,translate] duration-250 hover:-translate-y-[3px] hover:bg-brown hover:text-cream focus-visible:bg-brown focus-visible:text-cream"
                  >
                    <SocialGlyph network={link.label} className="size-[22px]" />
                  </SocialLinkItem>
                ))}
              </div>
            }
          />
        </div>
        <WorkNote>Modalités de don (plateforme, virement) à renseigner par l’équipe WOP.</WorkNote>
      </Container>
    </Section>
  );
}

const reportTones: Record<Report["tone"], { card: string; number: string; button: "cream" | "brown" }> = {
  brown: { card: "bg-brown text-cream", number: "text-sun", button: "cream" },
  cream: { card: "border-[1.5px] border-brown bg-cream text-brown", number: "text-coral", button: "brown" },
};

/** Bouton « Télécharger le bilan » ; désactivé tant que le PDF n'est pas publié. */
function ReportButton({ report }: { report: Report }) {
  const variant = reportTones[report.tone].button;
  const className = "mt-auto self-start";
  if (!report.file) {
    return (
      <span aria-disabled="true" title="Document bientôt disponible" className={`${buttonClasses(variant, className)} pointer-events-none opacity-50`}>
        Télécharger le bilan <ButtonArrow variant={variant} />
        <span className="sr-only"> (bientôt disponible)</span>
      </span>
    );
  }
  return (
    <a href={report.file} download className={buttonClasses(variant, className)}>
      Télécharger le bilan <ButtonArrow variant={variant} />
      <span className="sr-only"> (PDF)</span>
    </a>
  );
}

/** « Ce que votre soutien rend possible » : bilans d'activité et financier. */
export function SupportTransparency() {
  return (
    <Section id="transparence">
      <Container>
        <SectionHeader
          title="Ce que votre soutien rend possible."
          lead="WOP rend compte de ce qu’elle réalise et de la manière dont ses ressources sont utilisées."
        />
        <div className="grid gap-[clamp(14px,2vw,28px)] min-[901px]:grid-cols-2">
          {reports.map((report, i) => (
            <Reveal
              as="article"
              key={report.title}
              delay={i * 0.1}
              className={`flex flex-col gap-3.5 rounded-[32px] p-[clamp(24px,3.2vw,44px)] ${reportTones[report.tone].card}`}
            >
              <span className={`font-display text-[0.82rem] leading-none font-bold tracking-[0.2em] ${reportTones[report.tone].number}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
                {report.title}
              </h3>
              <p className="mt-2 mb-[22px] max-w-[24em] text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.4]">{report.text}</p>
              <ReportButton report={report} />
            </Reveal>
          ))}
        </div>
        <WorkNote>Bilans d’activité et financier (PDF) à ajouter par l’équipe WOP avant publication.</WorkNote>
      </Container>
    </Section>
  );
}

/** « Questions fréquentes » : accordéon natif (`<details>`), la première question ouverte. */
export function SupportFaq() {
  return (
    <Section id="faq">
      <Container className="grid items-start gap-[clamp(28px,5vw,80px)] min-[901px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <SectionHeader
          eyebrow="Questions fréquentes"
          title="Tout savoir pour soutenir WOP."
          lead="Une question qui n’est pas ici ? Écrivez-nous, nous vous répondons."
        >
          <Reveal className="mt-[18px]">
            <ButtonLink href="/contact" variant="ghost-dark" arrow={false}>
              Poser ma question
            </ButtonLink>
          </Reveal>
        </SectionHeader>
        <Reveal className="border-t-[1.5px] border-brown/15">
          {faqs.map((faq, i) => (
            <details key={faq.question} open={i === 0} className="group/faq border-b-[1.5px] border-brown/15 py-4">
              <summary className="flex cursor-pointer list-none justify-between gap-4 py-3 font-display text-[1.15rem] leading-[1.2] font-semibold tracking-[-0.02em] after:text-[1.4rem] after:leading-none after:text-coral after:content-['+'] group-open/faq:after:content-['–'] [&::-webkit-details-marker]:hidden">
                {faq.question}
              </summary>
              <p className="mt-2.5 max-w-[36rem]">{faq.answer}</p>
            </details>
          ))}
        </Reveal>
      </Container>
      <Container>
        <WorkNote>Format à valider : questions et réponses d’exemple, à confirmer avec l’équipe WOP.</WorkNote>
      </Container>
    </Section>
  );
}

export function SupportCta() {
  return (
    <CtaBanner title="Prêt·e à faire partie de la vision ?">
      <ButtonLink href="/contact" variant="cream">
        Nous contacter
      </ButtonLink>
      <ButtonLink href="/devenir-woper" variant="line-light" arrow={false}>
        Devenir Woper
      </ButtonLink>
    </CtaBanner>
  );
}
