import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { dentistaId } = await request.json();

    // Verifica se o usuário logado é do tipo patient
    const usuarioLogado = await db.user.findUnique({
      where: { id: (session.user as any).id },
      select: { type: true },
    });

    if (usuarioLogado?.type !== "patient") {
      return NextResponse.json(
        { error: "Apenas pacientes podem registrar visitas" },
        { status: 403 }
      );
    }

    // Incrementa o contador de visitas do dentista
    await db.user.update({
      where: { id: dentistaId },
      data: {
        visits: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ message: "Visita registrada com sucesso" });
  } catch (error) {
    console.error("Erro ao registrar visita:", error);
    return NextResponse.json(
      { error: "Erro ao registrar visita" },
      { status: 500 }
    );
  }
}
