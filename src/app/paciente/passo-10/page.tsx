"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Passo10Page() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen bg-[#f1f1f1]">
      {/* Header */}
      <div className="sticky top-0 z-50">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-between p-4">
          <Link href="/paciente/passo-7">
            <Button variant="ghost" className="text-blue-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Button>
          </Link>

          <h1 className="text-blue-600 text-xl font-medium">
            Alterações encontradas
          </h1>

          <Link href="/paciente/home">
            <Button variant="ghost" className="text-blue-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#0368df] to-[#1f51d1] p-8">
            {/* Illustration */}
            <div className="relative w-60 h-60 mx-auto">
              <Image
                src="/svg/dente-chorando.svg"
                alt="Ilustração de dentes preocupados"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>

            {/* Message */}
            <p className="text-white text-center text-lg font-medium mb-8 leading-relaxed">
              Alterações que foram observadas precisam ser avaliadas por um
              profissional.
            </p>

            {/* Action Button */}
            <Button
              className="w-full bg-white hover:bg-gray-50 text-[#0368df] px-8 py-6 rounded-xl text-lg font-medium cursor-pointer"
              onClick={() => router.push("/paciente/nossa-constelacao")}
            >
              Acessar a Constelação
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
