"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MeuEspacoPage() {
  const router = useRouter();
  const [totalPacientes, setTotalPacientes] = useState<number>(0);
  const [totalVisitas, setTotalVisitas] = useState<number>(0);

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar total de pacientes
        const responsePacientes = await fetch("/api/dentista/total-pacientes");
        if (!responsePacientes.ok)
          throw new Error("Falha ao carregar dados de pacientes");
        const dataPacientes = await responsePacientes.json();
        setTotalPacientes(dataPacientes.total);

        // Buscar dados do usuário logado (incluindo visitas)
        const responseUsuario = await fetch("/api/usuario");
        if (!responseUsuario.ok)
          throw new Error("Falha ao carregar dados do usuário");
        const dataUsuario = await responseUsuario.json();
        setTotalVisitas(dataUsuario.visits || 0);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EBF3FF] to-white p-4 flex flex-col items-center">
      <div className="flex items-center w-full max-w-2xl mb-8">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.push("/dentista/minha-estrela")}
        >
          <ChevronLeft className="h-5 w-5 text-blue-600" />
        </Button>
        <h1 className="text-xl font-semibold text-blue-600 flex-1 text-center">
          Editar especialidades
        </h1>
        <div className="w-10" /> {/* Spacer to balance the button */}
      </div>
      <Card className="max-w-2xl mx-auto w-full border border-blue-100 hover:border-blue-200">
        <CardHeader>
          {/* Cards Stack */}
          <div className="flex flex-col gap-4">
            {/* Card 1 - Clientes em Potencial */}
            <div className="bg-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg  mb-6 text-center mx-auto max-w-[250px]">
                Quantos clientes em potencial!
              </h3>
              <div className="text-center">
                <p className="text-3xl font-bold">{totalPacientes}</p>
                <p className="text-lg">Usuários Espaciais</p>
              </div>
            </div>

            {/* Card 2 - Visitantes do Perfil */}
            <div className="bg-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg mb-6 text-center mx-auto max-w-[250px]">
                Números de usuários que visitaram seu perfil
              </h3>
              <div className="text-center">
                <p className="text-3xl font-bold">{totalVisitas}</p>
                <p className="text-lg">Usuários cadentes</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </main>
  );
}
