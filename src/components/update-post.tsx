"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormError from "@/components/ui/form-error";
import { PostSchema } from "@/schema/index";
import { updatePost, fetchPost } from "@/actions/action";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuLoader2 } from "react-icons/lu";
import { createUploadThingHook } from "@/lib/uploadthing";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface UpdatePostFormProps {
  postId: string;
}

const uploadHook = createUploadThingHook({
  url: "https://cure-quest-ph.vercel.app/api/uploadthing",
});

const UpdatePostForm: React.FC<UpdatePostFormProps> = ({ postId }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const { data: session } = useSession();

  const { startUpload, isUploading, uploadProgress } =
    uploadHook("imageUploader");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof PostSchema>>({
    defaultValues: {},
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const res = await startUpload([file]);
      if (res?.length > 0) {
        setImageUrl(res[0].url);
        toast.success("Image uploaded successfully");
      }
    } catch (e) {
      toast.error("Error uploading image");
    }
  };

  useEffect(() => {
    async function loadPost() {
      setIsLoading(true);
      try {
        const postData = await fetchPost(postId);
        if (!postData) {
          throw new Error("Post not found");
        }
        setValue("title", postData.title);
        setValue("slug", postData.slug);
        setContent(postData.content);
        setImageUrl(postData.image);
      } catch (error) {
        console.error("Error fetching post data:", error);
        toast.error("Failed to load post data");
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [postId, setValue]);

  async function onSubmit(data: z.infer<typeof PostSchema>) {
    if (!session) {
      toast.error("You must be logged in to update a post.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", content);
    formData.append("image", imageUrl);
    formData.append("authorId", session.user.id);

    const response = await updatePost(postId, formData);
    if (response?.error) {
      toast.error("Could not update post. Please try again.");
      return;
    }

    if (!response?.error) {
      toast.success("Post Updated!");
    }
  }

  if (isLoading) {
    return (
      <div className="flex pl-5 justify-center items-center min-h-screen">
        <LuLoader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters.",
              },
            })}
            type="text"
            id="title"
            name="title"
            placeholder="Enter post title"
          />
          {errors.title && (
            <FormError>{String(errors.title.message)}</FormError>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            {...register("slug", {
              required: "Slug is required.",
              minLength: {
                value: 5,
                message: "Slug must be at least 5 characters.",
              },
            })}
            type="text"
            id="slug"
            name="slug"
            placeholder="Enter post slug"
          />
          {errors.slug && <FormError>{String(errors.slug.message)}</FormError>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <ReactQuill
            theme="snow"
            placeholder="Enter post content"
            value={content}
            onChange={setContent}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Featured Image</Label>
          <Input
            id="image"
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
          />
          {isUploading && <p>Uploading...{uploadProgress}%</p>}
          {imageUrl && (
            <Image
              src={imageUrl}
              width={150}
              height={150}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 border-t p-4">
        <Button variant="outline">Cancel</Button>
        <Button disabled={isSubmitting} type="submit" variant="default">
          {isSubmitting ? (
            <LuLoader2 className="animate-spin h-4 w-4" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};

export default UpdatePostForm;
