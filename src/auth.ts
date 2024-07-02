import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema";
import { getUserByEmail } from "./lib/user";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { User } from "@prisma/client";
import prisma from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        // runs on login

        // validation
        const validatedFormData = LoginSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }

        // extract values
        const { email, password } = validatedFormData.data;

        const user = await getUserByEmail(email);
        if (!user) {
          console.log("No user found");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      // const userSession = await getUserByEmail(session.user.email);
      // if (userSession) {
      //   session.user.id = userSession.id;
      // }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    //   signIn: async ({ profile }) => {
    //     console.log(profile);
    //     try {
    //       const userExists = await getUserByEmail(profile?.email as string);
    //       if (!userExists) {
    //         await prisma.user.create({
    //           data: {
    //             email: profile?.email as string,
    //             name: profile?.name as string,
    //             image: profile?.image as string,
    //             password: "", // Add a password property here
    //           },
    //         });
    //         return true;
    //       } else {
    //         return true; // Existing user signing in
    //       }
    //     } catch (error) {
    //       // console.error(error);
    //       return false;
    //     }
    //   },
  },
  pages: {
    signIn: "/login",
  },
});
