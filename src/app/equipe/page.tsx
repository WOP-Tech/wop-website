import type { Metadata } from "next";
import { PresidentWord, TeamCta, TeamHero, TeamMembers } from "@/features/team/TeamSections";

export const metadata: Metadata = {
  title: "L’équipe WOP",
  description:
    "Le mot de la présidente fondatrice et les fondatrices de Woman of Power : Néty Behoundja, Elseline Zonon et Serena Noudedji.",
};

export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <PresidentWord />
      <TeamMembers />
      <TeamCta />
    </>
  );
}
