import type { StaticImageData } from "next/image";
import aicha from "@/assets/images/temoignages/aicha.jpg";
import camille from "@/assets/images/temoignages/camille.png";
import mariam from "@/assets/images/temoignages/mariam.png";

export type Testimonial = {
  quote: string;
  name: string;
  age: number;
  program: string;
  photo: StaticImageData;
  /** Habillage de la carte, dans l'ordre des maquettes. */
  tone: "brown" | "coral" | "cream";
};

/**
 * ⚠️ Témoignages illustratifs (maquettes) : à remplacer par de vraies paroles de Wopers,
 * avec leur accord écrit (citation, prénom, âge, photo). Tant qu'ils sont fictifs,
 * la mention `isIllustrative` doit rester affichée (pratique commerciale trompeuse sinon).
 */
export const isIllustrative = true;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Avant WOP, j’avais des idées, mais je n’osais pas toujours les porter. WOP m’a aidée à structurer ma voix, à prendre confiance et à avancer avec plus d’intention.",
    name: "Aïcha",
    age: 24,
    program: "Speak To Impact",
    photo: aicha,
    tone: "brown",
  },
  {
    quote:
      "J’ai rencontré des femmes qui osent. En les voyant avancer, j’ai compris que moi aussi, je pouvais prendre ma place.",
    name: "Camille",
    age: 22,
    program: "Building Your Confidence",
    photo: camille,
    tone: "coral",
  },
  {
    quote:
      "Avec la communauté WOP, je ne me sens plus seule dans mes projets. J’ai trouvé des conseils, des contacts et l’envie d’aller plus loin.",
    name: "Mariam",
    age: 26,
    program: "Career Workshop",
    photo: mariam,
    tone: "cream",
  },
];
