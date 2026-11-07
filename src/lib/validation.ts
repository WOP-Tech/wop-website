const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validation volontairement simple : la vraie vérification d'une adresse, c'est l'e-mail qu'on y envoie. */
export function isValidEmail(email: string) {
  return email.length <= 254 && EMAIL_PATTERN.test(email);
}

/** Lit un champ texte d'un formulaire, nettoyé des espaces superflus. */
export function readField(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}
