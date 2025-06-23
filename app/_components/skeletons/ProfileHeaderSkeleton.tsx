import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileHeaderSkeleton({
  isTooltip = false,
}: {
  isTooltip: boolean;
}) {
  if (!isTooltip)
    return (
      <div className="flex items-start space-x-8">
        <Skeleton className="size-32 rounded-full" />
        <div className="space-y-4">
          <Skeleton className="h-5 w-[250px] rounded-full" />
          <Skeleton className="h-3 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
        </div>
      </div>
    );

  if (isTooltip)
    return (
      <div className="flex items-start space-x-2 p-4">
        <Skeleton className="size-14 rounded-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-[200px] rounded-full" />
          <Skeleton className="h-3 w-full rounded-full" />
          <Skeleton className="h-3 w-full rounded-full" />
        </div>
      </div>
    );
}
