"use server";

import { redirect } from "next/navigation";
import { readField } from "@/lib/validation";
import { confirmNewsletterSubscription, unsubscribeFromNewsletter } from "./server";

/*
 * Confirmation et désinscription passent par un bouton (POST) et non par la simple ouverture du lien :
 * les antivirus de messagerie qui « visitent » les liens ne peuvent ainsi rien valider à la place de la personne.
 */

export async function confirmSubscriptionAction(formData: FormData) {
  const ok = await confirmNewsletterSubscription(readField(formData, "token"));
  redirect(`/newsletter/confirmation?statut=${ok ? "confirmee" : "invalide"}`);
}

export async function unsubscribeAction(formData: FormData) {
  const ok = await unsubscribeFromNewsletter(readField(formData, "token"));
  redirect(`/newsletter/desinscription?statut=${ok ? "effectuee" : "invalide"}`);
}
