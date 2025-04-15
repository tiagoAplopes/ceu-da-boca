"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Alteracao {
  id: string;
  nome: string;
  descricao: string;
  mostrarDescricao?: boolean;
}

interface ProfissionalChange {
  id: number;
  userId: string;
  changeId: number;
  createdAt: string;
}

export default function AlteracaoPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [alteracoes, setAlteracoes] = useState<Alteracao[]>([]);
  const [selectedAlteracoes, setSelectedAlteracoes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Status:", status);
    console.log("Session:", session);
    if (status === "authenticated" && session) {
      console.log("Iniciando carregamento de dados");
      carregarDados();
    }
  }, [status, session]);

  // Adicione um useEffect para monitorar mudanças nos estados
  useEffect(() => {
    console.log("Alterações carregadas:", alteracoes);
    console.log("Alterações selecionadas:", selectedAlteracoes);
  }, [alteracoes, selectedAlteracoes]);

  const carregarDados = async () => {
    setLoading(true); // Garante que loading está true ao iniciar
    try {
      // Carrega os dados em sequência para garantir ordem
      await carregarAlteracoes();
      await carregarAlteracoesDentista();
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const carregarAlteracoesDentista = async () => {
    try {
      const response = await fetch("/api/dentista/profissional-changes", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const profissionalChanges: ProfissionalChange[] = await response.json();

      // Converte todos os IDs para string para garantir consistência
      const selectedIds = profissionalChanges.map((change) =>
        change.changeId.toString()
      );

      console.log("IDs selecionados:", selectedIds); // Debug
      setSelectedAlteracoes(selectedIds);
    } catch (error) {
      console.error("Erro ao carregar alterações do dentista:", error);
      toast.error("Erro ao carregar suas alterações");
      throw error;
    }
  };

  const carregarAlteracoes = async () => {
    try {
      const response = await fetch("/assets/mocks/alteracoes.json", {
        // Adiciona headers para garantir que é uma requisição fresh
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setAlteracoes(
        data.map((alt: Alteracao) => ({ ...alt, mostrarDescricao: false }))
      );
    } catch (error) {
      console.error("Erro ao carregar alterações:", error);
      toast.error("Erro ao carregar alterações");
      throw error; // Propaga o erro para ser tratado em carregarDados
    }
  };

  const toggleDescricao = (id: string) => {
    setAlteracoes(
      alteracoes.map((alt) =>
        alt.id === id
          ? { ...alt, mostrarDescricao: !alt.mostrarDescricao }
          : alt
      )
    );
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedAlteracoes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSalvar = async () => {
    try {
      if (status !== "authenticated") {
        router.push("/auth/login");
        return;
      }

      const response = await fetch("/api/dentista/profissional-changes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alteracoes: selectedAlteracoes,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar alterações");
      }

      toast.success("Alterações salvas com sucesso!");
      router.push("/dentista/minha-estrela");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar alterações");
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
            Editar altereações
          </h1>
        </div>

        {/* Lista de Alterações */}
        <div className="space-y-4">
          {alteracoes.map((alteracao) => (
            <div
              key={alteracao.id}
              className="rounded-lg border border-blue-100 bg-white p-4 transition-all hover:border-blue-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`alteracao-${alteracao.id}`}
                    checked={selectedAlteracoes.includes(
                      alteracao.id.toString()
                    )}
                    onCheckedChange={() =>
                      handleCheckboxChange(alteracao.id.toString())
                    }
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
