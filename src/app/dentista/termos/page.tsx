"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermosPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl border border-blue-100 hover:border-blue-200">
        <CardContent className="p-6 space-y-6 relative">
          {/* Botão Fechar */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full hover:bg-blue-50"
            onClick={() => router.push("/dentista/minha-estrela")}
          >
            <X className="h-4 w-4 text-blue-600" />
          </Button>

          {/* Título */}
          <div className="text-center space-y-4 pt-4">
            <h1 className="text-2xl font-bold text-blue-600">
              TERMOS E CONDIÇÕES DE USO
            </h1>
            <p className="text-gray-600 font-semibold">
              TERMOS E CONDIÇÕES GERAIS DE USO E DE COMPRA E VENDA DO APLICATIVO
              "CÉU DA BOCA"
            </p>
          </div>

          {/* Conteúdo dos Termos */}
          <div className="space-y-4 text-gray-600 max-h-[600px] overflow-y-auto pr-4">
            <p>
              Estes termos e condições gerais de uso e de compra e venda
              ("Termos e Condições") aplicam-se ao uso dos serviços oferecidos
              pelo CÉU DA BOCA ("Nós"), incluindo os serviços de autoexame bucal
              e teleconsulta ("Serviços").
            </p>

            <h2 className="text-lg font-semibold text-blue-600 mt-6">
              1. ACEITAÇÃO DOS TERMOS E CONDIÇÕES
            </h2>
            <p>
              1.1. Ao acessar e usar o aplicativo CÉU DA BOCA, você concorda com
              estes Termos e Condições.
            </p>
            <p>
              1.2. Se você não concordar com qualquer disposição destes Termos e
              Condições, não deverá usar nossos Serviços.
            </p>

            <h2 className="text-lg font-semibold text-blue-600 mt-6">
              2. SERVIÇOS OFERECIDOS
            </h2>
            <p>
              2.1. O CÉU DA BOCA oferece uma plataforma para realização de
              autoexame bucal e teleconsulta com profissionais qualificados.
            </p>
            <p>
              2.2. Os Serviços são fornecidos "no estado em que se encontram",
              podendo estar sujeitos a alterações sem aviso prévio.
            </p>

            <h2 className="text-lg font-semibold text-blue-600 mt-6">
              3. RESPONSABILIDADES DO PROFISSIONAL
            </h2>
            <p>3.1. O profissional se compromete a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Manter seus dados cadastrais atualizados</li>
              <li>Fornecer informações verdadeiras e precisas</li>
              <li>Respeitar a privacidade e confidencialidade dos pacientes</li>
              <li>Seguir as diretrizes éticas e profissionais aplicáveis</li>
            </ul>

            <h2 className="text-lg font-semibold text-blue-600 mt-6">
              4. PRIVACIDADE E PROTEÇÃO DE DADOS
            </h2>
            <p>
              4.1. Todos os dados coletados serão tratados de acordo com nossa
              Política de Privacidade e a Lei Geral de Proteção de Dados (LGPD).
            </p>

            <h2 className="text-lg font-semibold text-blue-600 mt-6">
              5. DISPOSIÇÕES FINAIS
            </h2>
            <p>
              5.1. Estes Termos e Condições poderão ser atualizados a qualquer
              momento, sendo a versão mais recente sempre disponibilizada em
              nosso aplicativo.
            </p>
          </div>

          {/* Botão de Ação */}
          <div className="pt-6">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => router.push("/dentista/minha-estrela")}
            >
              Voltar
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
