export type Report = {
  title: string;
  text: string;
  /** Chemin du PDF (dans `public/`) ; `null` tant qu'il n'est pas publié : le bouton s'affiche alors désactivé. */
  file: string | null;
  tone: "brown" | "cream";
};

// TODO(équipe WOP) : déposer les PDF dans public/documents/ puis renseigner `file` (ex. "/documents/bilan-activite-2026.pdf").
export const reports: Report[] = [
  {
    title: "Bilan d’activité",
    text: "Programmes, rencontres, voix d’experts : le bilan retrace l’année vécue par la communauté WOP.",
    file: null,
    tone: "brown",
  },
  {
    title: "Bilan financier",
    text: "Le détail des ressources de WOP et de leur utilisation est présenté dans le bilan financier.",
    file: null,
    tone: "cream",
  },
];

export type Faq = { question: string; answer: string };

/**
 * Questions et réponses d'exemple (maquette), à confirmer avec l'équipe WOP.
 * ⚠️ Déductibilité fiscale : ne rien promettre tant que l'association n'est pas habilitée à délivrer des reçus fiscaux.
 */
export const faqs: Faq[] = [
  {
    question: "Comment puis-je faire un don ?",
    answer: "Le don se fait en ligne, en quelques clics. Les modalités (plateforme, virement) seront précisées ici.",
  },
  {
    question: "À quoi servent les dons ?",
    answer:
      "Ils financent les programmes WOP : accompagnement, rencontres avec des experts et outils pour les jeunes femmes de la communauté.",
  },
  {
    question: "Mon don est-il déductible des impôts ?",
    answer: "L’information fiscale sera confirmée ici par l’équipe WOP, avec les justificatifs disponibles.",
  },
  {
    question: "Mon organisation peut-elle devenir partenaire ?",
    answer:
      "Oui. Écrivez-nous pour imaginer ensemble la forme de collaboration la plus utile : programme, mécénat ou accompagnement.",
  },
  {
    question: "Comment partager bénévolement mon expertise ?",
    answer:
      "Présentez-vous en quelques lignes via la page Nous contacter, avec votre domaine d’expertise. L’équipe vous répond pour définir une intervention.",
  },
  {
    question: "Puis-je aider sans donner d’argent ?",
    answer:
      "Bien sûr. Partager votre expertise, relayer WOP autour de vous ou parler du projet à votre réseau compte beaucoup.",
  },
];

/**
 * Mentions de travail des maquettes, masquées sur le site (`false`). Reste à compléter malgré tout :
 * plateforme de don (`donationUrl`), bilans PDF (`reports`), validation des questions de la FAQ.
 * Repasser à `true` pour réafficher les mentions.
 */
export const showWorkNotes = false;
