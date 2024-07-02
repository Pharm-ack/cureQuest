import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { fetchBlogPost } from "@/lib/post";

export default async function BlogList() {
  const { posts } = await fetchBlogPost();

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
                  <p className="text-gray-600">
                    Explore the latest trends and technologies shaping the
                    future of web development. From AI-powered tools to
                    serverless architectures, discover how the industry is
                    evolving.
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center pt-12 py-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* <div className="">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-[50px_1fr] gap-4 items-start">
              <Image
                src="/placeholder.svg"
                alt="Related Post Image"
                width={50}
                height={50}
                className="rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  Exploring the Latest CSS Features
                </h3>
                <p className="text-gray-500 text-sm">May 1, 2023</p>
              </div>
            </div>
            <div className="grid grid-cols-[50px_1fr] gap-4 items-start">
              <Image
                src="/placeholder.svg"
                alt="Related Post Image"
                width={50}
                height={50}
                className="rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  Building Accessible Web Applications
                </h3>
                <p className="text-gray-500 text-sm">April 25, 2023</p>
              </div>
            </div>
            <div className="grid grid-cols-[50px_1fr] gap-4 items-start">
              <Image
                src="/placeholder.svg"
                alt="Related Post Image"
                width={50}
                height={50}
                className="rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  Deploying Your React App with Vercel
                </h3>
                <p className="text-gray-500 text-sm">April 10, 2023</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
