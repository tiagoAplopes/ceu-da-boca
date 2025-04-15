import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        urgency: true,
      },
    });

    const userSpecialties = await db.userSpecialty.findMany({
      where: { userId: userId },
      select: { specialtyId: true },
    });

    return NextResponse.json({
      especialidades: userSpecialties.map((spec) => spec.specialtyId),
      urgencia: user?.urgency || "",
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
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

    const { especialidades, urgencia } = await request.json();
    const userId = (session.user as any).id;

    await db.$transaction(async (tx) => {
      // Atualiza a urgência do usuário
      await tx.user.update({
        where: { id: userId },
        data: { urgency: urgencia },
      });

      // Remove especialidades antigas
      await tx.userSpecialty.deleteMany({
        where: { userId: userId },
      });

      // Insere novas especialidades
      await Promise.all(
        especialidades.map((specialtyId: string) =>
          tx.userSpecialty.create({
            data: {
              userId: userId,
              specialtyId: specialtyId,
            },
          })
        )
      );
    });

    return NextResponse.json({ message: "Dados salvos com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    return NextResponse.json(
      { error: "Erro ao salvar dados" },
      { status: 500 }
    );
  }
}
