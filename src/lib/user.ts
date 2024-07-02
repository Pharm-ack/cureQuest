import prisma from "./db";
import { User } from "@prisma/client";

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, role: true },
    });
    return user;
  } catch (error) {
    return error;
  }
}

export async function fetchAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw error;
  }
}
