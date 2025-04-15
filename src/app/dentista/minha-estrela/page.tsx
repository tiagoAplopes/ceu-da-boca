"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TermosDialog } from "../components/TermosDialog";
import Link from "next/link";

interface ProfileData {
  email: string;
  whatsapp: string;
  address: string;
  zipCode: string;
  state: string;
  city: string;
  number: string;
  district: string;
  complement?: string;
}

export default function MinhaEstrelaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [termosDialogOpen, setTermosDialogOpen] = useState(false);

  const form = useForm<ProfileData>({
    defaultValues: {
      email: "",
      whatsapp: "",
      address: "",
    },
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/user/profile");
        if (!response.ok) throw new Error("Falha ao carregar perfil");
        const data = await response.json();

        const fullAddress = `${data.address}, ${data.number}${
          data.complement ? `, ${data.complement}` : ""
        } - ${data.district}, ${data.city} - ${data.state}, ${data.zipCode}`;

        form.reset({
          ...data,
          address: fullAddress,
        });
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        setError("Erro ao carregar dados do perfil");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [form]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header com botões de navegação */}
        <div className="flex items-center justify-center relative mb-4 max-w-2xl mx-auto">
          <Link href="/dentista/home" className="absolute -left-2">
            <Button
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 cursor-pointer"
            >
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
          <h1 className="text-blue-600 text-xl font-medium">Minha Estrela</h1>
        </div>

        <Card className="w-full border border-blue-100 hover:border-blue-200">
          <CardContent className="pt-6">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            {/* Botões de Edição - Responsivos */}
            <div className="flex flex-col md:flex-row gap-4 pt-6 border-t mt-8">
              <Button
                variant="outline"
                className="flex-1 h-11 text-[#898989] font-bold text-lg shadow-lg"
                onClick={() => router.push("/dentista/cadastro-completo")}
              >
                Editar Perfil
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-11 text-[#898989] font-bold text-lg shadow-lg"
                onClick={() => router.push("/dentista/especialidades")}
              >
                Editar áreas de atuação
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-11 text-[#898989] font-bold text-lg shadow-lg"
                onClick={() => router.push("/dentista/alteracao")}
              >
                Editar alterações
              </Button>
            </div>

            {/* Termos de Uso */}
            <div className="pt-6">
              <Button
                variant="ghost"
                className="w-full text-[#898989]"
                onClick={() => setTermosDialogOpen(true)}
              >
                Termos de Uso
              </Button>
            </div>
          </CardContent>
        </Card>

        <TermosDialog
          isOpen={termosDialogOpen}
          onClose={() => setTermosDialogOpen(false)}
        />
      </div>
    </main>
  );
}
