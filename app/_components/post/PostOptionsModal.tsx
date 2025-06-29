"use client";
import useDeleteUpdatePost from "@/app/_hooks/useDeleteUpdatePost";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import UploadModal from "../upload/UploadModal";
import useCreatePost from "@/app/_hooks/useCreatePost";
import { tagType } from "../upload/TaggedAccordion";

type props = {
  postId: string;
  userId?: string; // Optional, used in PostOptionsModal
  post?: {
    images: string[];
    tags: tagType[];
    content: string;
  }; // Optional, used in PostOptionsModal
  children: React.ReactNode;
};

export default function PostOptionsModal({
  children,
  postId,
  userId,
  post,
}: props) {
  const [open, setOpen] = useState(false);
  const { handleImages, handlePrevPage, page } = useCreatePost();

  //   const showPrivateOptions = userId;

  function closeModal() {
    setOpen(false);
  }

  const { deletePost, isDeleting, showPrivateOptions } = useDeleteUpdatePost(
    postId,
    userId || "",
    closeModal
  );

  function handleUpdateClick() {
    handlePrevPage();
    handleImages(post?.images as string[]);
    // setOpen(false);
  }

  const btnClassName =
    "rounded-none py-6 text-primary text-xs transition-all duration-200";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-0 sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  divide-y">
          {showPrivateOptions && (
            <>
              <Button
                onClick={deletePost}
                className={btnClassName}
                variant="ghost"
              >
                {isDeleting ? "Deleting..." : "Delete Post"}
              </Button>
              <UploadModal
                post={post}
                postId={postId}
                updatePage={page}
                updateSession={true}
              >
                <Button
                  onClick={handleUpdateClick}
                  className={btnClassName}
                  variant="ghost"
                >
                  Edit Post
                </Button>
              </UploadModal>
            </>
          )}

          <Button
            className={btnClassName + " text-destructive"}
            variant="ghost"
          >
            Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
