"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import * as z from "zod";
import { toast } from "sonner";
import Link from "next/link";

const profileSchema = z.object({
  cro: z.string().min(4, "CRO deve ter no mínimo 4 caracteres"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  firstName: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  lastName: z.string().min(2, "O sobrenome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(11, "WhatsApp inválido"),
  zipCode: z.string().length(8, "CEP deve ter 8 dígitos"),
  state: z.string().length(2, "Estado deve ter 2 caracteres"),
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres"),
  number: z.string().min(1, "Número é obrigatório"),
  address: z.string().min(5, "Endereço deve ter no mínimo 5 caracteres"),
  complement: z.string().optional(),
  district: z.string().min(2, "Bairro deve ter no mínimo 2 caracteres"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function CadastroCompletoPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      cro: "",
      cpf: "",
      firstName: "",
      lastName: "",
      email: "",
      whatsapp: "",
      zipCode: "",
      state: "",
      city: "",
      number: "",
      address: "",
      complement: "",
      district: "",
    },
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/user/profile");
        if (!response.ok) throw new Error("Falha ao carregar perfil");
        const data = await response.json();
        form.reset(data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        setError("Erro ao carregar dados do perfil");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, [form]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    setError(null);

    try {
      console.log("Payload being sent:", data); // Log para debug

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao atualizar perfil");
      }

      const responseData = await response.json(); // Log da resposta
      console.log("Response received:", responseData);

      router.push("/dentista/home");
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setError(
        error instanceof Error ? error.message : "Erro ao atualizar perfil"
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EBF3FF] to-white flex flex-col items-center justify-center p-4">
      <div className="flex items-center justify-between max-w-2xl w-full mb-4">
        <Link href="/dentista/minha-estrela">
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
        <h1 className="text-blue-600 text-xl font-medium">Jornada</h1>
        <div className="flex gap-2">
          <Link href="/paciente/home">
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
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
      <Card className="max-w-2xl w-full border border-blue-100 hover:border-blue-200">
        <CardHeader>
          <CardTitle>Editar Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CRO</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobrenome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Digite apenas números"
                        maxLength={11}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-8 pt-6 border-t">
                <div className="flex justify-end gap-4">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="w-32 bg-blue-600 hover:bg-blue-700"
                  >
                    {isSaving ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
