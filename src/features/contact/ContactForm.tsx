"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useTransition, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { sendContactMessage, type ContactState } from "./actions";
import { contactSubjects } from "./data";

const initialState: ContactState = { status: "idle", message: "" };

const labelClass = "grid gap-1.5 font-display text-[0.78rem] leading-none font-bold tracking-[0.12em] uppercase";
const fieldClass =
  "w-full rounded-[14px] border-[1.5px] border-brown/40 bg-cream px-3.5 py-3 font-sans text-base leading-[1.3] font-medium tracking-normal text-brown normal-case focus:border-coral focus:outline-2 focus:outline-offset-1 focus:outline-coral";

/** Formulaire de contact (prénom, e-mail, objet, message), validé côté serveur. */
export function ContactForm() {
  const [state, formAction, actionPending] = useActionState(sendContactMessage, initialState);
  const [transitionPending, startTransition] = useTransition();
  const pending = actionPending || transitionPending;
  const formRef = useRef<HTMLFormElement>(null);

  // Avec `action`, React vide le formulaire après chaque envoi, même en cas d'erreur.
  // On envoie donc nous-mêmes (le visiteur garde sa saisie) et on ne vide qu'après un succès.
  // `action` reste en place pour que le formulaire fonctionne sans JavaScript.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formRef.current = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <Reveal
      as="form"
      action={formAction}
      onSubmit={handleSubmit}
      className="grid gap-3.5 rounded-[28px] border-2 border-brown bg-cream p-[clamp(22px,2.6vw,36px)] shadow-[10px_10px_0_var(--color-sun)]"
    >
      <div className="grid gap-3.5 min-[901px]:grid-cols-2">
        <label className={labelClass}>
          Prénom
          <input name="firstName" type="text" autoComplete="given-name" required maxLength={80} className={fieldClass} />
        </label>
        <label className={labelClass}>
          E-mail
          <input name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} />
        </label>
      </div>
      <label className={labelClass}>
        Objet du message
        <select name="subject" className={fieldClass}>
          {contactSubjects.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        Message
        <textarea name="message" required minLength={10} maxLength={5000} className={`${fieldClass} min-h-[120px] resize-y`} />
      </label>

      {/* Champ piège anti-robots : invisible et ignoré par les lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Site web
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Button type="submit" variant="brown" disabled={pending} className="justify-self-start disabled:opacity-70">
        {pending ? "Envoi…" : "Envoyer"}
      </Button>

      <p role="status" aria-live="polite" className="text-[0.9rem] empty:hidden">
        {state.message}
        {state.status === "unavailable" && (
          <>
            {" "}
            Écrivez-nous directement à{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">
              {site.email}
            </a>
            , nous vous répondrons avec plaisir.
          </>
        )}
      </p>

      <p className="text-[0.8rem] leading-snug opacity-75">
        Vos informations servent uniquement à répondre à votre demande.{" "}
        <Link href="/politique-de-confidentialite" className="underline underline-offset-2">
          En savoir plus
        </Link>
      </p>
    </Reveal>
  );
}
