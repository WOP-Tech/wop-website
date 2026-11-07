import { HomeAbout } from "@/features/home/HomeAbout";
import { HomeHero } from "@/features/home/HomeHero";
import { HomeKpis } from "@/features/home/HomeKpis";
import { HomePillars } from "@/features/home/HomePillars";
import { HomeWords } from "@/features/home/HomeWords";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeKpis />
      <HomeAbout />
      <HomePillars />
      <HomeWords />
    </>
  );
}
