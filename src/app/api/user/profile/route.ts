import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import * as z from "zod";

const profileSchema = z.object({
  cro: z.string().min(4),
  cpf: z.string().length(11),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().min(11),
  zipCode: z.string().length(8),
  state: z.string().length(2),
  city: z.string().min(2),
  number: z.string().min(1),
  address: z.string().min(5),
  complement: z.string().optional(),
  district: z.string().min(2),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }, // Alterado de id para email
      select: {
        cro: true,
        cpf: true,
        firstName: true,
        lastName: true,
        email: true,
        whatsapp: true,
        zipCode: true,
        state: true,
        city: true,
        number: true,
        address: true,
        complement: true,
        district: true,
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
      { error: "Erro ao buscar perfil" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Received body:", body); // Log para debug

    const validatedData = profileSchema.parse(body);
    console.log("Validated data:", validatedData); // Log para debug

    const updatedUser = await db.user.update({
      where: { id: session.user.email },
      data: {
        cro: validatedData.cro,
        cpf: validatedData.cpf,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        whatsapp: validatedData.whatsapp,
        zipCode: validatedData.zipCode,
        state: validatedData.state,
        city: validatedData.city,
        number: validatedData.number,
        address: validatedData.address,
        complement: validatedData.complement,
        district: validatedData.district,
      },
    });

    console.log("Updated user:", updatedUser); // Log para debug

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Erro ao atualizar perfil" },
      { status: 500 }
    );
  }
}
