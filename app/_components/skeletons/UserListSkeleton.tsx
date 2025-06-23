import { Skeleton } from "@/components/ui/skeleton";

type props = {
  count?: number;
  divClass?: string;
};

export default function UserListSkeleton({ count = 12, divClass = "" }: props) {
  return (
    <div className={`px-4 space-y-1 ${divClass}`}>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div className="flex items-center gap-2 py-1.5" key={index}>
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        ))}
    </div>
  );
}
