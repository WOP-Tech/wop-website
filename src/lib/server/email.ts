import "server-only";
import { Resend } from "resend";

let client: Resend | null | undefined;

function getResend(): Resend | null {
  if (client !== undefined) return client;
  client = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  return client;
}

/** Envoi d'e-mails configuré (clé Resend et expéditeur vérifié) ? */
export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/** Envoie un e-mail via Resend. Renvoie `false` (sans lever d'erreur) si l'envoi échoue ou n'est pas configuré. */
export async function sendEmail(message: EmailMessage): Promise<boolean> {
  const resend = getResend();
  const from = process.env.EMAIL_FROM;
  if (!resend || !from) return false;
  const { error } = await resend.emails.send({ from, ...message });
  if (error) {
    console.error("[email] échec de l'envoi :", error.message);
    return false;
  }
  return true;
}

/** Échappe le texte saisi par un visiteur avant de l'insérer dans un e-mail HTML. */
export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Gabarit HTML sobre, aux couleurs de la charte (styles en ligne, compatibles clients mail). */
export function emailLayout(title: string, body: string) {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#fff6ea;font-family:Arial,Helvetica,sans-serif;color:#69412c">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
<p style="margin:0 0 24px;font-weight:bold;letter-spacing:.18em;font-size:12px;text-transform:uppercase">Woman of Power</p>
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.2">${title}</h1>
${body}
</div></body></html>`;
}
