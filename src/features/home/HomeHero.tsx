import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import heroPhoto from "@/assets/images/accueil/hero.jpg";

const scriptWord = "font-script font-bold not-italic text-[1.05em] leading-[0.8]";
const bigLine =
  "flex items-baseline gap-[0.18em] whitespace-nowrap font-display font-bold uppercase tracking-[-0.025em] text-[clamp(1.7rem,8vw,3rem)] tab:text-[clamp(2rem,4.6vw,4.5rem)]";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[max(100vh,820px)] items-end justify-center overflow-hidden bg-brown pt-[clamp(96px,14vh,140px)] pb-[clamp(64px,10vh,110px)] text-cream">
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={heroPhoto}
          alt=""
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[50%_0]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(105,65,44,0.3)_0%,rgba(105,65,44,0.1)_30%,rgba(105,65,44,0.55)_58%,rgba(105,65,44,0.88)_100%)]" />
      </div>

      <div className="relative z-10 flex w-[min(1040px,calc(100%-48px))] flex-col items-start gap-[clamp(12px,2vh,22px)]">
        <h1 className="flex flex-col items-start leading-[0.92] [text-shadow:0_2px_24px_rgba(60,35,22,0.35)]">
          <span className="font-script text-[clamp(2.4rem,5vw,4.7rem)] leading-[0.8] font-bold">Une organisation</span>
          <span className={`${bigLine} tab:ml-[12%]`}>au service</span>
          <span className={`${bigLine} tab:ml-[2%]`}>
            <i className={scriptWord}>du</i> leadership
          </span>
          <span className={`${bigLine} tab:ml-[8%]`}>
            <i className={scriptWord}>des</i> jeunes femmes.
          </span>
        </h1>
        <p className="mt-1.5 max-w-[34em] font-display text-[clamp(0.78rem,1vw,0.92rem)] leading-[1.7] font-semibold tracking-[0.14em] uppercase tab:ml-[12%]">
          Woman of Power équipe, inspire et connecte une nouvelle génération de femmes leaders.
        </p>
        <div className="mt-[clamp(24px,4vh,40px)] flex flex-wrap gap-3 tab:ml-[12%]">
          <ButtonLink href="/devenir-woper" variant="coral">
            Devenir Woper
          </ButtonLink>
          <ButtonLink href="/soutenir" variant="ghost-light">
            Soutenir WOP
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
