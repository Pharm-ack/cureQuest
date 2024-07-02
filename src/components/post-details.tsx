import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup } from "@/components/ui/radio-group";

import Link from "next/link";
import React from "react";
import { LuListOrdered } from "react-icons/lu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";
import Search from "./search";
import { Table } from "./ui/table";

export default function PostDetails() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
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
        <Table />
      </div>
      <div className="flex items-center justify-center">
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
    </main>
  );
}
