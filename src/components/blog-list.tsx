import Image from "next/image";
import Link from "next/link";
import { fetchBlogPost } from "@/lib/post";
import parse from "html-react-parser";
import Paginations from "./paginations";
import React from "react";
export const dynamic = "force-dynamic";
type BlogListProps = {
  searchParams?: {
    page?: string;
  };
};

export default async function BlogList({ searchParams }: BlogListProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 4;
  const { posts, totalPages } = await fetchBlogPost(currentPage, itemsPerPage);

  if (!posts || posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <div className="">
          <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
          <div className="grid gap-8">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="grid md:grid-cols-[200px_1fr] gap-4 items-start"
              >
                <Image
                  src={post.image}
                  alt="Blog Post Image"
                  width={200}
                  height={150}
                  className="rounded-lg object-cover"
                />
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <div className="text-gray-500 mb-2">
                    <span>{post.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <article className="text-gray-600 prose">
                    {parse(post.content.substring(0, 200))}...
                  </article>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center pt-12 py-10">
            <Paginations totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
