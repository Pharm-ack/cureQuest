import BlogList from "@/components/blog-list";
import { Suspense } from "react";
import Loading from "../loading";

interface BlogPageProps {
  searchParams: {
    page: string;
  };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const page = searchParams.page || "1";

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <BlogList searchParams={{ page }} />
      </Suspense>
    </main>
  );
}
