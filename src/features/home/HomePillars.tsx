import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { pillars } from "./data";

/** « Que faisons-nous ? » : les trois piliers en arches qui s'élargissent au survol. */
export function HomePillars() {
  return (
    <section id="piliers" className="py-[clamp(40.32px,7.2vh,79.2px)]">
      <Container>
        <div className="mb-[clamp(36px,6vh,64px)] flex flex-wrap items-end justify-between gap-x-14 gap-y-5">
          <div className="max-w-[26em]">
            <p className="eyebrow">Que faisons-nous ?</p>
            <Reveal
              as="h2"
              className="heading-section"
            >
              Trois piliers pour révéler des femmes de vision.
            </Reveal>
          </div>
          <Reveal as="p" className="max-w-[32rem] text-[1.05rem]">
            WOP mène les jeunes femmes de la prise de conscience à l’action, grâce à une approche humaine et structurée.
          </Reveal>
        </div>

        <div className="mt-[clamp(8px,2vw,28px)] flex flex-col items-start gap-[clamp(12px,1.6vw,22px)] tab:flex-row">
          {pillars.map((pillar, i) => (
            <Reveal
              as="article"
              key={pillar.number}
              delay={i * 0.12}
              tabIndex={0}
              className={`group relative h-[440px] w-full min-w-0 flex-none overflow-hidden rounded-[200px_200px_24px_24px] text-cream outline-offset-4 tab:h-[clamp(470px,40vw,560px)] tab:w-auto tab:flex-[1_1_0] tab:rounded-[999px_999px_28px_28px] tab:hover:grow-[1.35] tab:focus-visible:grow-[1.35] ${pillar.className}`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-[clamp(60px,7vw,100px)] z-[2] text-center font-display text-[clamp(5rem,10vw,9rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_var(--color-cream)]"
              >
                {pillar.number}
              </span>
              <Image
                src={pillar.image}
                alt=""
                sizes="(min-width: 860px) 34vw, 100vw"
                className={`absolute left-0 w-full transition-transform duration-600 ease-out group-hover:scale-[1.04] motion-reduce:transition-none ${
                  pillar.imageKind === "cutout"
                    ? "bottom-0 h-[76%] object-contain object-bottom"
                    : "inset-0 h-full object-cover"
                }`}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(105,65,44,0)_38%,rgba(105,65,44,0.88)_78%,rgba(105,65,44,0.94)_100%)]"
              />
              <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col gap-1.5 px-[clamp(18px,2vw,30px)] pb-[clamp(22px,2.4vw,32px)]">
                <h3 className="font-display text-[clamp(1.9rem,3vw,2.9rem)] leading-none font-bold tracking-[-0.025em] uppercase">
                  {pillar.title}
                </h3>
                <strong className="font-display text-base leading-[1.3] font-semibold text-sun">{pillar.lead}</strong>
                <p className="text-[0.92rem] leading-normal">{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
