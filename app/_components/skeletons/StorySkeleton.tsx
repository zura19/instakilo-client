import { Skeleton } from "@/components/ui/skeleton";
import Loader from "../Loader";

type props = {
  index: number;
};

export default function StorySkeleton({ index }: props) {
  return (
    <div
      className={`relative w-full ${index === 2 ? "h-[90dvh]" : "h-[50dvh]"}`}
    >
      <div className="absolute px-2 mt-4 w-full z-10">
        <div className="h-[3px] bg-primary/50  rounded-full" />
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 translate-y-1/2 ">
        <Loader />
      </div>
      <Skeleton className="h-full w-full" />
    </div>
  );
}
