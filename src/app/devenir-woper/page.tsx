import type { Metadata } from "next";
import { BecomeHero } from "@/features/become-woper/BecomeHero";
import {
  BecomeApply,
  BecomeDefinition,
  BecomeEligibility,
  BecomePrograms,
  BecomeSteps,
  BecomeTestimonials,
} from "@/features/become-woper/BecomeSections";

export const metadata: Metadata = {
  title: "Devenir Woper",
  description:
    "Révèle la leader en toi : découvre les critères, le parcours de candidature et les programmes pour devenir Woper.",
};

export default function BecomeWoperPage() {
  return (
    <>
      <BecomeHero />
      <BecomeDefinition />
      <BecomeEligibility />
      <BecomeSteps />
      <BecomePrograms />
      <BecomeTestimonials />
      <BecomeApply />
    </>
  );
}
