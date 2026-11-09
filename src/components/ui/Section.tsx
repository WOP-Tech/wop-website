import type { ComponentProps } from "react";

/** Section des pages intérieures avec l'espacement vertical standard des maquettes (`.sec`). */
export function Section({ className = "", ...props }: ComponentProps<"section">) {
  return <section className={`py-[clamp(40px,7vh,84px)] ${className}`} {...props} />;
}
