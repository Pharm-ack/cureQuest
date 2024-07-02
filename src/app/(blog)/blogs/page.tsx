import BlogList from "@/components/blog-list";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <main>
      <Suspense fallback={<p>Loading posts...</p>}>
        <BlogList />
      </Suspense>
    </main>
  );
}
