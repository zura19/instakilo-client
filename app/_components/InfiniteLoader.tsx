import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type props = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  children: React.ReactNode;
};

export default function InfiniteLoader({
  children,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: props) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      {hasNextPage && !isFetchingNextPage && (
        <div className="h-5 w-full" ref={ref}></div>
      )}
      {isFetchingNextPage && children}
    </>
  );
}
