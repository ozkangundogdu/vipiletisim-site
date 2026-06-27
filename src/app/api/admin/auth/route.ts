import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyCredentials, createToken, COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!verifyCredentials(username ?? "", password ?? "")) {
    return Response.json({ error: "Kullanıcı adı veya şifre hatalı" }, { status: 401 });
  }

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
