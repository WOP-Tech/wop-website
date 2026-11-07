import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/decouvrir", priority: 0.8, changeFrequency: "monthly" },
  { path: "/devenir-woper", priority: 0.9, changeFrequency: "monthly" },
  { path: "/equipe", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/soutenir", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
  { path: "/politique-de-confidentialite", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency,
    priority,
  }));
}
