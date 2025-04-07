"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ForgotPasswordForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de recuperação de senha
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Recuperar Senha</h1>
        <p className="text-muted-foreground">
          Digite seu email para receber as instruções
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="w-full px-3 py-2 border rounded-md bg-background"
            required
          />
        </div>

        <Button className="w-full" type="submit">
          Enviar Instruções
        </Button>
      </form>

      <div className="text-center">
        <Link 
          href="/login"
          className="text-sm text-primary hover:underline"
        >
          Voltar para o login
        </Link>
      </div>
    </div>
  );
}