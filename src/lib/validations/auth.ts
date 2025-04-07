import * as z from "zod";

const baseUserSchema = z.object({
  firstName: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  lastName: z.string().min(2, "O sobrenome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(11, "WhatsApp inválido"),
  zipCode: z.string().length(8, "CEP deve ter 8 dígitos"),
  state: z.string().length(2, "Estado deve ter 2 caracteres"),
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const patientSchema = baseUserSchema.extend({
  type: z.literal("patient"),
});

export const dentistSchema = baseUserSchema.extend({
  type: z.literal("dentist"),
  cro: z.string().min(4, "CRO inválido"),
  croState: z.string().length(2, "Estado do CRO deve ter 2 caracteres"),
});

export const registerSchema = z
  .discriminatedUnion("type", [patientSchema, dentistSchema])
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
