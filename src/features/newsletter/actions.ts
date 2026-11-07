"use server";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Adresse saisie, renvoyée en cas d'erreur pour éviter de la retaper. */
  email?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { status: "error", message: "Merci d’indiquer une adresse e-mail valide.", email };
  }

  // TODO(supabase): enregistrer l'adresse + date de consentement, puis envoyer l'e-mail de confirmation (double opt-in).
  return {
    status: "success",
    message: "Merci ! L’inscription à la newsletter sera active très prochainement.",
  };
}
