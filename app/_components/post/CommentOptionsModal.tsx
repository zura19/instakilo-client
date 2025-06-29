"use client";
import useComments from "@/app/_hooks/useComments";
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
import EditCommentModal from "./EditCommentModal";

type props = {
  children: React.ReactNode;
  postId: string;
  commentId: string;
  content: string;
};

export default function CommentOptionsModal({
  children,
  postId,
  commentId,
  content,
}: props) {
  const {
    handleReportComment,
    handleDeleteComment,
    handleUpdateComment,
    isDeleting,
    isUpdating,
  } = useComments(postId);
  const [open, setOpen] = useState(false);

  const btnClassName =
    "rounded-none py-6 text-primary text-xs transition-all duration-200";

  function closeModal() {
    setOpen(false);
  }

  async function deleteComment() {
    const d = await handleDeleteComment(postId, commentId);
    if (!d) return;
    closeModal();
  }

  async function updateComment(content: string): Promise<boolean> {
    const d = await handleUpdateComment(postId, commentId, content);
    if (!d) {
      return false;
    }
    closeModal();
    return true;
  }

  async function reportComment() {
    await handleReportComment();
    closeModal();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="px-0 sm:max-w-[400px] py-2">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex flex-col divide-y">
            <EditCommentModal
              content={content}
              isLoading={isUpdating}
              update={updateComment}
            >
              <Button variant={"ghost"} className={btnClassName}>
                Edit
              </Button>
            </EditCommentModal>
            <Button
              onClick={deleteComment}
              variant={"ghost"}
              className={btnClassName}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              onClick={reportComment}
              variant={"ghost"}
              className={btnClassName + " text-destructive"}
            >
              Report
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
