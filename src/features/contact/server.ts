import "server-only";
import { site } from "@/data/site";
import { emailLayout, escapeHtml, isEmailConfigured, sendEmail } from "@/lib/server/email";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import type { ContactSubject } from "./data";

export type ContactMessage = {
  firstName: string;
  email: string;
  subject: ContactSubject;
  message: string;
};

export type DeliveryResult = "delivered" | "unavailable" | "failed";

/**
 * Transmet un message de contact : enregistrement dans Supabase (`contact_messages`)
 * et notification de l'équipe par e-mail (la réponse part directement vers le visiteur grâce à `replyTo`).
 * Le message est considéré transmis dès qu'au moins un des deux canaux a fonctionné.
 */
export async function deliverContactMessage(message: ContactMessage): Promise<DeliveryResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase && !isEmailConfigured()) return "unavailable";

  let stored = false;
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      first_name: message.firstName,
      email: message.email,
      subject: message.subject,
      message: message.message,
    });
    if (error) console.error("[contact] échec de l'enregistrement :", error.message);
    stored = !error;
  }

  const safe = {
    firstName: escapeHtml(message.firstName),
    email: escapeHtml(message.email),
    subject: escapeHtml(message.subject),
    message: escapeHtml(message.message).replaceAll("\n", "<br>"),
  };
  const notified = await sendEmail({
    to: process.env.CONTACT_INBOX ?? site.email,
    replyTo: message.email,
    subject: `[Site WOP] ${message.subject} — ${message.firstName}`,
    text: `Nouveau message depuis le site\n\nPrénom : ${message.firstName}\nE-mail : ${message.email}\nObjet : ${message.subject}\n\n${message.message}`,
    html: emailLayout(
      "Nouveau message depuis le site",
      `<p style="margin:0 0 6px"><b>Prénom :</b> ${safe.firstName}</p>
<p style="margin:0 0 6px"><b>E-mail :</b> ${safe.email}</p>
<p style="margin:0 0 18px"><b>Objet :</b> ${safe.subject}</p>
<div style="padding:16px;border-radius:12px;background:#ffffff;line-height:1.6">${safe.message}</div>
<p style="margin:18px 0 0;font-size:13px;opacity:.75">Répondez directement à cet e-mail pour écrire à ${safe.firstName}.</p>`,
    ),
  });

  return stored || notified ? "delivered" : "failed";
}
