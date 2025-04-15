"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EBF3FF] to-white p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-700">Olá, Dr. João</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="end">
              <div className="flex flex-col space-y-1">
                <Link href="/dentista/perfil">
                  <Button variant="ghost" className="w-full justify-start">
                    Ir para perfil
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  Sair
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Separator className="my-8" />

        {/* Welcome Card */}
        <Card className="mb-8 bg-blue-600 text-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between h-[80px] md:h-[100px]">
            <div className="max-w-[60%]">
              <CardTitle className="text-lg md:text-2xl">
                Seja bem-vindo!
              </CardTitle>
              <CardDescription className="text-white/80 hidden md:block">
                Gerencie seus pacientes e acompanhe seus progressos.
              </CardDescription>
            </div>
            <Image
              src="/svg/home-dentist.svg"
              alt="Dentista"
              width={300}
              height={200}
              className="-mr-8 -mb-8 -mt-7 w-[140px] h-[140px] md:w-[170px] md:h-[170px] object-contain"
            />
          </CardHeader>
        </Card>

        {/* Cards Stack */}
        <div className="flex flex-col gap-4">
          {/* Card 1 - Minha Estrela */}
          <Link href="/dentista/minha-estrela">
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors relative group border border-blue-100">
              <CardContent className="px-2 md:px-6">
                <div className="flex gap-2">
                  <div className="w-[20%] sm:w-[10%] flex items-center justify-center">
                    <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full bg-gradient-to-b from-indigo-600 to-blue-500 flex items-center justify-center shadow-md overflow-hidden relative">
                      <Image
                        src="/svg/v3/Frame 3.svg"
                        alt="Minha Estrela"
                        width={80}
                        height={80}
                        className="object-contain absolute scale-125"
                      />
                    </div>
                  </div>
                  <div className="w-[70%] sm:w-[80%] flex flex-col justify-center">
                    <p className="font-semibold">Minha Estrela</p>
                    <span className="text-sm text-gray-700">
                      Veja aqui como o seus dados são exibidos aos usuários
                    </span>
                  </div>
                  <div className="w-[10%] flex items-center justify-center">
                    <ChevronRight
                      size={24}
                      className="text-gray-500 group-hover:text-black transition-colors"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card 2 - Meu Espaço */}
          <Link href="/dentista/meu-espaco">
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors relative group border border-blue-100">
              <CardContent className="px-2 md:px-6">
                <div className="flex gap-2">
                  <div className="w-[20%] sm:w-[10%] flex items-center justify-center">
                    <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full bg-gradient-to-b from-indigo-600 to-blue-500 flex items-center justify-center shadow-md overflow-hidden relative">
                      <Image
                        src="/svg/v3/Frame 10 (1).png"
                        alt="Meu Espaço"
                        width={80}
                        height={80}
                        className="object-contain absolute scale-125"
                      />
                    </div>
                  </div>
                  <div className="w-[70%] sm:w-[80%] flex flex-col justify-center">
                    <CardTitle className="mb-1">Meu Espaço</CardTitle>
                    <p className="text-muted-foreground">
                      Confira seus dados pessoais e faça alterações, se
                      precisar.
                    </p>
                  </div>
                  <div className="w-[10%] flex items-center justify-center">
                    <ChevronRight
                      size={24}
                      className="text-gray-500 group-hover:text-black transition-colors"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card 4 - Minha Constelação */}
          <Link href="/dentista/minha-constelacao">
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors relative group border border-blue-100">
              <CardContent className="px-2 md:px-6">
                <div className="flex gap-2">
                  <div className="w-[20%] sm:w-[10%] flex items-center justify-center">
                    <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full bg-gradient-to-b from-indigo-600 to-blue-500 flex items-center justify-center shadow-md overflow-hidden relative">
                      <Image
                        src="/svg/v3/Frame 10.png"
                        alt="Minha Constelação"
                        width={80}
                        height={80}
                        className="object-contain absolute scale-125"
                      />
                    </div>
                  </div>
                  <div className="w-[70%] sm:w-[80%] flex flex-col justify-center">
                    <CardTitle className="mb-1">Minha Constelação</CardTitle>
                    <p className="text-muted-foreground">
                      Encontre dentistas-estrela em nossa constelação.
                    </p>
                  </div>
                  <div className="w-[10%] flex items-center justify-center">
                    <ChevronRight
                      size={24}
                      className="text-gray-500 group-hover:text-black transition-colors"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
