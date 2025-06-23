import { Skeleton } from "@/components/ui/skeleton";

type props = {
  count?: number;
};

export default function PostOnProfileSkeleton({ count = 1 }: props) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: count }, (_, index) => index).map((i) => (
        <Skeleton key={i} className="h-[300px] w-full rounded-none " />
      ))}
    </div>
  );
}
