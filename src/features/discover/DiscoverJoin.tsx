import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { joinPaths, type JoinPath } from "./data";

const tones: Record<JoinPath["tone"], { card: string; button: "cream" | "brown" }> = {
  brown: { card: "bg-brown text-cream", button: "cream" },
  coral: {
    card: "bg-[linear-gradient(135deg,var(--color-coral)_0%,var(--color-salmon)_100%)] text-cream [text-shadow:0_1px_10px_rgba(105,65,44,0.3)]",
    button: "cream",
  },
  cream: { card: "border-2 border-brown bg-cream text-brown shadow-[8px_8px_0_var(--color-sun)]", button: "brown" },
};

/** « Prendre part à la vision » : trois façons de s'engager. */
export function DiscoverJoin() {
  return (
    <section id="rejoindre" className="pt-[clamp(40.32px,7.2vh,79.2px)] pb-[clamp(40px,7vh,80px)]">
      <Container>
        <p className="eyebrow">Prendre part à la vision</p>
        <Reveal as="h2" className="heading-section max-w-[15em]">
          Et si vous écriviez la prochaine histoire d’impact ?
        </Reveal>
        <div className="mt-[clamp(32px,5vh,56px)] grid gap-[clamp(18px,2.5vw,32px)] min-[901px]:grid-cols-3">
          {joinPaths.map((path, i) => (
            <Reveal
              as="article"
              key={path.title}
              delay={i * 0.1}
              className={`flex flex-col items-start rounded-[28px] p-[clamp(22px,2.4vw,34px)] ${tones[path.tone].card}`}
            >
              <h3 className="mb-2.5 font-display text-[clamp(1.4rem,2vw,1.8rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
                {path.title}
              </h3>
              <p className="mb-[22px] max-w-[22rem] text-[0.95rem]">{path.text}</p>
              <ButtonLink href={path.href} variant={tones[path.tone].button} size="sm" className="mt-auto">
                {path.cta}
              </ButtonLink>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
