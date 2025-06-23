import { Skeleton } from "@/components/ui/skeleton";

type props = {
  size?: "sm" | "md" | "lg";
};

export default function UserSkeleton({ size = "md" }: props) {
  const sizes = {
    sm: "w-8 h-8",
    md: "size-12",
    lg: "size-16",
  };
  return (
    <div className="px-2 py-1 grid grid-cols-[auto_1fr] gap-2 items-center">
      <Skeleton className={`${sizes[size]} rounded-full`} />
      <div className="space-y-2">
        <Skeleton className={`w-1/2 h-3`} />
        <Skeleton className={`w-full h-3`} />
      </div>
    </div>
  );
}
