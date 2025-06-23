"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useUser from "../_hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";

type props = {
  btnVariant: "default" | "link";
  className?: string;
  userId: string;
  mounted?: boolean;
  followersArr: { followerId: string }[];
};

const api = process.env.NEXT_PUBLIC_SERVER_URL;

async function FollowUnfollow(
  followingId: string
): Promise<{ success: boolean }> {
  try {
    const res = await fetch(`${api}/users/follow/${followingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) return { success: false };

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export default function FollowButton({
  btnVariant = "default",
  userId,
  mounted = true,
  followersArr,
  className,
}: props) {
  const [isMounted, setIsMounted] = useState(mounted);
  const { user } = useUser();
  const loggedUserId = user?.id;
  const [followers, setFollowers] = useState(
    followersArr?.map((follower) => follower.followerId)
  );
  const isFollowed = followers?.includes(loggedUserId as string);

  const linkClass =
    " text-blue-400 text-xs hover:text-blue-300 hover:no-underline ";
  const btnClass = `${
    isFollowed
      ? "bg-secondary hover:bg-secondary/70 "
      : "bg-blue-500 hover:bg-blue-600"
  } text-primary  rounded-md px-4 h-7  text-xs `;

  async function handleFollowUnfollow() {
    setFollowers((prev) =>
      isFollowed
        ? prev.filter((id) => id !== loggedUserId)
        : [...prev, loggedUserId as string]
    );

    const data = await FollowUnfollow(userId);

    if (!data.success) {
      setFollowers((prev) =>
        !isFollowed
          ? prev.filter((id) => id !== loggedUserId)
          : [...prev, loggedUserId as string]
      );
      toast.error(`Failed to ${isFollowed ? "unfollow" : "follow"} `);
      return;
    }

    toast.success(`${isFollowed ? "Unfollowed" : "Followed"} successfully!`);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Skeleton className="ml-2 h-4 w-16 rounded-full" />;

  if (isMounted && loggedUserId && loggedUserId !== userId)
    return (
      <Button
        onClick={handleFollowUnfollow}
        size={"sm"}
        variant={btnVariant}
        className={` ${
          btnVariant === "link" ? linkClass : btnClass
        }   transition-all duration-300  ${className}`}
      >
        {isFollowed ? "Following" : "Follow"}
      </Button>
    );
}
