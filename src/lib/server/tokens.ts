import "server-only";
import { createHash, randomBytes } from "node:crypto";

/** Jeton aléatoire non devinable, sûr dans une URL. */
export function createToken() {
  return randomBytes(32).toString("base64url");
}

/** Empreinte stockée en base à la place du jeton : une fuite de la base ne permet pas de confirmer des inscriptions. */
export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
