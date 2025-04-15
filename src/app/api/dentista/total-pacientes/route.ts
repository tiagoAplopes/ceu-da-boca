import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const totalPacientes = await db.user.count({
      where: {
        type: "patient",
      },
    });

    return NextResponse.json({ total: totalPacientes });
  } catch (error) {
    console.error("Erro ao buscar total de pacientes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar total de pacientes" },
      { status: 500 }
    );
  }
}
