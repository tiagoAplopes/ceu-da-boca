import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isLoginPage = request.nextUrl.pathname === "/login";

  // Se não estiver logado e não estiver na página de login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se estiver logado e estiver na página de login, redireciona para home apropriada
  if (token && isLoginPage) {
    const redirectUrl =
      token.type === "dentist" ? "/dentista/home" : "/paciente/home";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Redireciona da página inicial com base no tipo do usuário
  if (request.nextUrl.pathname === "/") {
    if (token?.type === "dentist") {
      return NextResponse.redirect(new URL("/dentista/home", request.url));
    }
    if (token?.type === "patient") {
      return NextResponse.redirect(new URL("/paciente/home", request.url));
    }
  }

  // Protege rotas de paciente
  if (request.nextUrl.pathname.startsWith("/paciente")) {
    if (!token || token.type !== "patient") {
      return NextResponse.redirect(new URL("/dentista/home", request.url));
    }
  }

  // Protege rotas de dentista
  if (request.nextUrl.pathname.startsWith("/dentista")) {
    if (!token || token.type !== "dentist") {
      return NextResponse.redirect(new URL("/paciente/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/paciente/:path*", "/dentista/:path*"],
};
