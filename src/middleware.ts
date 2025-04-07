import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protege rotas de paciente
  if (
    request.nextUrl.pathname.startsWith("/paciente") &&
    token.type !== "patient"
  ) {
    return NextResponse.redirect(new URL("/dentista/home", request.url));
  }

  // Protege rotas de dentista
  if (
    request.nextUrl.pathname.startsWith("/dentista") &&
    token.type !== "dentist"
  ) {
    return NextResponse.redirect(new URL("/paciente/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/paciente/:path*", "/dentista/:path*"],
};
