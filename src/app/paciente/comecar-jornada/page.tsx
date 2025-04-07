'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ComecarJornadaPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-6">
          {/* Header Image */}
          <div className="flex justify-center">
            <Image
              src="/dentist-illustration.svg"
              alt="Dentist illustration"
              width={200}
              height={200}
            />
          </div>

          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-blue-600">
              Vamos começar a sua jornada?
            </h1>
            <p className="text-gray-600">
              Você vai começar agora o autoexame bucal. Siga as instruções abaixo para prosseguir nessa jornada!
            </p>
          </div>

          {/* Tips Section */}
          <div className="space-y-2">
            <h2 className="text-gray-500 font-medium">
              Mas antes, veja algumas dicas:
            </h2>
            
            {/* Tips Cards */}
            <div className="flex overflow-x-auto gap-2 py-4 px-2 -mx-2">
              <div className="flex-none w-48">
                <div className="bg-white rounded-lg border p-4 flex flex-col items-center text-center h-48">
                  <div className="bg-blue-600 rounded-full p-3 mb-2">
                    <Image
                      src="/light-icon.svg"
                      alt="Light icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="text-sm">Procure um local iluminado</p>
                </div>
              </div>

              <div className="flex-none w-48">
                <div className="bg-white rounded-lg border p-4 flex flex-col items-center text-center h-48">
                  <div className="bg-blue-600 rounded-full p-3 mb-2">
                    <Image
                      src="/denture-icon.svg"
                      alt="Denture icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="text-sm">Retire próteses e aparelhos removíveis</p>
                </div>
              </div>

              <div className="flex-none w-48">
                <div className="bg-white rounded-lg border p-4 flex flex-col items-center text-center h-48">
                  <div className="bg-blue-600 rounded-full p-3 mb-2">
                    <Image
                      src="/mirror-icon.svg"
                      alt="Mirror icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="text-sm">Utilize um espelho ou a própria tela do celular</p>
                </div>
              </div>

              <div className="flex-none w-48">
                <div className="bg-white rounded-lg border p-4 flex flex-col items-center text-center h-48">
                  <div className="bg-blue-600 rounded-full p-3 mb-2">
                    <Image
                      src="/phone-icon.svg"
                      alt="Phone icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="text-sm">Apoie bem o celular em direção ao seu rosto</p>
                </div>
              </div>

              <div className="flex-none w-48">
                <div className="bg-white rounded-lg border p-4 flex flex-col items-center text-center h-48">
                  <div className="bg-blue-600 rounded-full p-3 mb-2">
                    <Image
                      src="/gauze-icon.svg"
                      alt="Gauze icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="text-sm">Tenha em mãos uma toalha ou um pedaço de gaze</p>
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