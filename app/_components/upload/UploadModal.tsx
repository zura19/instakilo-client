"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadImage from "./UploadImage";
import useCreatePost from "@/app/_hooks/useCreatePost";
import UploadPost from "./UploadPost";
import { useState } from "react";
import useUser from "@/app/_hooks/useUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tagType } from "./TaggedAccordion";

type props = {
  children: React.ReactNode;
  updatePage?: number;
  updateSession?: boolean;
  post?: {
    content: string;
    tags: tagType[];
  };
  postId?: string;
};

export default function UploadModal({
  children,
  updateSession = false, // Default to false, not used in this component
  updatePage,
  post,
  postId,
}: props) {
  const { page } = useCreatePost();
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  function handleModalClose() {
    setOpen(false);
  }

  console.log(updatePage);

  const realPage = updateSession ? updatePage : page;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="w-full cursor-pointer transition-all duration-200"
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent
        className={`${
          realPage === 2
            ? "w-full sm:max-w-[calc(90%-2rem)] md:max-w-[calc(90%-2rem)] lg:max-w-[calc(80%-2rem)] xl:max-w-[calc(65%-2rem)] sm:w-full h-[calc(90dvh)]"
            : "h-[calc(70dvh)]"
        }  grid-rows-[auto_1fr] transition-all duration-500`}
      >
        {!user ? (
          <>
            <DialogTitle>Authorize to create post</DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
            <Button onClick={() => handleModalClose()} asChild>
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </Button>
          </>
        ) : (
          <>
            <DialogHeader className="">
              <DialogTitle>Create new post</DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
            </DialogHeader>
            {page === 1 ? (
              <UploadImage />
            ) : (
              <UploadPost
                updateSession={updateSession}
                postId={postId}
                oldPost={post}
                closeModal={() => handleModalClose()}
              />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
