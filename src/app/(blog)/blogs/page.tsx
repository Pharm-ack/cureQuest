import BlogList from "@/components/blog-list";
import { Suspense } from "react";
import Loading from "../loading";

export const dynamic = "force-dynamic";
export default function BlogPage() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <BlogList />
      </Suspense>
    </main>
  );
}
