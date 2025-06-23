import { Skeleton } from "@/components/ui/skeleton";

export function SidebarUserSkeleton({ DIVCLASS }: { DIVCLASS: string }) {
  return (
    <div className={DIVCLASS + "  flex items-center gap-3 "}>
      <Skeleton className="h-6 w-6 rounded-full" />
      <Skeleton className="hidden sm:block h-4 w-[100px]" />
    </div>
  );
}
