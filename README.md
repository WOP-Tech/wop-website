# Site vitrine Woman of Power (WOP)

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Supabase · Resend · hébergement Vercel.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs (voir ci-dessous)
npm run dev                  # http://localhost:3000
```

Sans `.env.local`, le site fonctionne entièrement ; seuls les formulaires (contact, newsletter) affichent « pas encore activé ».

## Configurer les formulaires

### 1. Supabase (base de données)

1. Créer un projet sur [supabase.com](https://supabase.com) **en choisissant une région de l’Union européenne** (Paris ou Francfort) : la politique de confidentialité l’annonce.
2. *SQL Editor* → coller [`supabase/migrations/20261107000000_formulaires.sql`](supabase/migrations/20261107000000_formulaires.sql) → *Run*.
3. *Project Settings → API* : copier l’URL dans `SUPABASE_URL` et la clé **service_role** dans `SUPABASE_SERVICE_ROLE_KEY`.

> ⚠️ La clé `service_role` donne tous les droits sur la base : uniquement dans `.env.local` et dans Vercel, jamais dans le code, jamais préfixée par `NEXT_PUBLIC_`. Les tables ont la RLS activée sans policy : la clé publique n’y a aucun accès.

Les messages et les inscriptions se consultent dans *Table Editor* (`contact_messages`, `newsletter_subscribers`).

### 2. Resend (e-mails)

1. Créer un compte sur [resend.com](https://resend.com), puis *Domains* → ajouter le domaine du site et créer les enregistrements DNS indiqués (SPF, DKIM).
2. *API Keys* → créer une clé « Sending access » → `RESEND_API_KEY`.
3. `EMAIL_FROM` : une adresse sur ce domaine vérifié, ex. `Woman of Power <contact@womanofpower.org>`.

Sans domaine vérifié, Resend n’envoie qu’à l’adresse du compte : pratique pour tester, pas pour la production.

### 3. Vercel

Reporter les variables de `.env.example` dans *Project → Settings → Environment Variables*, puis redéployer.

## Fonctionnement

- **Contact** : chaque message est enregistré dans Supabase et notifié à `CONTACT_INBOX` ; « Répondre » écrit directement au visiteur.
- **Newsletter** : double opt-in (recommandation CNIL). L’inscription est « en attente » jusqu’au clic sur le bouton de la page `/newsletter/confirmation`. Chaque newsletter envoyée doit contenir le lien `/newsletter/desinscription?token=<unsubscribe_token>` de l’abonné·e.
- Envoi des newsletters elles-mêmes : non inclus (à faire depuis Resend *Broadcasts* ou un outil dédié, à partir des abonné·es `confirmed`).

## Organisation du code

```
src/
├── app/            routes (une page = un dossier) ; la page orchestre, elle n’implémente pas
├── components/     composants génériques (layout, ui, legal)
├── features/       logique métier WOP : une fonctionnalité = ses composants, données et actions
├── data/site.ts    informations centrales : navigation, réseaux, liens à venir, mentions légales
├── lib/            utilitaires ; lib/server/ = code serveur uniquement (Supabase, Resend)
└── assets/         images (voir assets/images/LISEZ-MOI.md) et polices
```

Charte graphique : tokens dans [`src/app/globals.css`](src/app/globals.css) — aucune couleur en dur dans les composants.

## Workflow Git

`main` (stable) ← `dev` (intégration) ← `feat/…`, `fix/…`. Commits : `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`. Une pull request relue par l’autre avant fusion dans `dev`.
