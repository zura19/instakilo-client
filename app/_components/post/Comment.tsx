import Link from "next/link";
import UserProfilePicture from "../UserProfilePicture";
import { timeAgo } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";
import LikesModal from "./LikesModal";

type props = {
  commentId: string;
  content: string;
  userId: string;
  username: string;
  image: string;
  loggedUserId: string;
  likes: { id: string }[];
  isLiked: (likes: string[]) => boolean;
  handleLikeComment: (commentId: string) => Promise<{ success: boolean }>;
  createdAt: string;
};

export default function Comment({
  commentId,
  content,
  createdAt,
  userId,
  loggedUserId,
  username,
  likes,
  isLiked,
  handleLikeComment,
  image,
}: props) {
  const [optLikes, setOptLikes] = useState(likes);
  const isLikedOptimistic = isLiked(optLikes.map((like) => like.id));

  async function handleOptLikeComment() {
    setOptLikes((prev) =>
      isLikedOptimistic
        ? prev.filter((like) => like.id !== loggedUserId)
        : [...prev, { id: loggedUserId }]
    );

    const data = await handleLikeComment(commentId);

    console.log(data);

    if (!data?.success) {
      setOptLikes((prev) =>
        !isLikedOptimistic
          ? prev.filter((like) => like.id !== userId)
          : [...prev, { id: userId }]
      );
    }
  }

  return (
    <div id={`c-${commentId}`} className="flex items-center gap-2">
      <Link href={`/profile/${userId}`} className="self-start">
        <UserProfilePicture imageSize="xs" iconSize="xs" image={image} />
      </Link>
      <div className="space-y-2">
        <p className=" gap-2 break-words ">
          <Link
            href={`/profile/${userId}`}
            className="text-xs text-primary font-medium "
          >
            {username}
          </Link>
          <span className="ml-2 text-xs text-muted-foreground">{content}</span>
        </p>
        <div className="text-[10px] text-muted-foreground flex items-center gap-4">
          <p className="">{timeAgo(createdAt)}</p>
          <LikesModal commentId={commentId}>
            <p className="cursor-pointer">{optLikes.length} likes</p>
          </LikesModal>
        </div>
      </div>
      <div className="flex ml-auto self-start">
        <Heart
          onClick={handleOptLikeComment}
          size={12}
          className={`${
            isLikedOptimistic
              ? "stroke-red-500 fill-red-500 "
              : "stroke-primary fill-primary/0"
          } text-primary ml-auto self-start transition-all duration-300 cursor-pointer`}
        />
      </div>
    </div>
  );
}
