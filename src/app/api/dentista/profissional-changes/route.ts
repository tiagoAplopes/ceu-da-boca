import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const profissionalChanges = await db.profissionalChange.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(profissionalChanges);
  } catch (error) {
    console.error("Erro ao buscar alterações do dentista:", error);
    return NextResponse.json(
      { error: "Erro ao buscar alterações" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { alteracoes } = await request.json();
    const userId = (session.user as any).id;

    // Usando transação para garantir consistência
    const result = await db.$transaction(async (tx) => {
      // Remove alterações antigas
      await tx.profissionalChange.deleteMany({
        where: {
          userId: userId,
        },
      });

      // Insere novas alterações
      const newChanges = await Promise.all(
        alteracoes.map((changeId: string) =>
          tx.profissionalChange.create({
            data: {
              userId: userId,
              changeId: parseInt(changeId),
            },
          })
        )
      );

      return newChanges;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao salvar alterações do dentista:", error);
    return NextResponse.json(
      { error: "Erro ao salvar alterações" },
      { status: 500 }
    );
  }
}
