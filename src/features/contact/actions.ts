"use server";

import { contactSubjects, type ContactSubject } from "./data";

export type ContactState = {
  status: "idle" | "success" | "error" | "unavailable";
  message: string;
};

export type ContactMessage = {
  firstName: string;
  email: string;
  subject: ContactSubject;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Transmission du message à l'équipe.
 * TODO(supabase/e-mail) : enregistrer le message (table `contact_messages`) et notifier l'équipe par e-mail.
 * Tant que ce n'est pas branché, renvoie `false` : le visiteur est invité à écrire directement.
 */
async function deliverContactMessage(message: ContactMessage): Promise<boolean> {
  void message;
  return false;
}

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Champ piège invisible : rempli uniquement par les robots.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success", message: "Merci ! Votre message a bien été envoyé." };
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const subject = String(formData.get("subject") ?? "") as ContactSubject;
  const message = String(formData.get("message") ?? "").trim();
  const fields = { firstName, email, subject, message };

  if (!firstName || firstName.length > 80) {
    return { status: "error", message: "Merci d’indiquer votre prénom." };
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { status: "error", message: "Merci d’indiquer une adresse e-mail valide." };
  }
  if (!contactSubjects.includes(subject)) {
    return { status: "error", message: "Merci de choisir l’objet du message." };
  }
  if (message.length < 10 || message.length > 5000) {
    return { status: "error", message: "Votre message doit contenir entre 10 et 5 000 caractères." };
  }

  const delivered = await deliverContactMessage(fields);
  if (!delivered) {
    return { status: "unavailable", message: "L’envoi en ligne n’est pas encore activé." };
  }
  return { status: "success", message: "Merci ! Votre message a bien été envoyé, l’équipe WOP vous répond au plus vite." };
}
