import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import Emojy from "../Emojy";
import { Button } from "@/components/ui/button";

type props = {
  children: React.ReactNode;
  content: string;
  isLoading?: boolean;
  update: (c: string) => Promise<boolean>;
};

export default function EditCommentModal({
  children,
  content: oldContent,
  isLoading,
  update,
}: props) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(oldContent);

  const dissableBtn = content === oldContent || isLoading;

  function closeModal() {
    setOpen(false);
  }

  async function updateComment() {
    const d = await update(content);
    if (!d) return;
    closeModal();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center">
          <Input
            ref={inputRef}
            value={content}
            placeholder="What's on your mind?"
            onChange={(e) => setContent(e.target.value)}
            className="rounded-none dark:bg-background border-0 focus-visible:ring-0 "
          />
          <Emojy
            iconClass="cursor-pointer hover:opacity-80 transition-all duration-300"
            setText={setContent}
            /* @ts-expect-error type */
            inputRef={inputRef}
            text={content}
          />
        </div>
        <Button
          disabled={dissableBtn}
          className="rounded-xs"
          onClick={updateComment}
        >
          {isLoading ? "Loading..." : "Edit"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
