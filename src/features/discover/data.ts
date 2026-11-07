export const themes = [
  "Confiance et identité",
  "Leadership",
  "Carrière",
  "Entrepreneuriat",
  "Prise de parole",
  "Finances personnelles",
  "Impact social",
];

export type JoinPath = {
  title: string;
  text: string;
  cta: string;
  href: string;
  tone: "brown" | "coral" | "cream";
};

export const joinPaths: JoinPath[] = [
  {
    title: "Devenir Woper",
    text: "Rejoignez une communauté qui révèle votre potentiel et votre vision.",
    cta: "Rejoindre",
    href: "/devenir-woper",
    tone: "brown",
  },
  {
    title: "Collaborer avec WOP",
    text: "Associez votre expertise ou votre organisation à une mission qui équipe les femmes.",
    cta: "Collaborer",
    href: "/contact",
    tone: "coral",
  },
  {
    title: "Faire un don",
    text: "Aidez-nous à équiper plus de femmes, dans plus de pays.",
    cta: "Donner",
    href: "/soutenir#facons",
    tone: "cream",
  },
];
