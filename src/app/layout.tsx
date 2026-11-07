import type { Metadata, Viewport } from "next";
import { League_Spartan, Tangerine } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// next/font auto-héberge les polices : aucune requête vers Google depuis le navigateur des visiteurs (RGPD).
const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  display: "swap",
});

const tangerine = Tangerine({
  variable: "--font-tangerine",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Open Sauce Sans (charte WOP) n'est pas sur Google Fonts : fichiers OFL embarqués dans src/assets/fonts.
const openSauce = localFont({
  variable: "--font-open-sauce",
  display: "swap",
  src: [
    { path: "../assets/fonts/open-sauce-sans/open-sauce-sans-latin-400-normal.woff", weight: "400", style: "normal" },
    { path: "../assets/fonts/open-sauce-sans/open-sauce-sans-latin-400-italic.woff", weight: "400", style: "italic" },
    { path: "../assets/fonts/open-sauce-sans/open-sauce-sans-latin-500-normal.woff", weight: "500", style: "normal" },
    { path: "../assets/fonts/open-sauce-sans/open-sauce-sans-latin-600-normal.woff", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#fff6ea",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${leagueSpartan.variable} ${tangerine.variable} ${openSauce.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed -top-16 left-3 z-200 rounded-full bg-brown px-5 py-3 font-semibold text-cream transition-[top] duration-200 focus:top-3"
        >
          Aller au contenu
        </a>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
