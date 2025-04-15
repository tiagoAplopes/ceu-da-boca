import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhuma imagem fornecida" },
        { status: 400 }
      );
    }

    // Converter o arquivo para base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload para o Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "user-images", // pasta onde as imagens serão salvas
      transformation: [
        { width: 800, height: 800, crop: "limit" }, // redimensiona mantendo proporção
        { quality: "auto" }, // otimiza qualidade
        { fetch_format: "auto" }, // converte para melhor formato
      ],
    });

    // Atualiza o imageLink do usuário no banco de dados
    const updatedUser = await db.user.update({
      where: {
        id: (session.user as any).id,
      },
      data: {
        image: uploadResponse.secure_url,
      },
    });

    return NextResponse.json({
      imageUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: "Erro ao fazer upload da imagem" },
      { status: 500 }
    );
  }
}

// Rota para deletar imagem
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { publicId } = await request.json();

    // Deleta a imagem do Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Remove o imageLink do usuário
    await db.user.update({
      where: {
        id: (session.user as any).id,
      },
      data: {
        image: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    return NextResponse.json(
      { error: "Erro ao deletar imagem" },
      { status: 500 }
    );
  }
}
