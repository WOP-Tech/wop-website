import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

/** Page courte à message unique (404, confirmation…), dans la charte des hauts de page intérieurs. */
export function MessagePage({
  eyebrow,
  title,
  children,
  actions,
}: {
  eyebrow: string;
  /** Titre ; entourer le mot mis en valeur d'un `<em>`. */
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="flex min-h-[70svh] items-center pt-[clamp(104px,14vh,150px)] pb-[clamp(40px,7vh,84px)]">
      <Container className="w-full">
        <p className="eyebrow anim:animate-rise">{eyebrow}</p>
        <h1
          style={{ animationDelay: "0.08s" }}
          className="max-w-[16em] font-display text-[clamp(1.72rem,3.43vw,3.28rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance anim:animate-rise [&_em]:text-coral-ink [&_em]:not-italic"
        >
          {title}
        </h1>
        <div
          style={{ animationDelay: "0.16s" }}
          className="mt-[clamp(24px,4vh,40px)] max-w-[34rem] text-[clamp(1rem,1.15vw,1.1rem)] anim:animate-rise"
        >
          {children}
        </div>
        {actions && (
          <div style={{ animationDelay: "0.24s" }} className="mt-[clamp(24px,4vh,40px)] flex flex-wrap gap-3 anim:animate-rise">
            {actions}
          </div>
        )}
      </Container>
    </section>
  );
}
