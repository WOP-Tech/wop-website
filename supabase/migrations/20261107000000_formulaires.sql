-- Tables des formulaires du site WOP (contact, newsletter).
-- À exécuter une fois dans Supabase : Dashboard → SQL Editor → coller ce fichier → Run.
--
-- Sécurité : la RLS (Row Level Security) est activée SANS aucune policy.
-- Les clés publiques (anon / publishable) n'ont donc AUCUN accès à ces tables ;
-- seul le serveur Next.js, avec la clé service_role (jamais exposée au navigateur), peut lire et écrire.

-- Messages du formulaire de contact -------------------------------------------------------------
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  first_name  text not null check (char_length(first_name) between 1 and 80),
  email       text not null check (char_length(email) between 3 and 254),
  subject     text not null check (char_length(subject) <= 80),
  message     text not null check (char_length(message) between 10 and 5000)
);

comment on table public.contact_messages is
  'Messages du formulaire de contact. Conservation : 3 ans après le dernier échange (politique de confidentialité).';

alter table public.contact_messages enable row level security;

-- Abonné·es à la newsletter (double opt-in) ------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id                    uuid primary key default gen_random_uuid(),
  email                 text not null unique check (char_length(email) between 3 and 254),
  status                text not null default 'pending' check (status in ('pending', 'confirmed', 'unsubscribed')),
  -- Empreinte SHA-256 du jeton envoyé par e-mail (le jeton lui-même n'est jamais stocké).
  confirm_token_hash    text unique,
  -- Jeton personnel à insérer dans le lien de désinscription de chaque newsletter.
  unsubscribe_token     text not null unique default replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
  consent_text          text not null,
  created_at            timestamptz not null default now(),
  confirmation_sent_at  timestamptz,
  confirmed_at          timestamptz,
  unsubscribed_at       timestamptz
);

comment on table public.newsletter_subscribers is
  'Newsletter en double opt-in. consent_text + confirmed_at = preuve du consentement (RGPD).';

alter table public.newsletter_subscribers enable row level security;
