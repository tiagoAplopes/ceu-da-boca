"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ComecarJornadaPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border border-blue-100 hover:border-blue-200">
        <CardContent className="p-6 space-y-6">
          {/* Header Image */}
          <div className="flex justify-center bg-gradient-to-br from-blue-600 to-indigo-300 rounded-sm">
            <Image
              src="/svg/dentist-exame.svg"
              alt="Autoexame"
              width={150}
              height={150}
              className="w-[140px] h-[140px] md:w-[150px] md:h-[150px]"
            />
          </div>

          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-blue-600">
              Vamos começar a sua jornada?
            </h1>
            <p className="text-gray-600">
              Você vai começar agora o autoexame bucal. Siga as instruções
              abaixo para prosseguir nessa jornada!
            </p>
          </div>

          {/* Tips Section */}
          <div className="space-y-2">
            <h2 className="text-gray-500 font-medium text-center">
              Mas antes, veja algumas dicas:
            </h2>

            {/* Tips Cards */}
            <div className="flex overflow-x-auto gap-2 py-4 px-2 -mx-2">
              <div className="flex-none w-48">
                <div className="bg-white rounded-lg border border-blue-100 hover:border-blue-200 p-4 flex flex-col items-center text-center h-40">
                  <div className="bg-blue-600 rounded-full p-3 mb-2">
                    <Image
                      src="/svg/v3/002-idea.svg"
                      alt="Light icon"
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="text-sm">Procure um local iluminado</p>
                </div>
              </div>

              <div className="flex-none w-48">
                <div className="bg-white rounded-lg border border-blue-100 hover:border-blue-200 p-4 flex flex-col items-center text-center h-40">
                  <div className="bg-blue-600 rounded-full p-3 mb-2">
                    <Image
                      src="/svg/v3/001-dental-veneer.svg"
                      alt="Denture icon"
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="text-sm">
                    Retire próteses e aparelhos removíveis
                  </p>
                </div>
              </div>

              <div className="flex-none w-48">
                <div className="bg-white rounded-lg border border-blue-100 hover:border-blue-200 p-4 flex flex-col items-center text-center h-40">
                  <div className="bg-blue-600 rounded-full p-3 mb-2">
                    <Image
                      src="/svg/v3/mirror.svg"
                      alt="Mirror icon"
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="text-sm">
                    Utilize um espelho ou a própria tela do celular
                  </p>
                </div>
              </div>

              <div className="flex-none w-48">
                <div className="bg-white rounded-lg border border-blue-100 hover:border-blue-200 p-4 flex flex-col items-center text-center h-40">
                  <div className="bg-blue-600 rounded-full p-3 mb-2">
                    <Image
                      src="/svg/v3/005-tripod.svg"
                      alt="Phone icon"
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="text-sm">
                    Apoie bem o celular em direção ao seu rosto
                  </p>
                </div>
              </div>

              <div className="flex-none w-48">
                <div className="bg-white rounded-lg border border-blue-100 hover:border-blue-200 p-4 flex flex-col items-center text-center h-40">
                  <div className="bg-blue-600 rounded-full p-3 mb-2">
                    <Image
                      src="/svg/v3/006-towel.svg"
                      alt="Towel icon"
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="text-sm">
                    Tenha em mãos uma toalha ou um pedaço de gaze
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => router.push("/paciente/passo-1")}
            >
              Iniciar
            </Button>
            <Button
              variant="outline"
              className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => router.push("/paciente/home")}
            >
              Fazer mais tarde
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
