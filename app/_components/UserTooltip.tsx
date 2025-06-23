"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fullUserType } from "@/lib/types/userTypes";
import { useQuery } from "@tanstack/react-query";
import ProfileHeaderProtect from "./profile/ProfileHeaderProtect";
import useUser from "../_hooks/useUser";
import UserProfilePicture from "./UserProfilePicture";
import ProfileHeaderSkeleton from "./skeletons/ProfileHeaderSkeleton";
import FollowersFollowingsModal from "./profile/FollowersFollowingsModal";

type props = {
  children: React.ReactNode;
  id?: string;
};

// prettier-ignore
type getUserType = Promise<{ success: true; user: fullUserType; posts: number } | { success: false; message: string }>;

const api = process.env.NEXT_PUBLIC_SERVER_URL;

async function getUserProfile(id: string): getUserType {
  const response = await fetch(`${api}/users/${id}`, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
}

export default function UserTooltip({ children, id }: props) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent className="bg-background shadow-sm shadow-accent rounded-sm">
        <UserTooltipContent userId={id as string} />
      </TooltipContent>
    </Tooltip>
  );
}

function UserTooltipContent({ userId }: { userId: string }) {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: [`user-${userId}`],
    queryFn: () => getUserProfile(userId!),
    enabled: !!userId,
  });

  if (isLoading) return <ProfileHeaderSkeleton isTooltip={true} />;

  if (!data?.success) {
    return <p>{data?.message}</p>;
  }

  const {
    id,
    name,
    image,
    followers: followersArr,
    following: followingArr,
    bio,
  } = data.user;

  console.log(data);

  return (
    <section className="flex items-start gap-2 p-4">
      <UserProfilePicture image={image} imageSize="xl" iconSize="xl" />
      <div className="space-y-4">
        <ProfileHeaderProtect
          id={id}
          followersArr={followersArr}
          loggedUserId={user ? user.id : undefined}
          name={name}
        />
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <p>
            <span className="text-white">{data.posts} </span>
            posts
          </p>
          <FollowersFollowingsModal id={id} type="followers">
            <p className="cursor-pointer">
              <span className="text-white">{followersArr.length} </span>
              followers
            </p>
          </FollowersFollowingsModal>
          <FollowersFollowingsModal id={id} type="following">
            <p className="cursor-pointer">
              <span className="text-white">{followingArr.length} </span>
              following
            </p>
          </FollowersFollowingsModal>
        </div>
        <p className="text-sm break-words text-primary">{bio || ""}</p>
      </div>
    </section>
  );
}
