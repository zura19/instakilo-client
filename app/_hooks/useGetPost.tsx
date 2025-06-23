import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useUser from "./useUser";
import { postType } from "@/lib/types/postTypes";
import { useEffect, useState } from "react";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

type getPostsType =
  | { success: true; posts: postType[]; nextPage: number | null }
  | { success: false; message: string };

const getPost = async (postId?: string) => {
  const res = await fetch(`${api}/posts/${postId}`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

async function getPosts(
  userId: string,
  page: number,
  limit: number
): Promise<getPostsType> {
  const res = userId
    ? await fetch(`${api}/posts?page=${page}&limit=${limit}`, {
        credentials: "include",
      })
    : await fetch(`${api}/posts/randomPosts`);
  const data = await res.json();
  return data;
}

export default function useGetPost(postId?: string) {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: [`post-${postId}`],
    queryFn: () => getPost(postId),
    enabled: !!postId,
  });

  const {
    data: feed,
    isLoading: isLoadingFeed,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`posts`],
    queryFn: ({ pageParam }) => getPosts(user?.id || "", pageParam, 4),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.success && lastPage.nextPage !== null) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    enabled: !!mounted,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    data,
    isLoading,
    user,
    feed,
    isLoadingFeed,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
