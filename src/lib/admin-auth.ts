import crypto from "crypto";

const COOKIE_NAME = "vip_admin_session";
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET not set");
  return s;
}

export function createToken(): string {
  const ts = Date.now();
  const sig = crypto.createHmac("sha256", getSecret()).update(String(ts)).digest("hex");
  return Buffer.from(JSON.stringify({ ts, sig })).toString("base64url");
}

export function verifyToken(token: string): boolean {
  try {
    const { ts, sig } = JSON.parse(Buffer.from(token, "base64url").toString("utf-8"));
    if (typeof ts !== "number" || typeof sig !== "string") return false;
    if (Date.now() - ts > EXPIRY_MS) return false;
    const expected = crypto.createHmac("sha256", getSecret()).update(String(ts)).digest("hex");
    if (sig.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export function verifyCredentials(username: string, password: string): boolean {
  const correctUser = process.env.ADMIN_USERNAME;
  const correctPass = process.env.ADMIN_PASSWORD;
  if (!correctUser || !correctPass) return false;
  try {
    const userMatch =
      username.length === correctUser.length &&
      crypto.timingSafeEqual(Buffer.from(username), Buffer.from(correctUser));
    const passMatch =
      password.length === correctPass.length &&
      crypto.timingSafeEqual(Buffer.from(password), Buffer.from(correctPass));
    return userMatch && passMatch;
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
