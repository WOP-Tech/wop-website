import type { StaticImageData } from "next/image";
import kpi1 from "@/assets/images/accueil/kpi-1.jpg";
import kpi2 from "@/assets/images/accueil/kpi-2.jpg";
import kpi3 from "@/assets/images/accueil/kpi-3.jpg";
import pillarConnect from "@/assets/images/accueil/pilier-connecter.webp";
import pillarEquip from "@/assets/images/accueil/pilier-equiper.webp";
import pillarInspire from "@/assets/images/accueil/pilier-inspirer.webp";

export type Kpi = {
  prefix?: string;
  value: string;
  label: string;
  story: string;
  chips?: string[];
  image: StaticImageData;
  /** Cadrage vertical de la photo dans l'arche. */
  imagePosition: string;
};

export const kpis: Kpi[] = [
  {
    prefix: "+",
    value: "100",
    label: "jeunes femmes transformées",
    story:
      "Derrière chaque chiffre, il y a un visage. Plus de cent jeunes femmes sont arrivées avec leurs doutes et leurs envies encore floues. Elles ont osé prendre la parole, se projeter, avancer.",
    image: kpi1,
    imagePosition: "50% 30%",
  },
  {
    value: "3",
    label: "programmes offerts",
    story:
      "Pour les accompagner, trois programmes pensés comme une progression : d’abord oser, ensuite se faire entendre, enfin passer à l’action.",
    chips: ["Building Your Confidence", "Speak To Impact", "Career Workshop"],
    image: kpi2,
    imagePosition: "50% 40%",
  },
  {
    value: "2",
    label: "experts reçus",
    story:
      "Deux experts sont venus partager leur parcours, sans filtre. Une façon de montrer que le chemin existe, et qu’il se construit pas à pas.",
    image: kpi3,
    imagePosition: "50% 25%",
  },
];

export const aboutText =
  "Woman Of Power est une organisation internationale à impact, engagée dans l’émergence d’une nouvelle génération de femmes leaders responsables, inspirantes et impactantes. Nous équipons, inspirons et connectons les jeunes femmes de 18 à 35 ans pour qu’elles deviennent des actrices majeures du changement.";

export type Pillar = {
  number: string;
  title: string;
  lead: string;
  text: string;
  image: StaticImageData;
  /** `cutout` : silhouette détourée posée en bas ; `photo` : photo plein cadre. */
  imageKind: "cutout" | "photo";
  className: string;
};

export const pillars: Pillar[] = [
  {
    number: "01",
    title: "Équiper",
    lead: "Donner les moyens d’agir.",
    text: "Des outils stratégiques et concrets pour relever les défis et développer son leadership.",
    image: pillarEquip,
    imageKind: "cutout",
    className: "bg-salmon",
  },
  {
    number: "02",
    title: "Inspirer",
    lead: "Rendre le possible visible.",
    text: "Des histoires de femmes inspirantes et impactantes pour conseiller et motiver.",
    image: pillarInspire,
    imageKind: "cutout",
    className: "bg-sun tab:mt-11",
  },
  {
    number: "03",
    title: "Connecter",
    lead: "Grandir grâce à la communauté.",
    text: "Des clubs de croissance et un réseau d’alumni international puissant.",
    image: pillarConnect,
    imageKind: "photo",
    className: "bg-coral tab:mt-3",
  },
];

export const woperWords = [
  "Transformation",
  "Sororité",
  "Excellence",
  "Confiance",
  "Leadership",
  "Audace",
  "Communauté",
  "Vision",
  "Impact",
  "Bienveillance",
  "Ambition",
  "Entraide",
];
