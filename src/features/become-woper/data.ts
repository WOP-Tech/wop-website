export type Criterion = { title: string; text: string };

// TODO(équipe WOP) : critères à valider (mention affichée sous la liste).
export const criteria: Criterion[] = [
  { title: "Âge", text: "Tu es une jeune femme de 18 à 35 ans." },
  {
    title: "Ambition",
    text: "Tu as un projet, une ambition ou une question professionnelle sur laquelle tu veux avancer.",
  },
  {
    title: "Disponibilité",
    text: "Tu peux consacrer quelques heures par semaine à la durée du programme choisi.",
  },
  { title: "Engagement", text: "Tu acceptes de contribuer à la communauté autant que d’en recevoir." },
];

export type Step = { title: string; text: string };

export const steps: Step[] = [
  {
    title: "Candidature",
    text: "Tu remplis le formulaire de candidature. Quelques minutes suffisent : nous voulons comprendre ta situation et ce que tu cherches.",
  },
  {
    title: "Échange",
    text: "L’équipe revient vers toi pour un échange court, afin de vérifier que le programme correspond à ton besoin et à ta disponibilité.",
  },
  {
    title: "Sélection",
    text: "Les candidatures sont examinées par cohorte. Tu reçois une réponse, positive ou non, avec la marche à suivre.",
  },
  {
    title: "Intégration",
    text: "Tu deviens Woper : tu rejoins la communauté, tu es mise en relation avec ton mentor et tu accèdes à l’ensemble des programmes, à commencer par celui de ta cohorte.",
  },
];
