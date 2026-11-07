import "server-only";
import { emailLayout, isEmailConfigured, sendEmail } from "@/lib/server/email";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { createToken, hashToken } from "@/lib/server/tokens";
import { siteUrl } from "@/lib/site-url";

/** Texte du consentement recueilli, conservé avec l'inscription (preuve RGPD). */
export const NEWSLETTER_CONSENT =
  "J’accepte de recevoir la newsletter de Woman of Power (une lettre par mois). Désinscription possible à tout moment.";

/** Délai minimal entre deux e-mails de confirmation pour une même adresse (anti-abus). */
const RESEND_DELAY_MS = 5 * 60 * 1000;

export type SubscribeResult = "pending" | "unavailable" | "failed";

/**
 * Inscription en double opt-in : l'adresse est enregistrée « en attente » et un e-mail de confirmation est envoyé.
 * Quelle que soit la situation (déjà inscrite ou non), la réponse au visiteur est la même : on ne révèle pas
 * si une adresse figure déjà dans la liste.
 */
export async function requestNewsletterSubscription(email: string): Promise<SubscribeResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase || !isEmailConfigured()) return "unavailable";

  const { data: existing, error: readError } = await supabase
    .from("newsletter_subscribers")
    .select("id, status, confirmation_sent_at")
    .eq("email", email)
    .maybeSingle();
  if (readError) {
    console.error("[newsletter] lecture impossible :", readError.message);
    return "failed";
  }

  if (existing?.status === "confirmed") return "pending";
  if (existing?.confirmation_sent_at && Date.now() - Date.parse(existing.confirmation_sent_at) < RESEND_DELAY_MS) {
    return "pending";
  }

  const token = createToken();
  const fields = {
    status: "pending",
    confirm_token_hash: hashToken(token),
    confirmation_sent_at: new Date().toISOString(),
    consent_text: NEWSLETTER_CONSENT,
  };
  const { error: writeError } = existing
    ? await supabase.from("newsletter_subscribers").update(fields).eq("id", existing.id)
    : await supabase.from("newsletter_subscribers").insert({ email, ...fields });
  if (writeError) {
    console.error("[newsletter] enregistrement impossible :", writeError.message);
    return "failed";
  }

  const link = `${siteUrl}/newsletter/confirmation?token=${token}`;
  const sent = await sendEmail({
    to: email,
    subject: "Confirmez votre inscription à la newsletter Woman of Power",
    text: `Bonjour,\n\nPour recevoir la newsletter de Woman of Power, confirmez votre inscription en ouvrant ce lien :\n${link}\n\nSi vous n’êtes pas à l’origine de cette demande, ignorez simplement cet e-mail.`,
    html: emailLayout(
      "Confirmez votre inscription",
      `<p style="margin:0 0 20px;line-height:1.6">Pour recevoir la newsletter de Woman of Power (une lettre par mois : programmes, rencontres et opportunités), confirmez votre inscription :</p>
<p style="margin:0 0 24px"><a href="${link}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#e76b70;color:#fff6ea;font-weight:bold;text-decoration:none">Confirmer mon inscription</a></p>
<p style="margin:0;font-size:13px;line-height:1.5;opacity:.75">Si vous n’êtes pas à l’origine de cette demande, ignorez simplement cet e-mail : vous ne recevrez rien.</p>`,
    ),
  });
  return sent ? "pending" : "failed";
}

/** Confirme une inscription à partir du jeton reçu par e-mail. */
export async function confirmNewsletterSubscription(token: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase || !token) return false;
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString(), confirm_token_hash: null })
    .eq("confirm_token_hash", hashToken(token))
    .eq("status", "pending")
    .select("id");
  if (error) console.error("[newsletter] confirmation impossible :", error.message);
  return !error && data.length > 0;
}

/** Désinscription à partir du jeton personnel présent dans chaque newsletter. */
export async function unsubscribeFromNewsletter(token: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase || !token) return false;
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
    .eq("unsubscribe_token", token)
    .neq("status", "unsubscribed")
    .select("id");
  if (error) console.error("[newsletter] désinscription impossible :", error.message);
  return !error && data.length > 0;
}
