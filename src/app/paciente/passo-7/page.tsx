"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Alteracao {
  id: number;
  nome: string;
  descricao: string;
  mostrarDescricao?: boolean;
}

export default function Passo7Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [alteracoes, setAlteracoes] = useState<Alteracao[]>([]);
  const [selectedAlteracoes, setSelectedAlteracoes] = useState<number[]>([]);

  useEffect(() => {
    carregarAlteracoes();
  }, []);

  const carregarAlteracoes = async () => {
    try {
      const response = await fetch("/assets/mocks/alteracoes.json");
      const data = await response.json();
      setAlteracoes(
        data.map((alt: Alteracao) => ({ ...alt, mostrarDescricao: false }))
      );
    } catch (error) {
      console.error("Erro ao carregar alterações:", error);
    }
  };

  const toggleDescricao = (alteracaoId: number) => {
    setAlteracoes(
      alteracoes.map((alt) =>
        alt.id === alteracaoId
          ? { ...alt, mostrarDescricao: !alt.mostrarDescricao }
          : alt
      )
    );
  };

  const handleCheckboxChange = (alteracaoId: number) => {
    setSelectedAlteracoes((prev) =>
      prev.includes(alteracaoId)
        ? prev.filter((id) => id !== alteracaoId)
        : [...prev, alteracaoId]
    );
  };

  const handleSalvar = async () => {
    try {
      if (status === "authenticated" && session?.user) {
        const response = await fetch("/api/user-changes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ changes: selectedAlteracoes }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro ao salvar alterações");
        }

        toast.success("Alterações salvas com sucesso!");
        router.push("/paciente/passo-10");
      } else {
        router.push("/paciente/passo-8");
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar alterações. Tente novamente.");
    }
  };

  const handleNenhumaAlteracao = () => {
    router.push("/paciente/passo-11");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EBF3FF] to-white">
      <div className="container mx-auto max-w-2xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => router.push("/paciente/passo-6")}
          >
            <ChevronLeft className="h-5 w-5 text-blue-600" />
          </Button>
          <h1 className="text-xl font-semibold text-blue-600">
            Passo 7 - Alterações
          </h1>
        </div>

        {/* Lista de Alterações */}
        <div className="space-y-4 mb-6">
          {alteracoes.map((alteracao) => (
            <div
              key={alteracao.id}
              className="rounded-lg border border-blue-100 bg-white p-4 transition-all hover:border-blue-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`alteracao-${alteracao.id}`}
                    checked={selectedAlteracoes.includes(alteracao.id)}
                    onCheckedChange={() => handleCheckboxChange(alteracao.id)}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`alteracao-${alteracao.id}`}
                      className="text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {alteracao.nome}
                    </label>
                    {alteracao.mostrarDescricao && (
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        {alteracao.descricao}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                  onClick={() => toggleDescricao(alteracao.id)}
                >
                  {alteracao.mostrarDescricao ? "−" : "+"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Botões */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full py-6 text-gray-600 hover:text-gray-700"
            onClick={handleNenhumaAlteracao}
          >
            Não encontrei nenhuma alteração
          </Button>

          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              className="flex-1 py-6"
              onClick={() => router.push("/paciente/passo-6")}
            >
              Voltar
            </Button>
            <Button
              variant="default"
              className="flex-1 py-6 bg-blue-600 hover:bg-blue-700"
              onClick={handleSalvar}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
