import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schema/index";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import prisma from "./lib/db";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        // Validate the credentials using the LoginSchema
        const result = LoginSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        const { email, password } = result.data;

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
} as NextAuthConfig;
