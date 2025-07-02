"use client";
import { MoreHorizontal, Pause, Play } from "lucide-react";
import StoryTimer from "./StoryTimer";
import UserProfilePicture from "../UserProfilePicture";
import Link from "next/link";
import { storyType } from "@/lib/types/storyTypes";
import { timeAgo } from "@/lib/utils";
import StoryOptionsModal from "./StoryOptionsModal";

type props = {
  id: string;
  userId: string;
  active: number;
  isPaused: boolean;
  togglePause: () => void;
  arrLength: number;
  story: storyType;
  isLoggedUser: boolean;
};

export default function StoryContentHeader({
  id,
  userId,
  active,
  isPaused,
  togglePause,
  arrLength,
  story,
  isLoggedUser,
}: props) {
  const { author, createdAt } = story;
  const arr = Array.from({ length: arrLength });
  return (
    <div className="absolute w-full px-2 pt-4 space-y-4 z-10 ">
      <div className=" w-full flex gap-1">
        {arr.map((_, index) => (
          <StoryTimer
            isPaused={isPaused}
            key={index}
            index={index}
            active={active}
          />
        ))}
      </div>

      <div className="w-full flex justify-between items-center">
        <Link href={"/profile/" + userId} className="flex items-center gap-1">
          <UserProfilePicture
            image={author.image}
            imageSize="xs"
            iconSize="xs"
          />
          <p className="text-xs">{author.name}</p>
          <p className="text-xs text-muted-foreground">{timeAgo(createdAt)}</p>
        </Link>
        <div className="flex items-center gap-2">
          {!isPaused && (
            <Pause
              className="fill-primary cursor-pointer"
              size={18}
              onClick={togglePause}
            />
          )}
          {isPaused && (
            <Play
              className="fill-primary cursor-pointer"
              size={17}
              onClick={togglePause}
            />
          )}
          <StoryOptionsModal
            id={id}
            isLoggedUser={isLoggedUser}
            isPaused={isPaused}
            togglePaused={togglePause}
          >
            <MoreHorizontal
              className="text-primary cursor-pointer"
              strokeWidth={3}
              size={20}
            />
          </StoryOptionsModal>
        </div>
      </div>
    </div>
  );
}
