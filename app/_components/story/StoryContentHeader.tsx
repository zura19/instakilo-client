"use client";
import { MoreHorizontal, Pause, Play } from "lucide-react";
import StoryTimer from "./StoryTimer";
import UserProfilePicture from "../UserProfilePicture";
import Link from "next/link";

type props = {
  active: number;
  isPaused: boolean;
  togglePause: () => void;
  arrLength: number;
};

export default function StoryContentHeader({
  active,
  isPaused,
  togglePause,
  arrLength,
}: props) {
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
        <Link href="/profile/1" className="flex items-center gap-1">
          <UserProfilePicture imageSize="xs" iconSize="xs" />
          <p className="text-xs">Username</p>
          <p className="text-xs text-muted-foreground">20h</p>
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
          <MoreHorizontal
            className="text-primary cursor-pointer"
            strokeWidth={3}
            size={20}
          />
        </div>
      </div>
    </div>
  );
}
