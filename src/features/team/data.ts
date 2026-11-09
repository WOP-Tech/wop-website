import type { StaticImageData } from "next/image";
import elseline from "@/assets/images/equipe/elseline-zonon.webp";
import lorrine from "@/assets/images/equipe/lorrine.jpg";
import nety from "@/assets/images/equipe/nety-behoundja.webp";
import nolivet from "@/assets/images/equipe/nolivet.jpg";
import reeceHermine from "@/assets/images/equipe/reece-hermine.jpg";
import serena from "@/assets/images/equipe/serena-noudedji.webp";
import tanya from "@/assets/images/equipe/tanya.jpg";

export type Member = {
  name: string;
  role: string;
  photo: StaticImageData;
  photoAlt: string;
  /** `null` tant que l'URL n'est pas fournie : le bouton LinkedIn s'affiche alors désactivé. */
  linkedin: string | null;
};

// TODO(équipe WOP) : noms de famille, rôles, liens LinkedIn et vraies photos des V-WOP et des expert·es.
export const founders: Member[] = [
  { name: "Néty Behoundja", role: "Présidente fondatrice", photo: nety, photoAlt: "Portrait de Néty", linkedin: "https://www.linkedin.com/in/nety-behoundja" },
  { name: "Elseline Zonon", role: "Responsable tech", photo: elseline, photoAlt: "Portrait de Elseline", linkedin: "https://www.linkedin.com/in/elseline-zonon" },
  { name: "Serena Noudedji", role: "Responsable com", photo: serena, photoAlt: "Portrait de Serena", linkedin: "https://www.linkedin.com/in/serena-noudedji" },
];

export const volunteers: Member[] = [
  { name: "Tanya", role: "V-WOP", photo: tanya, photoAlt: "Portrait provisoire de Tanya", linkedin: null },
  { name: "Lorrine", role: "V-WOP", photo: lorrine, photoAlt: "Portrait provisoire de Lorrine", linkedin: "https://www.linkedin.com/in/lorrine-cleophanelle-anderi" },
];

export const experts: Member[] = [
  {
    name: "Reece-Hermine",
    role: "Expert·e · Speak to Impact",
    photo: reeceHermine,
    photoAlt: "Portrait provisoire de Reece-Hermine",
    linkedin: "https://www.linkedin.com/in/reece-hermine-adanwenon-b27bb4108",
  },
  {
    name: "Nolivet",
    role: "Expert·e · Career Workshop",
    photo: nolivet,
    photoAlt: "Portrait provisoire de Nolivet",
    linkedin: "https://www.linkedin.com/in/nolivet-olonade",
  },
];

/**
 * Mention de travail des maquettes, masquée sur le site (`false`). Reste à compléter malgré tout :
 * mot définitif de Néty, vraies photos des V-WOP et des expert·es, noms de famille, liens LinkedIn manquants.
 * Repasser à `true` pour réafficher la mention sous l'équipe.
 */
export const hasPlaceholderContent = false;
