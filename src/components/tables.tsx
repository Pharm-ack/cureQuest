import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {DeleteBtn} from "./delete-btn";
import { TbFilePencil } from "react-icons/tb";
import { Button } from "./ui/button";
import Link from "next/link";
import { filteredPost } from "@/lib/post";

type TablesProps = {
  query: string;
  currentPage: number;
};

export default async function Tables({ query, currentPage }: TablesProps) {
  const posts = await filteredPost(query, currentPage);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium hover:underline">
              {post.title}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Link href={`/dashboard/post/edit/${post.id}`}>
                  <TbFilePencil className="h-4 w-4" />
                </Link>
                <span className="sr-only">Edit</span>
              </Button>
              <DeleteBtn postId={post.id}  />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
