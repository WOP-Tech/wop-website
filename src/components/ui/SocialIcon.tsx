import type { ReactNode } from "react";
import type { SocialLink, SocialNetwork } from "@/data/site";

const paths: Record<SocialNetwork, ReactNode> = {
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.6v.01M12 16v-5.5M12 13c0-1.7 1-2.7 2.5-2.7S17 11.3 17 13v3" />
    </>
  ),
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  WhatsApp: (
    <>
      <path d="M3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 8 19.2z" />
      <path d="M9.2 8.6c.2 2.6 2.7 5.1 5.3 5.4l1.2-1.2-1.8-1-.9.7c-.8-.3-1.8-1.3-2.1-2.1l.7-.9-1-1.8z" />
    </>
  ),
  TikTok: <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.4 2.3 1.9 3.8 4.2 4" />,
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.6v4.8l4.4-2.4z" fill="currentColor" />
    </>
  ),
};

/** Pictogramme d'un réseau social (trait, couleur héritée). */
export function SocialGlyph({
  network,
  className = "",
  strokeWidth = 1.7,
}: {
  network: SocialNetwork;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`block flex-none ${className}`}
    >
      {paths[network]}
    </svg>
  );
}

/**
 * Lien vers un réseau social. Sans URL (`href: null`), rend un élément grisé non cliquable,
 * pour ne jamais publier de lien mort.
 */
export function SocialLinkItem({
  link,
  className,
  activeClassName,
  iconOnly = false,
  children,
}: {
  link: SocialLink;
  /** Classes communes (forme, bordure…). */
  className: string;
  /** Classes de survol, appliquées seulement si le lien existe. */
  activeClassName: string;
  /** Pictogramme seul : le nom du réseau est alors annoncé aux lecteurs d'écran. */
  iconOnly?: boolean;
  children: ReactNode;
}) {
  const name = iconOnly ? `${link.label} ` : "";

  if (!link.href) {
    return (
      <span className={`${className} opacity-40`} title={`${link.label} : lien à venir`}>
        {children}
        <span className="sr-only">{` ${name}(lien à venir)`}</span>
      </span>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={`${className} ${activeClassName}`}>
      {children}
      <span className="sr-only">{` ${name}(nouvel onglet)`}</span>
    </a>
  );
}
