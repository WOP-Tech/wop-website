import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/**
 * Client Supabase côté serveur, authentifié avec la clé `service_role` (contourne la RLS).
 * Ne jamais l'importer dans un composant client : `server-only` fait échouer le build si c'est le cas.
 * Renvoie `null` si les variables d'environnement ne sont pas définies (formulaires alors « non activés »).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client =
    url && serviceKey
      ? createClient(url, serviceKey, {
          auth: { persistSession: false, autoRefreshToken: false },
          // Un Supabase lent ne doit pas bloquer le visiteur : chaque requête est abandonnée au bout de 8 s.
          global: { fetch: (input, init) => fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(8000) }) },
        })
      : null;
  return client;
}
