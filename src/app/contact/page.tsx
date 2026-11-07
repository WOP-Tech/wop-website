import type { Metadata } from "next";
import { ContactEmail, ContactFormSection, ContactHero, ContactSocials } from "@/features/contact/ContactSections";

export const metadata: Metadata = {
  title: "Nous contacter",
  description:
    "Une question, une proposition de collaboration ou de partenariat ? Écrivez à l’équipe Woman of Power.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <ContactEmail />
      <ContactSocials />
    </>
  );
}
