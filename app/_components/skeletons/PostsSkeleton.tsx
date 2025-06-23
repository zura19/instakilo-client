import { Skeleton } from "@/components/ui/skeleton";

type props = {
  count?: number;
};

export default function PostsSkeleton({ count = 1 }: props) {
  return (
    <div className="flex flex-col items-center gap-12">
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="w-[400px] space-y-4 border-b pb-4 border-border">
      <div className="grid grid-cols-[auto_1fr_auto] gap-x-3 items-center">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-1/2 rounded-full" />
        <Skeleton className="h-4 w-12 rounded-full" />
      </div>
      <Skeleton className="h-72 w-full rounded-[6px]" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-6 rounded-full ml-auto" />
      </div>
      <Skeleton className="h-4 w-1/8 rounded-full" />
      <Skeleton className="h-4 w-1/3 rounded-full" />
      <Skeleton className="h-4 w-full rounded-full" />
    </div>
  );
}
