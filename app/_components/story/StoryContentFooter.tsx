import { Input } from "@/components/ui/input";
import { Heart, Send } from "lucide-react";
import { useRef, useState } from "react";
import Emojy from "../Emojy";

export default function StoryContentFooter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");

  const likeClass = liked
    ? "fill-red-500 stroke-red-500"
    : " fill-transparent stroke-primary transition-all";

  return (
    <div className="absolute flex items-center gap-4 bottom-0 p-4 w-full transition-all duration-300">
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        ref={inputRef}
        className="rounded-full w-full border-primary placeholder:text-xs placeholder:text-primary dark:bg-transparent focus-visible:ring-0 focus-visible:border-primary "
        placeholder="Write a comment..."
      />

      {comment.length > 0 ? (
        <>
          <Send
            size={26}
            className="text-primary cursor-pointer hover:text-primary/70 transition-all duration-300 "
          />
          <Emojy
            /* @ts-expect-error idk */
            inputRef={inputRef}
            iconClass="text-primary cursor-pointer hover:text-primary/70 transition-all duration-300"
            text={comment}
            setText={setComment}
          />
        </>
      ) : (
        <Heart
          onClick={() => setLiked(!liked)}
          size={26}
          strokeWidth={2.3}
          className={`${likeClass} duration-300 cursor-pointer`}
        />
      )}
    </div>
  );
}
