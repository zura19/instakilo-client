import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PostModalContent from "./PostModalContent";
import useGetPost from "@/app/_hooks/useGetPost";
import Loader from "../Loader";
import { useEffect } from "react";

type props = { children?: React.ReactNode };
export default function PostModal({ children }: props) {
  const searchParams = useSearchParams();
  const isActive = !!searchParams.get("post");
  const { data, isLoading } = useGetPost(searchParams.get("post")!);
  const pathName = usePathname();
  const router = useRouter();

  const handleOpenChange = (newOpenState: boolean) => {
    if (!newOpenState) {
      const currentParams = new URLSearchParams(searchParams.toString());
      if (currentParams.has("post")) {
        currentParams.delete("post");
        currentParams.delete("c");

        router.replace(`${pathName}?${currentParams.toString()}`);
      }
    }
  };

  useEffect(() => {
    if (isActive && !isLoading && !data?.post) {
      handleOpenChange(false);
    }
  }, [isActive, isLoading, data?.post]);

  return (
    <Dialog open={isActive} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[1000px] max-h-[calc(100%-2rem)] h-full w-full p-0 my-0  rounded-none outline-0"
      >
        {(isLoading || !data?.post) && (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        )}
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        {!isLoading && data?.post && (
          <PostModalContent post={data?.post} isActive={isActive} />
        )}
      </DialogContent>
    </Dialog>
  );
}
