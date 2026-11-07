"use server";

import { isValidEmail, readField } from "@/lib/validation";
import { contactSubjects, type ContactSubject } from "./data";
import { deliverContactMessage } from "./server";

export type ContactState = {
  status: "idle" | "success" | "error" | "unavailable";
  message: string;
};

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Champ piège invisible : rempli uniquement par les robots, qu'on remercie sans rien transmettre.
  if (readField(formData, "website") !== "") {
    return { status: "success", message: "Merci ! Votre message a bien été envoyé." };
  }

  const firstName = readField(formData, "firstName");
  const email = readField(formData, "email").toLowerCase();
  const subject = readField(formData, "subject") as ContactSubject;
  const message = readField(formData, "message");

  if (!firstName || firstName.length > 80) {
    return { status: "error", message: "Merci d’indiquer votre prénom." };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "Merci d’indiquer une adresse e-mail valide." };
  }
  if (!contactSubjects.includes(subject)) {
    return { status: "error", message: "Merci de choisir l’objet du message." };
  }
  if (message.length < 10 || message.length > 5000) {
    return { status: "error", message: "Votre message doit contenir entre 10 et 5 000 caractères." };
  }

  const result = await deliverContactMessage({ firstName, email, subject, message });
  if (result === "unavailable") {
    return { status: "unavailable", message: "L’envoi en ligne n’est pas encore activé." };
  }
  if (result === "failed") {
    return { status: "unavailable", message: "Votre message n’a pas pu être envoyé, veuillez nous excuser." };
  }
  return { status: "success", message: "Merci ! Votre message a bien été envoyé, l’équipe WOP vous répond au plus vite." };
}
