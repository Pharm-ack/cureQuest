import Paginations from "@/components/paginations";
import Search from "@/components/search";
import Tables from "@/components/tables";
import { Button } from "@/components/ui/button";
import { fetchPostPages } from "@/lib/post";
import Link from "next/link";


type postPageProps = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function postPage({ searchParams }: postPageProps) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPostPages(query);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Blog Posts</h1>
        <Button variant="default" size="sm">
          <Link href="/dashboard/post-form">Create Post</Link>
        </Button>
      </div>
      <div className="border shadow-sm rounded-lg">
        <div className="flex items-center justify-end border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Search />
          </div>
        </div>
        <Tables query={query} currentPage={currentPage} />
      </div>
      <Paginations totalPages={totalPages} />
    </main>
  );
}
