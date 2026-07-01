import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyCredentials, createToken, COOKIE_NAME } from "@/lib/admin-auth";

// Basit IP bazlı hız sınırlama: 15 dakikada en fazla 5 hatalı deneme.
// Tek instance/VPS dağıtımı için yeterli; bellek içi olduğundan sunucu
// yeniden başlatıldığında sıfırlanır.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; windowStart: number }>();

function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const entry = attempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.windowStart > WINDOW_MS) {
    attempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string): void {
  const entry = attempts.get(ip);
  if (!entry || Date.now() - entry.windowStart > WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: Date.now() });
  } else {
    entry.count += 1;
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Çok fazla başarısız deneme. Lütfen 15 dakika sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  const { username, password } = await request.json();

  if (!verifyCredentials(username ?? "", password ?? "")) {
    recordFailedAttempt(ip);
    return Response.json({ error: "Kullanıcı adı veya şifre hatalı" }, { status: 401 });
  }

  attempts.delete(ip);
  const token = createToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return Response.json({ ok: true });
}
