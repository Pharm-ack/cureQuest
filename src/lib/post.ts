import { Post } from "@prisma/client";
import prisma from "./db";
import { cache } from "react";
import { unstable_noStore } from "next/cache";

const ITEM_PER_PAGE = 4;
export async function filteredPost(
  query: string,
  currentPage: number
): Promise<Post[]> {
  const offset = (currentPage - 1) * ITEM_PER_PAGE;

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: offset,
      take: ITEM_PER_PAGE,
    });
    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchPostPages(query: string): Promise<number> {
  try {
    const count = await prisma.post.count({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(count / ITEM_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getPosts = async (page = 1, limit = 2) => {
  unstable_noStore();
  const skip = (page - 1) * limit;

  const [posts, totalPosts] = await prisma.$transaction([
    prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    }),
    prisma.post.count(),
  ]);

  const totalPages = Math.ceil(totalPosts / limit);

  return {
    posts,
    totalPages,
    currentPage: page,
  };
};
