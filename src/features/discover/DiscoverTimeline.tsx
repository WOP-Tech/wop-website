import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TimelineRail } from "./TimelineRail";

const yearClass =
  "m-0 font-display leading-[0.95] font-semibold tracking-[-0.06em] [overflow-wrap:anywhere] text-[clamp(2.34rem,10.92vw,3.9rem)]";
const titleClass = "heading-section max-w-[14em] text-[clamp(1.48rem,2.81vw,2.57rem)]";
const paragraphClass = "mt-[22px] max-w-[34rem] text-[1.12rem]";

function Chapter({
  tone,
  year,
  tightRows = false,
  children,
}: {
  tone: "night" | "day";
  /** Colonne de gauche : l'année. */
  year: ReactNode;
  /** Pas d'espace vertical entre les lignes de la grille (chapitre 2026). */
  tightRows?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={`relative flex items-center py-[clamp(46.08px,7.92vh,86.4px)] min-[901px]:min-h-[min(92vh,820px)] ${
        tone === "night" ? "bg-brown text-cream" : "bg-cream text-brown"
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute top-[clamp(64px,11vh,120px)] left-(--rx) z-[3] -ml-2 size-4 rounded-full border-[3px] border-coral bg-sun"
      />
      <div className={`relative z-[1] grid w-full items-start gap-2.5 pr-[clamp(16px,6vw,96px)] pl-[calc(var(--rx)+clamp(32px,5vw,72px))] min-[901px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[901px]:gap-[clamp(24px,5vw,80px)] ${
          tightRows ? "gap-y-0 min-[901px]:gap-y-0" : ""
        }`}>
        {year}
        {children}
      </div>
    </article>
  );
}

/** L'histoire de WOP, de 2023 à 2035, le long d'une frise qui se remplit au défilement. */
export function DiscoverTimeline() {
  return (
    <section
      id="origine"
      aria-label="L'histoire de WOP, d'hier à 2035"
      className="relative overflow-hidden [--rx:clamp(18px,5vw,84px)]"
    >
      <TimelineRail />

      <Chapter
        tone="night"
        year={
          <p aria-hidden="true" className={`${yearClass} min-[901px]:text-[clamp(2.5rem,5.62vw,5.46rem)]`}>
            2023
          </p>
        }
      >
        <div>
          <p className="eyebrow mb-4 text-sun">2023 · Le début</p>
          <h2 className={titleClass}>Tout commence par du contenu.</h2>
          <p className={paragraphClass}>En 2023, Néty lance WOP par la création de contenu.</p>
          <p className={paragraphClass}>
            Elseline et Serena la rejoignent. À trois, le projet prend de l’ampleur et la vision évolue : d’un projet de
            contenu, WOP devient une mission au service des jeunes femmes, pour les faire passer du potentiel à
            l’action.
          </p>
        </div>
      </Chapter>

      <Chapter
        tone="day"
        year={
          <div aria-hidden="true">
            <p className={`${yearClass} min-[901px]:text-[clamp(2.5rem,5.62vw,5.46rem)]`}>2025</p>
            <span className="mt-4 inline-block rounded-full bg-brown px-[18px] py-2.5 font-display text-[0.8rem] leading-none font-semibold tracking-[0.16em] text-cream uppercase">
              Décembre
            </span>
          </div>
        }
      >
        <div>
          <p className="eyebrow mb-4">Une étape officielle</p>
          <h2 className={titleClass}>WOP devient une association.</h2>
          <p className={paragraphClass}>
            Active depuis 2023, WOP franchit un cap en décembre 2025 et devient officiellement une association : un
            cadre solide pour porter sa mission dans la durée.
          </p>
        </div>
      </Chapter>

      <Chapter
        tone="day"
        tightRows
        year={
          <p aria-hidden="true" className={`${yearClass} min-[901px]:text-[clamp(2.5rem,5.62vw,5.46rem)]`}>
            2026
          </p>
        }
      >
        <div>
          <p className="eyebrow mb-4">Une année de programmes</p>
          <h2 className={titleClass}>Des programmes pour lever ce qui freine les femmes.</h2>
          <p className={paragraphClass}>
            En 2026, de nombreux programmes voient le jour, avec un même but : trouver des solutions aux obstacles qui
            empêchent les femmes de prendre leur place.
          </p>
        </div>
        <Reveal
          as="p"
          className="col-span-full mt-[clamp(24px,4vh,44px)] max-w-[34em] font-display text-[clamp(1.3rem,2.5vw,2.25rem)] leading-[1.28] font-semibold tracking-[-0.03em] min-[901px]:col-start-2 min-[901px]:mt-[clamp(16px,3vh,28px)] min-[901px]:max-w-none min-[901px]:font-sans min-[901px]:text-[1.1rem] min-[901px]:leading-[1.6] min-[901px]:font-normal min-[901px]:tracking-normal"
        >
          Plus de 100 jeunes femmes ont déjà vécu la transformation WOP, dans 5 pays : la France, le Bénin, le Togo, le
          Sénégal et le Burkina Faso. 3 programmes leur sont offerts, enrichis par la parole de 2 experts venus
          partager leur parcours.
        </Reveal>
      </Chapter>

      <Chapter
        tone="day"
        year={
          <p
            aria-hidden="true"
            className={`${yearClass} min-[901px]:text-[clamp(3.43rem,8.97vw,8.58rem)]`}
          >
            2035
          </p>
        }
      >
        <div>
          <h2 className={titleClass}>Un monde où chaque femme éclaire celles qui viennent après elle.</h2>
          <p className={paragraphClass}>
            En 2035, une génération de femmes leaders, confiantes et engagées, aura transformé durablement ses
            communautés et ses nations, et ouvert la voie à d’autres.
          </p>
          <p className="mt-6 mb-[26px] font-display text-[1.3rem] leading-[1.2] font-semibold tracking-[-0.02em]">
            Équiper une femme, c’est impacter une nation.
          </p>
          <ButtonLink href="/devenir-woper" variant="brown">
            Faire partie de cette vision
          </ButtonLink>
        </div>
      </Chapter>
    </section>
  );
}
