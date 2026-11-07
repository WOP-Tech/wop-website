import type { ComponentProps } from "react";

/** Colonne centrée de 1120px max avec la gouttière des maquettes (16px + zones sûres). */
export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto max-w-[1120px] px-safe ${className}`} {...props} />;
}
