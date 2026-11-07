import type { Metadata } from "next";
import { Button, ButtonLink } from "@/components/ui/Button";
import { MessagePage } from "@/components/ui/MessagePage";
import { unsubscribeAction } from "@/features/newsletter/token-actions";

export const metadata: Metadata = {
  title: "Se désinscrire",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({ searchParams }: PageProps<"/newsletter/desinscription">) {
  const { token, statut } = await searchParams;

  if (statut === "effectuee") {
    return (
      <MessagePage
        eyebrow="Newsletter"
        title="Désinscription effectuée."
        actions={<ButtonLink href="/">Retour à l’accueil</ButtonLink>}
      >
        <p>Vous ne recevrez plus la newsletter de Woman of Power. Vous pouvez vous réinscrire à tout moment.</p>
      </MessagePage>
    );
  }

  if (statut === "invalide" || typeof token !== "string" || !token) {
    return (
      <MessagePage
        eyebrow="Newsletter"
        title="Ce lien n’est plus valable."
        actions={<ButtonLink href="/contact">Nous contacter</ButtonLink>}
      >
        <p>Votre adresse est peut-être déjà désinscrite. Pour toute difficulté, écrivez-nous : nous retirerons votre adresse.</p>
      </MessagePage>
    );
  }

  return (
    <MessagePage
      eyebrow="Newsletter"
      title="Se désinscrire de la newsletter"
      actions={
        <form action={unsubscribeAction}>
          <input type="hidden" name="token" value={token} />
          <Button type="submit" variant="brown" arrow={false}>
            Confirmer la désinscription
          </Button>
        </form>
      }
    >
      <p>Vous ne recevrez plus la lettre mensuelle de Woman of Power.</p>
    </MessagePage>
  );
}
