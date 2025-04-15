"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Especialidade {
  id: string;
  nome: string;
  mostrarDescricao?: boolean;
}

interface Urgencia {
  id: number;
  nome: string;
  created_at: string;
  updated_at: string;
  url: string;
  mostrarDescricao?: boolean;
}

export default function EspecialidadesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [urgencias, setUrgencias] = useState<Urgencia[]>([]);
  const [selectedEspecialidades, setSelectedEspecialidades] = useState<
    string[]
  >([]);
  const [selectedUrgencia, setSelectedUrgencia] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      carregarDados();
    }
  }, [status]);

  const carregarDados = async () => {
    try {
      await Promise.all([
        carregarEspecialidades(),
        carregarUrgencias(),
        carregarDadosUsuario(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const carregarDadosUsuario = async () => {
    try {
      const response = await fetch("/api/dentista/especialidades");
      if (!response.ok) throw new Error("Erro ao carregar dados do usuário");
      const data = await response.json();
      setSelectedEspecialidades(data.especialidades);
      setSelectedUrgencia(data.urgencia);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      toast.error("Erro ao carregar seus dados");
    }
  };

  const carregarEspecialidades = async () => {
    try {
      const response = await fetch("/assets/mocks/especialidades.json");
      if (!response.ok) throw new Error("Erro ao carregar especialidades");
      const data = await response.json();
      setEspecialidades(
        data.map((esp: Especialidade) => ({ ...esp, mostrarDescricao: false }))
      );
    } catch (error) {
      console.error("Erro ao carregar especialidades:", error);
      toast.error("Erro ao carregar especialidades");
    }
  };

  const carregarUrgencias = async () => {
    try {
      const response = await fetch("/assets/mocks/urgencias.json");
      if (!response.ok) throw new Error("Erro ao carregar urgências");
      const data = await response.json();
      setUrgencias(
        data.map((urg: Urgencia) => ({ ...urg, mostrarDescricao: false }))
      );
    } catch (error) {
      console.error("Erro ao carregar urgências:", error);
      toast.error("Erro ao carregar urgências");
    }
  };

  const handleCheckboxChange = (
    id: string | number,
    tipo: "especialidade" | "urgencia"
  ) => {
    if (tipo === "especialidade") {
      setSelectedEspecialidades((prev) =>
        prev.includes(id as string)
          ? prev.filter((item) => item !== id)
          : [...prev, id as string]
      );
    } else {
      setSelectedUrgencia((prev: string) =>
        prev.includes(id.toString()) ? "" : id.toString()
      );
    }
  };

  const handleSalvar = async () => {
    try {
      if (status !== "authenticated") {
        router.push("/auth/login");
        return;
      }

      const response = await fetch("/api/dentista/especialidades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          especialidades: selectedEspecialidades,
          urgencia: selectedUrgencia,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar seleções");
      }

      toast.success("Seleções salvas com sucesso!");
      router.push("/dentista/home");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar seleções");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EBF3FF] to-white">
      <div className="container mx-auto max-w-2xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-center relative mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full absolute left-0"
            onClick={() => router.push("/dentista/minha-estrela")}
          >
            <ChevronLeft className="h-5 w-5 text-blue-600" />
          </Button>
          <h1 className="text-xl font-semibold text-blue-600">
            Editar especialidades
          </h1>
        </div>

        {/* Especialidades */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Especialidades</h2>
          <div className="space-y-4">
            {especialidades.map((especialidade) => (
              <div
                key={especialidade.id}
                className="rounded-lg border border-blue-100 bg-white p-4 transition-all hover:border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={`especialidade-${especialidade.id}`}
                      checked={selectedEspecialidades.includes(
                        especialidade.id
                      )}
                      onCheckedChange={() =>
                        handleCheckboxChange(especialidade.id, "especialidade")
                      }
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`especialidade-${especialidade.id}`}
                        className="text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        {especialidade.nome}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Urgências */}
          <h2 className="text-lg font-medium text-gray-900 mt-8">Urgência</h2>
          <RadioGroup
            value={selectedUrgencia}
            onValueChange={setSelectedUrgencia}
            className="space-y-4"
          >
            {urgencias.map((urgencia) => (
              <div
                key={urgencia.id}
                className="rounded-lg border border-blue-100 bg-white p-4 transition-all hover:border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <RadioGroupItem
                      value={urgencia.id.toString()}
                      id={`urgencia-${urgencia.id}`}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`urgencia-${urgencia.id}`}
                        className="text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        {urgencia.nome}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Botões */}
        <div className="flex justify-between gap-4 mt-8">
          <Button
            variant="outline"
            className="flex-1 py-6"
            onClick={() => router.push("/dentista/minha-estrela")}
          >
            Voltar
          </Button>
          <Button
            variant="default"
            className="flex-1 py-6 bg-blue-600 hover:bg-blue-700"
            onClick={handleSalvar}
          >
            Salvar
          </Button>
        </div>
      </div>
    </main>
  );
}
