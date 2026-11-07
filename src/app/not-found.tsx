import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { MessagePage } from "@/components/ui/MessagePage";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <MessagePage
      eyebrow="Erreur 404"
      title={
        <>
          Cette page s’est <em>égarée.</em>
        </>
      }
      actions={
        <>
          <ButtonLink href="/" variant="brown">
            Revenir à l’accueil
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost-dark" arrow={false}>
            Nous contacter
          </ButtonLink>
        </>
      }
    >
      <p>Le lien est peut-être incorrect, ou la page a été déplacée. Reprenons depuis l’accueil.</p>
    </MessagePage>
  );
}
