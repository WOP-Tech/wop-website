export type NavLink = {
  label: string;
  href: string;
};

export type SocialNetwork = "LinkedIn" | "Instagram" | "WhatsApp" | "TikTok" | "YouTube";

export type SocialLink = {
  label: SocialNetwork;
  /** `null` tant que l'URL officielle n'est pas fournie : l'icône s'affiche alors désactivée. */
  href: string | null;
};

export const site = {
  name: "Woman of Power",
  shortName: "WOP",
  tagline: "Équiper, inspirer et connecter les jeunes femmes leaders",
  description:
    "Woman of Power est une organisation internationale à impact qui équipe, inspire et connecte les jeunes femmes de 18 à 35 ans pour qu’elles deviennent des actrices majeures du changement.",
  email: "womanofpower.wop@gmail.com",
  // TODO: URL du formulaire de candidature (Tally, Google Forms…). En attendant, les boutons « Candidater » mènent au contact.
  applicationUrl: null as string | null,
} as const;

/** Informations légales de l'éditeur du site (mentions légales, politique de confidentialité). */
export const legalEntity = {
  name: "WOMAN OF POWER",
  form: "Association régie par la loi du 1er juillet 1901",
  address: "12 avenue Demont, 78500 Sartrouville, France",
  siret: "999 659 857 00018",
  siren: "999 659 857",
  email: site.email,
  // TODO(équipe WOP) : numéro de téléphone (exigé par la loi LCEN pour une personne morale).
  phone: null as string | null,
  // Par défaut, le directeur de la publication d'une association est son représentant légal. TODO : à confirmer.
  publicationDirector: "Néty Behoundja, présidente",
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    website: "https://vercel.com",
  },
} as const;

/** Lien des boutons « Candidater ». */
export const applicationHref = site.applicationUrl ?? "/contact";

// TODO: URL de la plateforme de don (HelloAsso…). En attendant, les boutons « Donner » mènent au contact.
export const donationUrl: string | null = null;
export const donationHref = donationUrl ?? "/contact";

export const mainNav: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Découvrir WOP", href: "/decouvrir" },
  { label: "L’équipe WOP", href: "/equipe" },
  { label: "Nous contacter", href: "/contact" },
  { label: "Soutenir WOP", href: "/soutenir" },
];

export const ctaNav: NavLink = { label: "Devenir Woper", href: "/devenir-woper" };

export const footerNav: NavLink[] = [
  { label: "Découvrir WOP", href: "/decouvrir" },
  { label: "Devenir Woper", href: "/devenir-woper" },
  { label: "L’équipe WOP", href: "/equipe" },
  { label: "Nous contacter", href: "/contact" },
  { label: "Soutenir WOP", href: "/soutenir" },
];

export const legalNav: NavLink[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Cookies", href: "/cookies" },
];

const socialUrls: Record<SocialNetwork, string | null> = {
  LinkedIn: "https://www.linkedin.com/company/woman-of-power/",
  // Paramètre de suivi `?exln=` retiré de l'URL partagée.
  Instagram: "https://www.instagram.com/_womanofpower/",
  WhatsApp: "https://whatsapp.com/channel/0029Vb47mRPEFeXtDvb2u40r",
  // TODO: comptes TikTok et YouTube de WOP (page Soutenir), s'ils existent.
  TikTok: null,
  YouTube: null,
};

const socialList = (...networks: SocialNetwork[]): SocialLink[] =>
  networks.map((label) => ({ label, href: socialUrls[label] }));

/** Pied de page et page Contact. */
export const socialLinks = socialList("LinkedIn", "Instagram", "WhatsApp");

/** « Faire connaître WOP » (page Soutenir). */
export const shareLinks = socialList("Instagram", "LinkedIn", "TikTok", "YouTube");
