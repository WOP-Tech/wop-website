import type { Metadata } from "next";
import {
  SupportCta,
  SupportFaq,
  SupportHero,
  SupportTransparency,
  SupportWays,
} from "@/features/support/SupportSections";

export const metadata: Metadata = {
  title: "Soutenir WOP",
  description:
    "Faire un don, devenir partenaire, partager son expertise ou faire connaître Woman of Power : toutes les façons de soutenir.",
};

export default function SupportPage() {
  return (
    <>
      <SupportHero />
      <SupportWays />
      <SupportTransparency />
      <SupportFaq />
      <SupportCta />
    </>
  );
}
