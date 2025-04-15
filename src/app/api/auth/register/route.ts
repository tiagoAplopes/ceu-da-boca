import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedFields = registerSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const {
      firstName,
      lastName,
      email,
      whatsapp,
      zipCode,
      state,
      city,
      password,
      type,
    } = validatedFields.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        whatsapp,
        zipCode,
        state,
        city,
        hashedPassword,
        type,
        ...(type === "dentist"
          ? {
              cpf: validatedFields.data.cpf,
              cro: validatedFields.data.cro,
              croState: validatedFields.data.croState,
              address: validatedFields.data.address,
              number: validatedFields.data.number,
              complement: validatedFields.data.complement,
              district: validatedFields.data.district,
            }
          : {}),
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        type: user.type,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
