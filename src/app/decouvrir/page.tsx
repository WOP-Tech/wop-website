import type { Metadata } from "next";
import { DiscoverHero } from "@/features/discover/DiscoverHero";
import { DiscoverJoin } from "@/features/discover/DiscoverJoin";
import { DiscoverOrigin } from "@/features/discover/DiscoverOrigin";
import { DiscoverPrograms } from "@/features/discover/DiscoverPrograms";
import { DiscoverThemes } from "@/features/discover/DiscoverThemes";
import { DiscoverTimeline } from "@/features/discover/DiscoverTimeline";
import { TestimonialsCarousel } from "@/features/testimonials/TestimonialsCarousel";

export const metadata: Metadata = {
  title: "Découvrir WOP",
  description:
    "Découvrir Woman of Power : l’histoire, la vision et les programmes de Woman of Power, organisation internationale à impact au service des jeunes femmes leaders.",
};

export default function DiscoverPage() {
  return (
    <>
      <DiscoverHero />
      <DiscoverOrigin />
      <DiscoverTimeline />
      <DiscoverPrograms />
      <DiscoverThemes />
      <TestimonialsCarousel title="Elles ont osé WOP et elles racontent." />
      <DiscoverJoin />
    </>
  );
}
