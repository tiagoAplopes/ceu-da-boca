"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Passo11Page() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen bg-[#f1f1f1] flex items-center justify-center">
      {/* Content */}
      <div className="w-full max-w-2xl p-4 md:p-6">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="p-8 flex flex-col items-center">
            {/* Illustration */}
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-8">
              <Image
                src="/happy-tooth.svg"
                alt="Dente feliz"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>

            {/* Title */}
            <h2 className="text-[#0368df] text-2xl font-bold mb-4">
              Parabéns.
            </h2>

            {/* Message */}
            <p className="text-[#0368df] text-center text-base mb-8">
              Procure um dentista para validar o seu autoexame e identificar
              alterações não visíveis!
            </p>

            {/* Action Buttons */}
            <div className="w-full space-y-4">
              <Button
                className="w-full bg-[#0368df] hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-medium"
                onClick={() => router.push("/paciente/nossa-constelacao")}
              >
                Consultar rede de prevenção
              </Button>

              <Button
                variant="outline"
                className="w-full border-[#0368df] text-[#0368df] px-8 py-6 rounded-xl text-lg font-medium"
                onClick={() => router.push("/paciente/home")}
              >
                Ir para o início
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
