export const contactSubjects = [
  "Rejoindre la communauté",
  "Collaborer avec WOP",
  "Intervenir comme experte",
  "Soutenir WOP",
  "Autre sujet",
] as const;

export type ContactSubject = (typeof contactSubjects)[number];
