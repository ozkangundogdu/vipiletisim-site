import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Giriş sayfası ve giriş/çıkış API'si oturum gerektirmeden erişilebilir olmalı.
  if (pathname === "/vippanel/giris" || pathname === "/api/vippanel/auth") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const authenticated = !!token && verifyToken(token);

  if (pathname.startsWith("/api/vippanel")) {
    // API route'ları HTML'e yönlendirilemez; oturumsuz istek 401 JSON almalı.
    if (!authenticated) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (!authenticated) {
    const loginUrl = new URL("/vippanel/giris", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vippanel/:path*", "/api/vippanel/:path*"],
};
