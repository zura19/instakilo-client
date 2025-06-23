"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LikedByList from "./LikedByList";

type props = {
  children?: React.ReactNode;
  postId?: string;
  commentId?: string;
};

export default function LikesModal({ children, postId, commentId }: props) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="grid grid-rows-[auto_1fr] h-full max-h-[calc(50%)]">
        <DialogHeader>
          <DialogTitle className="">{"Likes"}</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <LikedByList postId={postId} commentId={commentId} />
      </DialogContent>
    </Dialog>
  );
}
