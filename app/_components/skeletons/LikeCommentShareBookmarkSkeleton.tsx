import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LikeCommentShareBookmarkSkeleton() {
  const size = "size-6";
  return (
    <div className="px-2 py-2">
      <div className="flex items-center gap-2 mb-1.5">
        <Skeleton className={`${size} rounded-full`} />
        <Skeleton className={`${size} rounded-full`} />
        <Skeleton className={`${size} rounded-full`} />
        <Skeleton className={`${size} rounded-full ml-auto`} />
      </div>
      <Skeleton className={`${size} w-[25%] h-4 rounded-full `} />
    </div>
  );
}
