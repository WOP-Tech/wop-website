/**
 * URL publique du site (sans barre finale), à définir dans la variable d'environnement `NEXT_PUBLIC_SITE_URL`
 * sur Vercel (ex. https://womanofpower.org). Sert aux métadonnées, au sitemap et au robots.txt.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
