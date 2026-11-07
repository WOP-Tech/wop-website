import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSubtitle, type LegalSection } from "@/components/legal/LegalPage";
import { legalEntity as org } from "@/data/site";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Le site de Woman of Power n’utilise aucun cookie publicitaire ni de mesure d’audience.",
};

/*
 * ⚠️ À mettre à jour (avec un bandeau de consentement) si un outil soumis à consentement est ajouté :
 * mesure d'audience avec cookies, vidéos YouTube intégrées, pixels de réseaux sociaux…
 */
const sections: LegalSection[] = [
  {
    id: "definition",
    title: "Qu’est-ce qu’un cookie ?",
    content: (
      <p>
        Un cookie est un petit fichier déposé sur votre appareil lors de la visite d’un site. Plus largement, la
        réglementation vise tous les « traceurs » : cookies, stockage local du navigateur, pixels invisibles, etc.
      </p>
    ),
  },
  {
    id: "utilisation",
    title: "Les cookies sur ce site",
    content: (
      <>
        <p>
          <strong>Ce site ne dépose aucun cookie publicitaire, de réseau social ou de mesure d’audience.</strong> Aucun
          traceur soumis à votre consentement n’est utilisé : c’est pourquoi aucun bandeau de cookies ne s’affiche.
        </p>
        <LegalSubtitle>Polices de caractères</LegalSubtitle>
        <p>
          Les polices du site sont hébergées directement sur nos serveurs : votre navigateur ne contacte aucun service
          tiers (comme Google Fonts) pour les afficher.
        </p>
        <LegalSubtitle>Réseaux sociaux</LegalSubtitle>
        <p>
          Les boutons LinkedIn, Instagram et WhatsApp sont de simples liens. Ils ne déposent aucun cookie tant que vous
          ne cliquez pas ; une fois sur ces réseaux, leurs propres règles s’appliquent.
        </p>
      </>
    ),
  },
  {
    id: "evolution",
    title: "Évolution",
    content: (
      <p>
        Si nous ajoutons un jour un service nécessitant votre accord (par exemple une mesure d’audience avec cookies),
        nous vous le demanderons au préalable par un bandeau de consentement, et cette page sera mise à jour.
      </p>
    ),
  },
  {
    id: "parametres",
    title: "Gérer les cookies dans votre navigateur",
    content: (
      <p>
        Vous pouvez à tout moment consulter et supprimer les cookies depuis les réglages de votre navigateur (Chrome,
        Firefox, Safari, Edge…), rubrique « Confidentialité » ou « Données de sites ». La CNIL propose des{" "}
        <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/comment-se-proteger/maitriser-votre-navigateur" target="_blank" rel="noopener noreferrer">
          fiches pratiques
        </a>{" "}
        pour chaque navigateur.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Pour toute question : <a href={`mailto:${org.email}`}>{org.email}</a>. Le traitement de vos données est décrit
        dans la <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies"
      lead="Ce site respecte votre vie privée : il fonctionne sans cookie publicitaire ni outil de mesure d’audience."
      sections={sections}
    />
  );
}
