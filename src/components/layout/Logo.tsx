import Image from "next/image";
import logo from "@/assets/images/marque/logo-wop.png";

export function Logo({ className = "", preload = false }: { className?: string; preload?: boolean }) {
  return (
    <Image
      src={logo}
      alt="Woman of Power"
      preload={preload}
      sizes="190px"
      className={`block w-auto ${className}`}
    />
  );
}
