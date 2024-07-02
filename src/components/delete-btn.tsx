"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { deletePost } from "@/actions/action";
import { toast } from "sonner";
import { LuLoader2 } from "react-icons/lu";

export default function DeleteBtn({ postId }: { postId: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setLoading(true);
      const response = await deletePost(postId);
      if (response.error) {
        throw new Error(response.error);
      }
      setOpenDialog(false);
      toast.success("Post Deleted!");
    } catch (error) {
      console.error("Error updating post:", error);
      setLoading(false);
      toast.error("Could not delete post. Please try again.");
    }
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the post.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              onClick={() => setOpenDialog(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={loading}
            onClick={onDelete}
            type="button"
            variant="default"
          >
            {loading ? <LuLoader2 className="animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
