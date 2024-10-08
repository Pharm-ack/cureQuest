import UpdatePostForm from "@/components/update-post";

export default function EditPostPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Edit Post</h1>
      </div>
      <div className="border shadow-sm rounded-lg">
        <UpdatePostForm postId={params.id} />
      </div>
    </main>
  );
}
