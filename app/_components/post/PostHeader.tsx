import { Dot, Ellipsis } from "lucide-react";
import UserProfilePicture from "../UserProfilePicture";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";
import FollowButton from "../FollowButton";
import UserTooltip from "../UserTooltip";
import PostOptionsModal from "./PostOptionsModal";
import { tagType } from "../upload/TaggedAccordion";
type props = {
  postId: string; // Optional, used in PostOptionsModal
  userId: string;
  username: string;
  image?: string;
  createdAt: string;
  className?: string;
  followersArr: { followerId: string }[];
  post: {
    content: string;
    images: string[];
    tags: tagType[];
  };
};

export default function PostHeader({
  postId,
  userId,
  username,
  createdAt,
  image,
  followersArr,
  post,
  className,
}: props) {
  return (
    <header className={`flex items-center py-1.5 px-1 gap ${className} `}>
      <UserTooltip id={userId}>
        <Link href={`profile/${userId}`} className="flex items-center gap-2">
          <UserProfilePicture
            image={image || ""}
            imageSize="sm"
            iconSize="sm"
          />
          <p className="text-xs font-medium">{username}</p>
        </Link>
      </UserTooltip>
      <div className="flex items-center text-sm text-primary">
        <Dot size={16} />
        <p className="text-xs text-secondary-foreground/70">
          {timeAgo(createdAt)}
        </p>
        <FollowButton
          mounted={false}
          followersArr={followersArr}
          userId={userId}
          btnVariant="link"
        />
      </div>
      <PostOptionsModal post={post} postId={postId} userId={userId}>
        <Ellipsis
          className="ml-auto text-primary cursor-pointer hover:text-primary/70 transition-all duration-200 "
          size={18}
        />
      </PostOptionsModal>
    </header>
  );
}
