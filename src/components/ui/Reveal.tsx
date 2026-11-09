"use client";

import { useEffect, useRef, useState, type ComponentProps, type ElementType } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Délai d'apparition en secondes (effet en cascade). */
  delay?: number;
} & Omit<ComponentProps<T>, "as">;

/** Fait apparaître son contenu (fondu + montée) quand il entre dans l'écran. Inactif si l'utilisateur réduit les animations. */
export function Reveal<T extends ElementType = "div">({ as, delay = 0, className = "", style, ...props }: RevealProps<T>) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      // Le délai ne s'applique qu'à l'apparition (opacité, translation), pas au survol (flex-grow).
      style={{ ...style, transitionDelay: `${delay}s, ${delay}s, 0s` }}
      className={`motion-safe:transition-[opacity,translate,flex-grow] motion-safe:duration-[800ms,900ms,500ms] motion-safe:ease-out-soft ${
        visible ? "" : "anim:translate-y-[34px] anim:opacity-0"
      } ${className}`}
      {...props}
    />
  );
}
