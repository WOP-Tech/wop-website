import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { programs } from "@/features/programs/data";

/** « La vision en action » : les trois programmes, en lignes qui s'éclairent au survol. */
export function DiscoverPrograms() {
  return (
    <section id="programmes-wop" className="pt-[clamp(28.8px,5.76vh,69.12px)] pb-[clamp(56px,10vh,110px)]">
      <Container className="grid items-start gap-[clamp(28px,5vw,80px)] min-[901px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="min-[901px]:sticky min-[901px]:top-[110px] motion-reduce:static">
          <p className="eyebrow">La vision en action</p>
          <Reveal as="h2" className="heading-section">
            Des programmes pensés pour un changement concret.
          </Reveal>
          <Reveal as="p" className="mt-5 max-w-[32rem] text-[1.05rem]">
            Programmes de leadership, parcours de transformation, clubs de croissance et initiatives à fort impact : les
            trois piliers deviennent des expériences accessibles, structurées et tournées vers l’action, dispensées par
            des experts.
          </Reveal>
        </div>

        <div className="border-b-[1.5px] border-brown/15">
          {programs.map((program, i) => (
            <Link
              key={program.slug}
              href="/devenir-woper#programmes"
              className="group grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-x-[18px] gap-y-1.5 border-t-[1.5px] border-brown/15 px-2.5 py-[26px] transition-[background-color,padding] duration-300 hover:bg-coral/18 hover:px-6"
            >
              <span className="col-start-1 row-start-1 font-display text-base leading-none font-semibold tracking-[0.14em] text-coral-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-start-2 row-start-1">
                <em className="mb-1.5 inline-block rounded-full bg-sun/40 px-3 py-[5px] font-display text-[max(0.82rem,13px)] leading-none font-semibold tracking-[0.12em] uppercase not-italic">
                  {program.theme}
                </em>
                <b className="block font-display text-[clamp(1.3rem,2.2vw,1.9rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
                  {program.name}
                </b>
              </span>
              <span className="col-start-2 row-start-2 max-w-[32rem] text-[0.98rem]">{program.description}</span>
              <span
                aria-hidden="true"
                className="col-start-3 row-span-2 row-start-1 grid size-11 place-items-center rounded-full bg-sun font-display text-base leading-none font-bold text-brown transition-[background-color,color,translate] duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:bg-brown group-hover:text-sun"
              >
                ↗
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
