import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Dev uniquement : permet de tester depuis un téléphone sur le réseau local (adresse IP au lieu de localhost).
  // Sans cela, Next.js bloque ses scripts de dev : la page s'affiche mais sans JavaScript (ni animations, ni menu).
  allowedDevOrigins: ["192.168.*.*", "172.*.*.*", "10.*.*.*"],
};

export default nextConfig;
