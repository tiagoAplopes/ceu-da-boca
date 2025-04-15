import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetUsers() {
  try {
    // Primeiro deleta todas as UserChanges relacionadas
    await prisma.userChange.deleteMany({});

    // Depois deleta todos os usuários
    await prisma.user.deleteMany({});

    console.log("Tabela de usuários resetada com sucesso");
  } catch (error) {
    console.error("Erro ao resetar tabela:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetUsers();
