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
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Olá, Tiago</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="end">
              <div className="flex flex-col space-y-1">
                <Link href="/paciente/perfil">
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
          <CardHeader className="flex flex-row items-center justify-between h-[100px] md:h-auto ">
            <div className="max-w-[60%]">
              <CardTitle className="text-lg md:text-2xl">
                Seja bem-vindo!
              </CardTitle>
              <CardDescription className="text-white/80 hidden md:block">
                Estamos felizes em ter você aqui. Explore todas as
                funcionalidades disponíveis.
              </CardDescription>
            </div>
            <Image
              src="/svg/home-dentist.svg"
              alt="Dentista"
              width={200}
              height={200}
              className="-mr-8 -mb-8 -mt-8 w-[160px] h-[160px] md:w-[200px] md:h-[200px] object-contain"
            />
          </CardHeader>
        </Card>

        {/* Cards Stack */}
        <div className="flex flex-col gap-4">
          {/* Card 1 */}
          <Link href="/paciente/comecar-jornada">
            <Card className="cursor-pointer hover:bg-accent transition-colors relative group">
              <CardHeader className="flex flex-row items-center gap-4 pr-0 pl-3">
                <Image
                  src="/svg/v3/Group 98.png"
                  alt="Começar jornada"
                  width={60}
                  height={60}
                />
                <div>
                  <CardTitle>Comece sua jornada</CardTitle>
                  <CardDescription>
                    Dê os primeiros passos na sua jornada conosco.
                  </CardDescription>
                </div>
              </CardHeader>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-foreground transition-colors">
                <ChevronRight size={24} />
              </div>
            </Card>
          </Link>

          {/* Card 2 */}
          <Link href="/paciente/alteracoes-encontradas">
            <Card className="cursor-pointer hover:bg-accent transition-colors relative group">
              <CardHeader className="flex flex-row items-center gap-4 pr-0 pl-3">
                <Image
                  src="/svg/v3/Frame 4.png"
                  alt="Alterações encontradas"
                  width={60}
                  height={60}
                />
                <div>
                  <CardTitle>Alterações encontradas</CardTitle>
                  <CardDescription>
                    Confira as últimas atualizações e mudanças.
                  </CardDescription>
                </div>
              </CardHeader>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-foreground transition-colors">
                <ChevronRight size={24} />
              </div>
            </Card>
          </Link>

          {/* Card 3 */}
          <Link href="/paciente/nossa-constelacao">
            <Card className="cursor-pointer hover:bg-accent transition-colors relative group">
              <CardHeader className="flex flex-row items-center gap-4 pr-0 pl-3">
                <Image
                  src="/svg/v3/Frame 10.png"
                  alt="Nossa constelação"
                  width={60}
                  height={60}
                />
                <div>
                  <CardTitle>Nossa constelação</CardTitle>
                  <CardDescription>
                    Explore nossa comunidade e conexões.
                  </CardDescription>
                </div>
              </CardHeader>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-foreground transition-colors">
                <ChevronRight size={24} />
              </div>
            </Card>
          </Link>

          {/* Novo Card - Meu Espaço */}
          <Link href="/paciente/perfil">
            <Card className="cursor-pointer hover:bg-accent transition-colors relative group">
              <CardHeader className="flex flex-row items-center gap-4 pr-0 pl-3">
                <Image
                  src="/svg/v3/Frame 10 (1).png"
                  alt="Meu espaço"
                  width={60}
                  height={60}
                />
                <div>
                  <CardTitle>Meu Espaço</CardTitle>
                  <CardDescription>
                    Veja aqui como os seus dados são exibidos aos usuários
                  </CardDescription>
                </div>
              </CardHeader>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-foreground transition-colors">
                <ChevronRight size={24} />
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
