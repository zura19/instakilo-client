"use client";
import Link from "next/link";
import UserProfilePicture from "../UserProfilePicture";
import useUser from "@/app/_hooks/useUser";

export default function LoggedUserStory() {
  const { user } = useUser();
  if (user)
    return (
      <div className=" py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href={`/story/${user?.id}`}
            className="p-[2px] bg-input/70 rounded-full"
          >
            <UserProfilePicture
              image={user?.image}
              imageSize="md"
              iconSize="xl"
            />
          </Link>
          <Link href={`/profile/${user?.id}`} className="text-sm font-semibold">
            {user?.name}
          </Link>
        </div>
        <Link
          href="/story"
          className="text-xs text-blue-400 font-semibold hover:text-blue-300 transition-all duration-300"
        >
          Add Story
        </Link>
      </div>
    );
}
