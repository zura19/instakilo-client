"use client";
import Post from "./Post";
import useGetPost from "@/app/_hooks/useGetPost";
import PostsSkeleton from "../skeletons/PostsSkeleton";
// import useInfinite from "@/app/_hooks/useInfinite";
import LoginToSee from "../LoginToSee";
import InfiniteLoader from "../InfiniteLoader";
import Loader from "../Loader";

export default function PostList() {
  // prettier-ignore
  const { feed: data, isLoadingFeed: isLoading, user, hasNextPage, fetchNextPage, isFetchingNextPage} = useGetPost();
  // prettier-ignore
  // const { ref } = useInfinite({fetchNextPage, hasNextPage, isFetchingNextPage});

  const firstPage = data?.pages[0];

  if (isLoading) return <PostsSkeleton count={2} />;

  if (!firstPage?.success) {
    return (
      <div>
        <p>{firstPage?.message}</p>
      </div>
    );
  }

  if (firstPage?.success) {
    const posts =
      data?.pages.filter((p) => p.success).flatMap((p) => p.posts) || [];

    return (
      <div className="flex flex-col items-center gap-12">
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <InfiniteLoader
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        >
          <Loader />
        </InfiniteLoader>
        {/* {hasNextPage && !isFetchingNextPage && (
          <div ref={ref} className="h-5 w-full" />
        )}
        {isFetchingNextPage && <PostsSkeleton count={1} />} */}

        {!user && (
          <LoginToSee
            btnClassName="w-full"
            message="Please login to see more posts"
          />
        )}
      </div>
    );
  }
}
