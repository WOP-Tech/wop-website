import type { Metadata } from "next";
import { Button, ButtonLink } from "@/components/ui/Button";
import { MessagePage } from "@/components/ui/MessagePage";
import { confirmSubscriptionAction } from "@/features/newsletter/token-actions";

export const metadata: Metadata = {
  title: "Confirmer mon inscription",
  robots: { index: false, follow: false },
};

export default async function ConfirmSubscriptionPage({ searchParams }: PageProps<"/newsletter/confirmation">) {
  const { token, statut } = await searchParams;

  if (statut === "confirmee") {
    return (
      <MessagePage
        eyebrow="Newsletter"
        title={
          <>
            Bienvenue dans la <em>communauté.</em>
          </>
        }
        actions={<ButtonLink href="/">Retour à l’accueil</ButtonLink>}
      >
        <p>Votre inscription est confirmée : vous recevrez la prochaine lettre de Woman of Power.</p>
      </MessagePage>
    );
  }

  if (statut === "invalide" || typeof token !== "string" || !token) {
    return (
      <MessagePage
        eyebrow="Newsletter"
        title="Ce lien n’est plus valable."
        actions={<ButtonLink href="/">Retour à l’accueil</ButtonLink>}
      >
        <p>
          Il a peut-être déjà été utilisé, ou il a expiré. Vous pouvez vous réinscrire depuis le formulaire en bas de
          chaque page.
        </p>
      </MessagePage>
    );
  }

  return (
    <MessagePage
      eyebrow="Newsletter"
      title={
        <>
          Encore un clic pour <em>confirmer.</em>
        </>
      }
      actions={
        <form action={confirmSubscriptionAction}>
          <input type="hidden" name="token" value={token} />
          <Button type="submit" variant="coral">
            Confirmer mon inscription
          </Button>
        </form>
      }
    >
      <p>Confirmez votre inscription pour recevoir la newsletter de Woman of Power, une lettre par mois.</p>
    </MessagePage>
  );
}
