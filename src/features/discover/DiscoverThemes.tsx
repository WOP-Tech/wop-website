import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { themes } from "./data";

/** « Ce que nous travaillons » : les sept thèmes, en liste numérotée sur deux colonnes. */
export function DiscoverThemes() {
  return (
    <section id="actions" className="py-[clamp(40.32px,7.2vh,79.2px)]">
      <Container className="grid items-start gap-[clamp(28px,5vw,80px)] min-[901px]:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <div className="min-[901px]:sticky min-[901px]:top-[120px] motion-reduce:static">
          <p className="eyebrow">Ce que nous travaillons</p>
          <Reveal as="h2" className="heading-section">
            Sept thèmes pour avancer, un même élan.
          </Reveal>
        </div>
        <ol className="grid gap-x-[clamp(20px,3vw,48px)] border-b-[1.5px] border-brown/15 min-[901px]:grid-cols-2">
          {themes.map((theme, i) => (
            <Reveal
              as="li"
              key={theme}
              delay={i % 2 ? 0.1 : 0}
              className="flex items-baseline gap-4 border-t-[1.5px] border-brown/15 px-1.5 py-[clamp(20px,3.2vh,30px)] hover:bg-coral/18 hover:pl-[18px]"
            >
              <span className="min-w-[2em] flex-none font-display text-[0.85rem] leading-none font-semibold tracking-[0.14em] text-coral">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
                {theme}
              </span>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
