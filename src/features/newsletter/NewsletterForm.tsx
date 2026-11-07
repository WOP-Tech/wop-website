"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { subscribeToNewsletter, type NewsletterState } from "./actions";

const initialState: NewsletterState = { status: "idle", message: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <form action={formAction} noValidate>
      <div className="flex items-center gap-1.5 rounded-full border-[1.5px] border-brown bg-cream p-[5px] focus-within:shadow-[0_0_0_3px_rgba(231,107,112,0.3)]">
        <label className="sr-only" htmlFor="newsletter-email">
          Adresse e-mail
        </label>
        <input
          id="newsletter-email"
          name="email"
          key={state.email ?? ""}
          defaultValue={state.email}
          type="email"
          placeholder="Adresse e-mail"
          autoComplete="email"
          required
          aria-describedby="newsletter-legal newsletter-status"
          aria-invalid={state.status === "error" || undefined}
          className="min-h-11 min-w-0 flex-auto bg-transparent px-4 text-base text-brown outline-none placeholder:text-brown/55"
        />
        <Button type="submit" variant="sun" disabled={pending} className="flex-none px-5 py-[13px] disabled:opacity-70">
          {pending ? "Envoi…" : "S’inscrire"}
        </Button>
      </div>
      <p id="newsletter-status" role="status" aria-live="polite" className="mt-2.5 ml-4 text-[0.9rem] empty:hidden">
        {state.message}
      </p>
      <p id="newsletter-legal" className="mt-2.5 ml-4 text-[0.8rem] leading-snug opacity-75">
        Votre adresse sert uniquement à l’envoi de la newsletter. Désinscription possible à tout moment.{" "}
        <Link href="/politique-de-confidentialite" className="underline underline-offset-2">
          En savoir plus
        </Link>
      </p>
    </form>
  );
}
