"use client";

import FormError from "@/components/ui/form-error";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createPost } from "@/actions/action";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { PostSchema } from "@/schema/index";
import { LuLoader2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";
import { createUploadThingHook } from "@/lib/uploadthing";
import Image from "next/image";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const uploadHook = createUploadThingHook({
  url: "https://cure-quest-ph.vercel.app/api/uploadthing",
});

export default function PostForm() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState("");
  const { data: session } = useSession();

  const { startUpload, isUploading, uploadProgress } =
    uploadHook("imageUploader");

  const {
    register,
    reset,
    handleSubmit,
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

  async function onSubmit(data: any) {
    if (!session) {
      toast.error("You must be logged in to submit a post.");
      return;
    }
    if (!imageUrl) {
      toast.error("Please upload an image");
      return;
    } else if (!content) {
      toast.error("Please blog content is required");
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", content);
    formData.append("image", imageUrl);
    formData.append("authorId", session.user.id);

    console.log(imageUrl, content, data);

    const response = await createPost(formData);

    if (response?.error) {
      toast.error("Error", {
        description: "Could not create user. Please try again.",
      });
      return;
    }

    if (!response?.error) {
      reset();
      setContent("");
    }
    toast.success("Post Created!");
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">New Post</h1>
      </div>
      <div className="border shadow-sm rounded-lg">
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
              {errors.slug && (
                <FormError>{String(errors.slug.message)}</FormError>
              )}
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
      </div>
    </main>
  );
}
