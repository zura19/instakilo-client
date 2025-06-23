import Link from "next/link";
import UserProfilePicture from "../UserProfilePicture";
import { timeAgo } from "@/lib/utils";

type props = {
  id: string;
  type: "post" | "comment" | "like" | "tag" | "follow" | "likedComment";
  sender: { id: string; image: string; name: string };
  redirectTo?: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
};

export default function Notification({
  sender,
  redirectTo,
  message,
  isRead,
  createdAt,
}: props) {
  function renderMessage(text: string, number: number) {
    if (text?.length > number) {
      return text?.slice(0, number) + "...";
    }
    return text;
  }

  return (
    <Link
      href={redirectTo || `/profile/${sender?.id}`}
      className="w-full grid grid-cols-[auto_1fr_auto] items-center px-2 py-2 hover:bg-accent/40 gap-2 text-xs transition-all duration-300"
    >
      <UserProfilePicture imageSize="sm" iconSize="sm" image={sender?.image} />
      <div className="flex flex-col w-full">
        <p>{renderMessage(message, 45)}</p>
        <p>{timeAgo(createdAt)}</p>
      </div>
      {isRead !== undefined && !isRead && (
        <div className="w-2 h-2 bg-blue-400 rounded-full" />
      )}
    </Link>
  );
}
