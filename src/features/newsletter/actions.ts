"use server";

import { isValidEmail, readField } from "@/lib/validation";
import { requestNewsletterSubscription } from "./server";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Adresse saisie, renvoyée en cas d'erreur pour éviter de la retaper. */
  email?: string;
};

export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  // Champ piège invisible : rempli uniquement par les robots.
  if (readField(formData, "company") !== "") {
    return { status: "success", message: "Merci ! Vérifiez votre boîte mail pour confirmer votre inscription." };
  }

  const email = readField(formData, "email").toLowerCase();
  if (!isValidEmail(email)) {
    return { status: "error", message: "Merci d’indiquer une adresse e-mail valide.", email };
  }

  const result = await requestNewsletterSubscription(email);
  if (result === "unavailable") {
    return { status: "success", message: "Merci ! L’inscription à la newsletter sera active très prochainement." };
  }
  if (result === "failed") {
    return { status: "error", message: "L’inscription n’a pas pu aboutir. Réessayez dans quelques instants.", email };
  }
  return {
    status: "success",
    message: "Merci ! Un e-mail de confirmation vient de vous être envoyé : cliquez sur le lien qu’il contient pour valider votre inscription.",
  };
}
