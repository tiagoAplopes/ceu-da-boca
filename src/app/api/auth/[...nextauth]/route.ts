import { db } from "@/lib/db";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations/auth";

const handler = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/login/create-account",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.type = (user as any).type;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).type = token.type;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordMatch = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) return null;

        return {
          id: user.id,
          email: user.email,
          type: user.type,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
