import { Input } from "@/components/ui/input";
import { Heart, Send } from "lucide-react";
import { useRef, useState } from "react";
import Emojy from "../Emojy";
import { toast } from "sonner";

type props = {
  storyId: string;
  isLiked: boolean;
};

const api = process.env.NEXT_PUBLIC_SERVER_URL;
async function likeUnlike(storyId: string) {
  const res = await fetch(`${api}/stories/like/${storyId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function StoryContentFooter({ storyId, isLiked }: props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [liked, setLiked] = useState(isLiked);
  const [comment, setComment] = useState("");

  const likeClass = liked
    ? "fill-red-500 stroke-red-500"
    : " fill-transparent stroke-primary transition-all";

  async function handleLikeUnlike() {
    try {
      setLiked((l) => !l);
      const data = await likeUnlike(storyId);

      if (!data.success) {
        setLiked((p) => !p);
        toast.error(data.message);
        return;
      }
      // toast.success(data.message);
    } catch (error) {
      setLiked((p) => !p);
      console.log(error);
    }
  }

  return (
    <div className="absolute flex items-center gap-4 bottom-0 p-4 w-full transition-all duration-300">
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        ref={inputRef}
        className="rounded-full w-full border-primary placeholder:text-xs placeholder:text-primary dark:bg-transparent focus-visible:ring-0 focus-visible:border-primary "
        placeholder="Replay..."
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
          onClick={handleLikeUnlike}
          size={26}
          strokeWidth={2.3}
          className={`${likeClass} duration-300 cursor-pointer`}
        />
      )}
    </div>
  );
}
