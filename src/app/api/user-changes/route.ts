import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Busca apenas os registros do usuário atual
    const userChanges = await db.userChange.findMany({
      where: {
        userId: (session.user as any).id,
      },
      select: {
        id: true,
        userId: true,
        changeId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(userChanges);
  } catch (error) {
    console.error("Erro ao buscar alterações do usuário:", error);
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
      await tx.userChange.deleteMany({
        where: {
          userId: userId,
        },
      });

      // Insere novas alterações
      const newChanges = await Promise.all(
        alteracoes.map((changeId: number) =>
          tx.userChange.create({
            data: {
              userId: userId,
              changeId: changeId,
            },
          })
        )
      );

      return newChanges;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao salvar alterações:", error);
    return NextResponse.json(
      { error: "Erro ao salvar alterações" },
      { status: 500 }
    );
  }
}
