import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Obtém a sessão do usuário atual
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Busca os dados do usuário no banco usando Prisma
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        whatsapp: true,
        zipCode: true,
        state: true,
        city: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados do perfil" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const data = await request.json();

    const updatedUser = await db.user.update({
      where: { email: session.user.email },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        whatsapp: data.whatsapp,
        zipCode: data.zipCode,
        state: data.state,
        city: data.city,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar dados do perfil" },
      { status: 500 }
    );
  }
}
