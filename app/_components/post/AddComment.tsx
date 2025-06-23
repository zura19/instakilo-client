"use client";
import useComments from "@/app/_hooks/useComments";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import Emojy from "../Emojy";

type props = {
  postId: string;
  iconClass?: string;
  iconSize?: number;
  className?: string;
};

export default function AddComment({
  postId,
  iconClass = "",
  iconSize = 20,
  className = "",
}: props) {
  const [comment, setComment] = useState("");
  const { handleAddComment, isLoading } = useComments(postId);
  const inputRef = useRef(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!comment) return;
    const content = comment.trim();

    const data = await handleAddComment(content);
    if (!data) return;
    setComment("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={"flex items-center gap-2 px-1 py-1.5  " + className}
    >
      <Textarea
        rows={2}
        ref={inputRef}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="p-0 resize-none md:text-xs text-xs border-0 rounded-none placeholder:text-xs focus-visible:ring-0 focus-visible::border-0 dark:bg-background"
      />

      <button
        disabled={!comment || isLoading}
        type="submit"
        className="text-xs text-blue-400 font-medium hover:text-blue-300 transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:cursor-text disabled:text-background"
      >
        post
      </button>

      <Emojy
        // @ts-expect-error idk
        inputRef={inputRef}
        setText={setComment}
        text={comment}
        iconClass={iconClass}
        iconSize={iconSize}
      />
    </form>
  );
}
