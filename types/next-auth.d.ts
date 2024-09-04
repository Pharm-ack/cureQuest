import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: string;
  }
}

// import "next-auth";
// import "next-auth/jwt";

// declare module "next-auth" {
//   interface User {
//     id: string;
//     role: string;
//   }
//   interface Session {
//     user: User;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role: string;
//   }
// }
