import { Skeleton } from "@/components/ui/skeleton";

type props = { c?: number };

export default function UserStorySkeleton({ c = 8 }: props) {
  return (
    <div className="grid grid-cols-8 gap-4">
      {Array.from({ length: c }).map((_, index) => (
        <Uskeleton key={index} />
      ))}
    </div>
  );
}

function Uskeleton() {
  return (
    <div className="flex flex-col justify-center items-center space-y-1">
      <Skeleton className="size-14 rounded-full" />
      <Skeleton className="w-full h-3" />
    </div>
  );
}
