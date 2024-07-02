import Paginations from "@/components/paginations";
import Search from "@/components/search";
import Tables from "@/components/tables";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup } from "@/components/ui/radio-group";
import { fetchPostPages } from "@/lib/post";
import Link from "next/link";
import { LuListOrdered } from "react-icons/lu";

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
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 h-[calc(100vh-56px)]">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Blog Posts</h1>
        <Button variant="default" size="sm">
          <Link href="/post-form">Create Post</Link>
        </Button>
      </div>
      <div className="border shadow-sm rounded-lg">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <LuListOrdered className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <RadioGroup value="title">
                    <div>Title</div>
                    <div>Author</div>
                    <div>Date</div>
                  </RadioGroup>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RadioGroup value="asc">
                    <div>Ascending</div>
                    <div>Descending</div>
                  </RadioGroup>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
