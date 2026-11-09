export type Program = {
  slug: string;
  name: string;
  /** Thème court affiché en étiquette. */
  theme: string;
  description: string;
  /** Accroche courte, à la 2e personne (page Devenir Woper). */
  pitch: string;
};

export const programs: Program[] = [
  {
    slug: "building-your-confidence",
    name: "Building Your Confidence",
    theme: "Confiance",
    description: "Construire une confiance solide, enracinée et audacieuse, et incarner une posture de leader.",
    pitch: "Prendre confiance en toi et en ta valeur.",
  },
  {
    slug: "speak-to-impact",
    name: "Speak To Impact",
    theme: "Prise de parole",
    description: "Affirmer sa voix, communiquer avec clarté et faire de chaque prise de parole un moment d’impact.",
    pitch: "Oser porter ta voix et tes idées.",
  },
  {
    slug: "career-workshop",
    name: "Career Workshop",
    theme: "Carrière",
    description: "Développer les compétences, les repères et la stratégie d’une carrière professionnelle ambitieuse.",
    pitch: "Clarifier ton parcours et avancer dans ta carrière.",
  },
];
