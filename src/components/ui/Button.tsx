import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "coral" | "brown" | "sun" | "apply" | "cream" | "ghost-light" | "ghost-dark" | "line-light";
type Size = "md" | "sm" | "card";

const base =
  "group inline-flex items-center rounded-full border-[1.5px] font-display leading-none font-semibold transition-transform duration-250 ease-out hover:-translate-y-[3px] cursor-pointer";

const sizes: Record<Size, { button: string; arrow: string }> = {
  md: { button: "gap-3 px-[22px] py-[14px] text-[0.95rem]", arrow: "size-6 text-[0.8rem]" },
  // Boutons des cartes (maquettes : `.path .btn`)
  sm: { button: "gap-2.5 py-[9px] pr-[9px] pl-4 text-[0.85rem]", arrow: "size-5 text-[0.7rem]" },
  // Boutons des cartes « façons d'agir » (maquette Soutenir) : compacts, pastille normale
  card: { button: "gap-3 py-[9px] pr-[9px] pl-4 text-[0.85rem]", arrow: "size-6 text-[0.8rem]" },
};

const variants: Record<Variant, { button: string; arrow: string }> = {
  coral: { button: "bg-coral text-cream border-coral", arrow: "bg-cream/26 text-cream" },
  brown: { button: "bg-brown text-cream border-brown", arrow: "bg-cream/24 text-cream" },
  sun: { button: "bg-sun text-brown border-sun", arrow: "bg-brown/16 text-brown" },
  // Boutons « Candidater » (maquettes : doré, pastille crème)
  apply: { button: "bg-sun text-brown border-transparent", arrow: "bg-cream text-brown" },
  cream: { button: "bg-cream text-brown border-cream", arrow: "bg-brown text-cream" },
  "ghost-light": { button: "bg-transparent text-cream border-cream/70", arrow: "bg-coral text-brown" },
  "ghost-dark": { button: "bg-transparent text-brown border-brown", arrow: "bg-brown text-cream" },
  // Contour crème plein sur fond coloré (maquettes : `.btn-line`)
  "line-light": { button: "bg-transparent text-cream border-cream", arrow: "bg-cream/26 text-cream" },
};

export function buttonClasses(variant: Variant, className = "", size: Size = "md") {
  return `${base} ${sizes[size].button} ${variants[variant].button} ${className}`;
}

/** Petite pastille fléchée des maquettes (« ↗ » par défaut, « ↓ » pour une ancre dans la page). */
export function ButtonArrow({
  variant,
  small = false,
  icon = "↗",
}: {
  variant: Variant;
  small?: boolean;
  icon?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid place-items-center rounded-full transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
        small ? sizes.sm.arrow : sizes.md.arrow
      } ${variants[variant].arrow}`}
    >
      {icon}
    </span>
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Pastille fléchée : `true` (« ↗ », par défaut), `false`, ou un autre symbole. */
  arrow?: boolean | string;
  children: ReactNode;
  className?: string;
};

function Arrow({ arrow, variant, size }: Required<Pick<CommonProps, "arrow" | "variant" | "size">>) {
  if (arrow === false) return null;
  return <ButtonArrow variant={variant} small={size === "sm"} icon={arrow === true ? undefined : arrow} />;
}

export function ButtonLink({
  variant = "coral",
  size = "md",
  arrow = true,
  children,
  className,
  ...props
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={buttonClasses(variant, className, size)} {...props}>
      {children}
      <Arrow arrow={arrow} variant={variant} size={size} />
    </Link>
  );
}

export function Button({
  variant = "coral",
  size = "md",
  arrow = true,
  children,
  className,
  type = "button",
  ...props
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={buttonClasses(variant, className, size)} {...props}>
      {children}
      <Arrow arrow={arrow} variant={variant} size={size} />
    </button>
  );
}
