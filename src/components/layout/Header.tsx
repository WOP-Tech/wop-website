"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { ctaNav, mainNav } from "@/data/site";
import { Logo } from "./Logo";

/** Pages dont le haut est une photo sombre : l'en-tête y est transparent, texte crème. */
const OVERLAY_ROUTES = new Set(["/"]);

function useHeaderScroll() {
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - last;
      setStuck(y > 40);
      if (y < 120 || delta < -4) setHidden(false);
      else if (delta > 4) setHidden(true);
      if (Math.abs(delta) > 4) last = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { stuck, hidden };
}

export function Header() {
  const pathname = usePathname();
  const { stuck, hidden } = useHeaderScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const overlay = OVERLAY_ROUTES.has(pathname) && !stuck;

  const closeMenu = () => {
    setMenuOpen(false);
    burgerRef.current?.focus();
  };

  return (
    <>
      <header
        className={`pointer-events-none fixed z-50 flex items-center justify-between gap-3 transition-[transform,background-color,box-shadow,left,right,top,padding,border-radius] duration-450 ease-out-soft ${
          stuck
            ? "top-[calc(10px+env(safe-area-inset-top,0px))] right-[max(12px,env(safe-area-inset-right,0px))] left-[max(12px,env(safe-area-inset-left,0px))] rounded-full bg-cream/94 py-2 pr-3 pl-5 shadow-[0_10px_32px_rgba(105,65,44,0.18)] backdrop-blur-[10px]"
            : "top-0 right-0 left-0 px-safe pt-[calc(14px+env(safe-area-inset-top,0px))]"
        } ${hidden && !menuOpen ? "-translate-y-[140%]" : ""}`}
      >
        <Link
          href="/"
          aria-label="Woman of Power, accueil"
          className={`pointer-events-auto ${overlay ? "rounded-full bg-cream px-3.5 py-1.5" : ""}`}
        >
          <Logo preload className={stuck ? "h-8" : "h-[38px]"} />
        </Link>

        <nav aria-label="Navigation principale" className="pointer-events-auto hidden items-center gap-1.5 nav:flex">
          {mainNav.map((link) => {
            const current = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`rounded-full px-1.5 py-3 font-display text-[0.92rem] leading-none font-medium whitespace-nowrap hover:bg-brown/6 ${
                  overlay ? "text-cream [text-shadow:0_1px_12px_rgba(60,35,22,0.5)]" : current ? "bg-brown/6" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={ctaNav.href}
            aria-current={pathname === ctaNav.href ? "page" : undefined}
            className="group inline-flex items-center gap-2.5 rounded-full bg-coral px-3.5 py-2.5 font-display text-[0.92rem] leading-none font-bold whitespace-nowrap text-cream"
          >
            {ctaNav.label} <ButtonArrow variant="coral" small />
          </Link>
        </nav>

        <button
          ref={burgerRef}
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen(true)}
          className="pointer-events-auto grid size-12 cursor-pointer place-content-center gap-1.5 rounded-full border-[1.5px] border-brown/40 bg-cream p-0 nav:hidden"
        >
          <span className="block h-0.5 w-5 rounded-sm bg-brown" />
          <span className="block h-0.5 w-5 rounded-sm bg-brown" />
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={`fixed inset-0 z-70 overflow-y-auto bg-brown px-safe pt-[calc(96px+env(safe-area-inset-top,0px))] pb-[calc(32px+env(safe-area-inset-bottom,0px))] text-cream transition-transform duration-500 ease-menu motion-reduce:transition-none ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-[calc(16px+env(safe-area-inset-top,0px))] right-[max(16px,env(safe-area-inset-right,0px))] min-h-11 cursor-pointer rounded-full border-[1.5px] border-cream/25 bg-transparent px-4 py-2.5 font-display text-[0.95rem] leading-none font-bold tracking-[0.14em] uppercase"
      >
        Fermer
      </button>
      <ul className="mb-7">
        {mainNav.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className="block border-b border-cream/25 py-3.5 font-display text-[clamp(1.56rem,6.24vw,2.81rem)] leading-none font-semibold tracking-[-0.04em]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <ButtonLink href={ctaNav.href} variant="cream" onClick={onClose}>
        {ctaNav.label}
      </ButtonLink>
    </div>
  );
}
