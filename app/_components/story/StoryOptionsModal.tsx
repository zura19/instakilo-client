"use client";
import { Button } from "@/components/ui/button";
//prettier-ignore
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

//prettier-ignore
type props = { children: React.ReactNode; id:string; isLoggedUser: boolean; isPaused: boolean; togglePaused: () => void };
const api = process.env.NEXT_PUBLIC_SERVER_URL;

type res = {
  success: boolean;
  message: string;
};

async function deleteStory(storyId: string): Promise<res> {
  const res = await fetch(`${api}/stories/story/${storyId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function StoryOptionsModal({
  children,
  id: storyId,
  isLoggedUser,
  isPaused,
  togglePaused,
}: props) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!open || isPaused) return;
    togglePaused();
  }, [open, isPaused, togglePaused]);

  function closeModal() {
    setOpen(false);
    togglePaused();
  }

  function handleReport() {
    toast.success("Reported successfully");
    closeModal();
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const story = await deleteStory(storyId);
      if (!story.success) {
        toast.error(story.message);
        return;
      }
      toast.success("Deleted successfully");
      closeModal();
      redirect("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  const btnClassName =
    "rounded-none py-6 bg-transparent hover:bg-input/50  text-primary text-xs transition-all duration-200";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="px-0 max-w-[300px]  sm:max-w-[350px] py-2 bg-muted">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex flex-col divide-y">
            {isLoggedUser && (
              <Button
                onClick={handleDelete}
                variant={"default"}
                className={btnClassName}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            )}
            <Button
              onClick={handleReport}
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
