import Link from "next/link";
import type { ReactNode } from "react";
import { SocialGlyph, SocialLinkItem } from "@/components/ui/SocialIcon";
import { footerNav, legalNav, site, socialLinks } from "@/data/site";
import { NewsletterForm } from "@/features/newsletter/NewsletterForm";
import { Container } from "./Container";
import { Logo } from "./Logo";

const linkClass = "inline-block min-h-11 py-[11px] hover:underline hover:underline-offset-[5px]";

function FooterColumn({ title, tight = false, children }: { title: string; tight?: boolean; children: ReactNode }) {
  return (
    <div>
      <h3 className={`${tight ? "mb-2.5" : "mb-4"} font-display text-[1.1rem] leading-none font-semibold tracking-[-0.01em]`}>{title}</h3>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-cream pt-[clamp(34.56px,5.76vh,63.36px)] pb-[calc(28px+env(safe-area-inset-bottom,0px))] text-brown">
      <Container>
        <section
          aria-labelledby="newsletter-title"
          className="mb-[clamp(32px,5vh,56px)] grid grid-cols-[minmax(0,1fr)] items-center gap-x-12 gap-y-5 rounded-[28px] border border-brown/15 bg-[linear-gradient(120deg,rgba(246,181,74,0.26),rgba(231,107,112,0.18))] px-[clamp(22px,3.4vw,44px)] py-[clamp(22px,3vw,34px)] tab:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
        >
          <div>
            <p className="eyebrow mb-2 opacity-70">Newsletter</p>
            <h2 id="newsletter-title" className="mb-1 font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
              Suivre l’actualité de WOP
            </h2>
            <p className="text-[0.95rem] opacity-85">Une lettre par mois : programmes, rencontres et opportunités.</p>
          </div>
          <NewsletterForm />
        </section>

        <div className="grid grid-cols-2 gap-8 tab:grid-cols-[minmax(0,1.3fr)_minmax(0,1.3fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="col-span-full tab:col-span-1">
            <Link href="/" aria-label="Woman of Power, accueil" className="inline-block">
              <Logo className="h-[76px]" />
            </Link>
          </div>

          <FooterColumn title="Explorer WOP" tight>
            <ul className="grid gap-2.5 text-[0.88rem]">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact">
            <ul className="grid gap-2.5 text-[0.88rem]">
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} [overflow-wrap:anywhere]`}>
                  {site.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <SocialLinkItem
                  key={social.label}
                  link={social}
                  iconOnly
                  className="flex size-[46px] items-center justify-center rounded-full border-[1.5px] border-brown"
                  activeClassName="transition-[background-color,color,transform] duration-250 hover:-translate-y-[3px] hover:bg-brown hover:text-cream focus-visible:bg-brown focus-visible:text-cream"
                >
                  <SocialGlyph network={social.label} strokeWidth={1.9} className="size-[23px]" />
                </SocialLinkItem>
              ))}
            </div>
          </FooterColumn>

          <FooterColumn title="Informations légales">
            <ul className="grid gap-2.5 text-[0.88rem]">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        <p className="mt-[clamp(28px,5vh,48px)] border-t border-brown/15 pt-5 text-[0.85rem] opacity-75">
          <small>© {new Date().getFullYear()} Woman of Power. Tous droits réservés.</small>
        </p>
      </Container>
    </footer>
  );
}
