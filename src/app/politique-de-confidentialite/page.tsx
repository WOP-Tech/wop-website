import type { Metadata } from "next";
import Link from "next/link";
import { DefinitionTable, LegalPage, LegalSubtitle, type LegalSection } from "@/components/legal/LegalPage";
import { legalEntity as org } from "@/data/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment l’association Woman of Power collecte, utilise et protège vos données personnelles, et comment exercer vos droits.",
};

const mailto = <a href={`mailto:${org.email}`}>{org.email}</a>;

const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    content: (
      <>
        <p>
          Les données personnelles collectées sur ce site sont traitées par l’association {org.name}, {org.address}{" "}
          (SIRET {org.siret}), responsable du traitement au sens du Règlement général sur la protection des données
          (RGPD).
        </p>
        <p>Pour toute question relative à vos données : {mailto}.</p>
      </>
    ),
  },
  {
    id: "donnees",
    title: "Données collectées et finalités",
    content: (
      <>
        <p>Nous ne collectons que les données nécessaires, et uniquement lorsque vous nous les transmettez :</p>
        <LegalSubtitle>Formulaire de contact</LegalSubtitle>
        <DefinitionTable
          rows={[
            ["Données", "Prénom, adresse e-mail, objet et contenu du message."],
            ["Finalité", "Répondre à votre demande et assurer le suivi de nos échanges."],
            ["Base légale", "Intérêt légitime de l’association à répondre aux personnes qui la sollicitent."],
          ]}
        />
        <LegalSubtitle>Newsletter</LegalSubtitle>
        <DefinitionTable
          rows={[
            ["Données", "Adresse e-mail, date et preuve de l’inscription."],
            ["Finalité", "Vous envoyer l’actualité de WOP : programmes, rencontres et opportunités."],
            ["Base légale", "Votre consentement, que vous pouvez retirer à tout moment (lien de désinscription dans chaque envoi)."],
          ]}
        />
        <LegalSubtitle>Candidature pour devenir Woper</LegalSubtitle>
        <DefinitionTable
          rows={[
            ["Données", "Identité, coordonnées, situation et motivations que vous décrivez dans votre candidature."],
            ["Finalité", "Étudier votre candidature, échanger avec vous et organiser votre intégration à un programme."],
            ["Base légale", "Mesures préalables à votre participation, prises à votre demande."],
          ]}
        />
        <LegalSubtitle>Navigation sur le site</LegalSubtitle>
        <DefinitionTable
          rows={[
            ["Données", "Données techniques de connexion (adresse IP, navigateur, pages demandées), enregistrées par l’hébergeur."],
            ["Finalité", "Assurer le fonctionnement et la sécurité du site."],
            ["Base légale", "Intérêt légitime de l’association à sécuriser son site."],
          ]}
        />
        <p>
          Le site ne dépose aucun cookie publicitaire ou de mesure d’audience : voir la page{" "}
          <Link href="/cookies">Cookies</Link>.
        </p>
      </>
    ),
  },
  {
    id: "conservation",
    title: "Durées de conservation",
    content: (
      <ul>
        <li>Messages de contact : 3 ans à compter de notre dernier échange.</li>
        <li>Newsletter : jusqu’à votre désinscription ; la preuve de votre consentement est conservée 3 ans.</li>
        <li>
          Candidatures : pendant la durée de la sélection ; si votre candidature n’est pas retenue, 2 ans au plus, sauf
          opposition de votre part ; si vous devenez Woper, pendant votre participation puis 3 ans.
        </li>
        <li>Données techniques de connexion : durée limitée fixée par l’hébergeur pour la sécurité du site.</li>
      </ul>
    ),
  },
  {
    id: "destinataires",
    title: "Destinataires",
    content: (
      <>
        <p>
          Vos données sont destinées aux seuls membres de l’équipe WOP habilités à les traiter. Elles ne sont jamais
          vendues ni cédées à des fins commerciales.
        </p>
        <p>
          Elles sont confiées à des prestataires techniques agissant pour notre compte (sous-traitants), tenus à la
          confidentialité et à la sécurité des données :
        </p>
        <DefinitionTable
          rows={[
            [org.host.name, "Hébergement du site (États-Unis)."],
            // ⚠️ Vrai uniquement si le projet Supabase est créé dans une région UE (voir README).
            ["Supabase", "Base de données où sont enregistrés les messages et les inscriptions à la newsletter (Union européenne)."],
            ["Resend", "Envoi des e-mails : notification de vos messages à l’équipe, confirmation d’inscription (États-Unis)."],
          ]}
        />
      </>
    ),
  },
  {
    id: "transferts",
    title: "Transferts hors de l’Union européenne",
    content: (
      <p>
        Certains prestataires ({org.host.name}, Resend) sont établis aux États-Unis. Ces transferts sont
        encadrés par les garanties prévues par le RGPD : décision d’adéquation de la Commission européenne (EU-US Data
        Privacy Framework) ou clauses contractuelles types.
      </p>
    ),
  },
  {
    id: "securite",
    title: "Sécurité",
    content: (
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données contre la
        perte, l’accès non autorisé ou la divulgation : connexion chiffrée (HTTPS), accès restreint aux seules personnes
        habilitées.
      </p>
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    content: (
      <>
        <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
        <ul>
          <li>accès à vos données et obtention d’une copie ;</li>
          <li>rectification des données inexactes ;</li>
          <li>effacement de vos données ;</li>
          <li>limitation du traitement et opposition, pour motif légitime ;</li>
          <li>portabilité des données que vous nous avez fournies ;</li>
          <li>retrait de votre consentement à tout moment (newsletter) ;</li>
          <li>définition de directives sur le sort de vos données après votre décès.</li>
        </ul>
        <p>
          Pour les exercer, écrivez à {mailto}. Nous vous répondons dans un délai d’un mois. Une preuve d’identité
          peut vous être demandée en cas de doute raisonnable.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL :{" "}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">
            www.cnil.fr
          </a>{" "}
          ou 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
        </p>
      </>
    ),
  },
  {
    id: "mineurs",
    title: "Mineurs",
    content: (
      <p>
        Les programmes de WOP s’adressent aux jeunes femmes de 18 à 35 ans. Le site n’est pas destiné à collecter des
        données concernant des personnes de moins de 15 ans.
      </p>
    ),
  },
  {
    id: "reseaux-sociaux",
    title: "Réseaux sociaux",
    content: (
      <p>
        Les liens vers LinkedIn, Instagram et WhatsApp sont de simples liens : aucune donnée n’est transmise à ces
        réseaux tant que vous ne cliquez pas. Une fois sur leurs pages, leurs propres politiques de confidentialité
        s’appliquent.
      </p>
    ),
  },
  {
    id: "modifications",
    title: "Modifications",
    content: (
      <p>
        Cette politique peut être mise à jour, notamment en cas de nouveau service sur le site. La date de dernière
        mise à jour figure en haut de cette page.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      lead="L’association Woman of Power accorde une grande importance à la protection de vos données personnelles. Cette page explique quelles données nous collectons, pourquoi, combien de temps nous les conservons et comment exercer vos droits."
      sections={sections}
    />
  );
}
