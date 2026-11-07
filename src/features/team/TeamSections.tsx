import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import heroPhoto from "@/assets/images/equipe/hero.jpg";
import { experts, founders, hasPlaceholderContent, volunteers, type Member } from "./data";
import { MemberCard } from "./MemberCard";

export function TeamHero() {
  return (
    <PageHero
      eyebrow="L’équipe WOP"
      title={
        <>
          Des femmes de vision au service d’autres <em>femmes.</em>
        </>
      }
      intro="WOP est portée par ses fondatrices et une équipe engagée, réunies par une même conviction."
      actions={
        <>
          <ButtonLink href="#fondatrices" variant="brown" arrow="↓">
            Rencontrer l’équipe
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost-dark" arrow={false}>
            Nous écrire
          </ButtonLink>
        </>
      }
      image={heroPhoto}
      imageAlt="Des jeunes femmes qui rient ensemble"
    />
  );
}

/** « Le mot de la présidente fondatrice ». */
export function PresidentWord() {
  return (
    <Section id="mot" className="pb-0">
      <Container>
        <Reveal as="figure" className="grid gap-3.5 rounded-[28px] bg-brown p-[clamp(24px,3vw,44px)] text-cream">
          <span className="font-display text-[max(0.82rem,13px)] leading-none font-semibold tracking-[0.16em] text-sun uppercase">
            Le mot de la présidente fondatrice
          </span>
          <blockquote className="max-w-[18em] font-display text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.04em]">
            WOP est née d’une envie simple : que chaque jeune femme sache qu’elle a sa place.
          </blockquote>
          <div className="grid max-w-[44rem] gap-3 text-[1.02rem] leading-[1.6] *:opacity-92">
            <p>
              En 2023, j’ai lancé WOP par la création de contenu. Je voulais montrer qu’une jeune femme peut oser,
              apprendre et avancer, même quand elle doute.
            </p>
            <p>
              Elseline et Serena m’ont rejointe. À trois, le projet a pris de l’ampleur : d’un projet de contenu, WOP est
              devenu une mission au service des jeunes femmes, pour les faire passer du potentiel à l’action.
            </p>
            <p>
              En décembre 2025, WOP est devenue une association. Aujourd’hui, nous équipons, inspirons et connectons
              celles qui feront demain.
            </p>
          </div>
          <figcaption className="mt-2 flex items-center gap-3.5 font-display font-semibold">
            <span className="relative size-[52px] flex-none overflow-hidden rounded-full bg-sun">
              <Image src={founders[0].photo} alt={founders[0].name} fill sizes="52px" className="object-cover object-[50%_15%]" />
            </span>
            <span>
              <b className="block text-base leading-[1.2] font-semibold">{founders[0].name}</b>
              <em className="text-[0.85rem] not-italic opacity-85">{founders[0].role}</em>
            </span>
          </figcaption>
        </Reveal>
      </Container>
    </Section>
  );
}

function GroupTitle({ id, first = false, children }: { id: string; first?: boolean; children: ReactNode }) {
  return (
    <p
      id={id}
      className={`mb-5 border-t border-brown/15 pt-[18px] font-display text-[0.82rem] leading-none font-bold tracking-[0.2em] uppercase ${
        first ? "mt-[clamp(28px,5vh,48px)]" : "mt-[clamp(40px,7vh,72px)]"
      }`}
    >
      {children}
    </p>
  );
}

function TeamGrid({ members, className = "" }: { members: Member[]; className?: string }) {
  return (
    <div className={`grid gap-[clamp(14px,2vw,28px)] min-[901px]:grid-cols-3 ${className}`}>
      {members.map((member, i) => (
        <MemberCard key={member.name} member={member} index={i} />
      ))}
    </div>
  );
}

/** « Rencontre l'équipe » : fondatrices, V-WOP et expert·es. */
export function TeamMembers() {
  return (
    <Section id="fondatrices">
      <Container>
        <SectionHeader
          eyebrow="Rencontre l’équipe"
          title="Les personnes qui font avancer WOP."
          lead="Les V-WOP (Volontaires WOP), réunies par la même mission."
        />
        <GroupTitle id="v-wop" first>
          Les V-WOP
        </GroupTitle>
        <TeamGrid members={founders} />
        <TeamGrid members={volunteers} className="mt-[clamp(14px,2vw,28px)]" />

        <GroupTitle id="experts">Les expert·es</GroupTitle>
        <p className="-mt-1 mb-[22px] max-w-[42rem] text-[1.05rem] opacity-90">
          Deux experts ont déjà accompagné la communauté, chacun au sein d’un programme, en partageant leur parcours.
          D’autres voix viendront.
        </p>
        <TeamGrid members={experts} />

        {hasPlaceholderContent && (
          <p className="mt-8 text-[max(0.82rem,13px)] opacity-70">
            Mot provisoire, à remplacer par les mots de Néty. Photos des V-WOP provisoires (banque d’images), noms de
            famille, rôles et liens LinkedIn à renseigner avec l’équipe.
          </p>
        )}
      </Container>
    </Section>
  );
}

/** Appel final : s'engager avec WOP. */
export function TeamCta() {
  return (
    <CtaBanner title="Tu veux t’engager avec nous ?">
      <ButtonLink href="/contact" variant="cream">
        Nous contacter
      </ButtonLink>
      <ButtonLink href="/soutenir" variant="line-light" arrow={false}>
        Agir à nos côtés
      </ButtonLink>
    </CtaBanner>
  );
}
