"use client";
import Link from "next/link";
import UserProfilePicture from "./UserProfilePicture";
import useUser from "../_hooks/useUser";
import { useEffect, useState } from "react";
import UserSkeleton from "./skeletons/UserSkeleton";

type props = {
  size?: "sm" | "md" | "lg";
};

export default function UserComp({ size = "md" }: props) {
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <UserSkeleton />;

  if (mounted)
    return (
      <Link
        href={`/profile/${user?.id}`}
        className="flex items-center gap-2 text-primary px-2 py-1.5 hover:bg-accent w-full rounded-sm transition-all duration-300"
      >
        <UserProfilePicture
          imageSize={size}
          iconSize={size}
          image={user?.image}
        />
        <div className="flex flex-col">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-primary/50 line-clamp-1">
            {user?.email && user?.email?.length > 25
              ? user?.email.slice(0, 25) + "..."
              : user?.email}
          </p>
        </div>
      </Link>
    );
}
