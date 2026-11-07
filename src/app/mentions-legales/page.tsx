import type { Metadata } from "next";
import Link from "next/link";
import { DefinitionTable, LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { legalEntity as org } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de l’association Woman of Power : éditeur, directeur de la publication, hébergeur.",
};

const mailto = <a href={`mailto:${org.email}`}>{org.email}</a>;

const sections: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    content: (
      <>
        <p>Le présent site est édité par :</p>
        <DefinitionTable
          rows={[
            ["Dénomination", org.name],
            ["Forme juridique", org.form],
            ["Siège social", org.address],
            ["SIRET", org.siret],
            ["E-mail", mailto],
            ...(org.phone ? ([["Téléphone", org.phone]] as [string, string][]) : []),
          ]}
        />
      </>
    ),
  },
  {
    id: "publication",
    title: "Directeur de la publication",
    content: <p>Le directeur de la publication est {org.publicationDirector}, en sa qualité de représentante légale de l’association.</p>,
  },
  {
    id: "hebergement",
    title: "Hébergement",
    content: (
      <>
        <p>Le site est hébergé par :</p>
        <DefinitionTable
          rows={[
            ["Hébergeur", org.host.name],
            ["Adresse", org.host.address],
            [
              "Site web",
              <a key="host" href={org.host.website} target="_blank" rel="noopener noreferrer">
                {org.host.website.replace("https://", "")}
              </a>,
            ],
          ]}
        />
      </>
    ),
  },
  {
    id: "propriete-intellectuelle",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          L’ensemble des contenus de ce site (textes, logo, identité visuelle, illustrations, photographies) est la
          propriété de l’association {org.name} ou fait l’objet d’une autorisation d’utilisation. Toute reproduction,
          représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite (articles
          L.122-4 et suivants du Code de la propriété intellectuelle).
        </p>
        <p>
          Les marques et logos de tiers éventuellement cités (LinkedIn, Instagram, WhatsApp…) appartiennent à leurs
          propriétaires respectifs.
        </p>
      </>
    ),
  },
  {
    id: "credits",
    title: "Crédits",
    content: (
      <>
        <p>Conception et réalisation : association {org.name}.</p>
        {/* TODO(équipe WOP) : préciser les sources des photos (banques d'images, photographes) et leurs licences. */}
        <p>
          Photographies : association {org.name} et banques d’images. Pour toute question relative à l’utilisation
          d’une image, ou pour demander son retrait, écrivez à {mailto}.
        </p>
      </>
    ),
  },
  {
    id: "donnees-personnelles",
    title: "Données personnelles et cookies",
    content: (
      <p>
        Le traitement de vos données personnelles est décrit dans la{" "}
        <Link href="/politique-de-confidentialite">politique de confidentialité</Link>. L’utilisation des cookies est
        présentée sur la page <Link href="/cookies">Cookies</Link>.
      </p>
    ),
  },
  {
    id: "liens",
    title: "Liens externes",
    content: (
      <p>
        Le site peut contenir des liens vers des sites tiers (réseaux sociaux, plateformes partenaires). L’association
        n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
      </p>
    ),
  },
  {
    id: "responsabilite",
    title: "Responsabilité",
    content: (
      <p>
        L’association s’efforce de fournir des informations exactes et à jour, sans pouvoir garantir l’absence d’erreur
        ou d’omission. Pour signaler un contenu inexact ou illicite, écrivez à {mailto}.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    title: "Droit applicable",
    content: (
      <p>
        Les présentes mentions sont régies par le droit français. En cas de litige, et à défaut de résolution amiable,
        les tribunaux français seront compétents.
      </p>
    ),
  },
];

export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Mentions légales"
      lead="Conformément à l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), voici les informations relatives à l’éditeur et à l’hébergeur de ce site."
      sections={sections}
    />
  );
}
