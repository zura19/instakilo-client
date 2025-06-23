import { commentType } from "@/lib/types/postTypes";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useUser from "./useUser";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

type getCommentsResponse =
  | {
      success: true;
      comments: commentType[];
      nextPage: number | null;
    }
  | { success: false; message: string };

async function getComments(
  postId: string,
  limit: number = 0,
  page: number = 0
): Promise<getCommentsResponse> {
  const res = await fetch(
    `${api}/comments/${postId}?limit=${limit}&page=${page}`,
    {
      credentials: "include",
    }
  );
  const data = await res.json();
  return data;
}

async function addComment(postId: string, content: string) {
  console.log(`${api}/comments/${postId}`);
  const res = await fetch(`${api}/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
    credentials: "include",
  });

  const data = await res.json();
  return data;
}

async function likeComment(postId: string, commentId: string) {
  const res = await fetch(`${api}/comments/${postId}/like/${commentId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export default function useComments(postId: string) {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const p = searchParams.get("post");
  const c = searchParams.get("c");

  const {
    data,
    isLoading: isLoadingComments,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<getCommentsResponse>({
    queryKey: [`comments-${postId}`],
    queryFn: ({ pageParam }) => getComments(postId, 10, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.success && lastPage.nextPage,
    enabled: !!p && p === postId,
    refetchInterval: 1000 * 60 * 5, //5 minutes
  });

  async function handleAddComment(content: string) {
    if (!user) {
      toast.error("Please login to add comment");
      return;
    }

    setIsLoading(true);

    try {
      const data = await addComment(postId, content);
      if (!data.success) {
        toast.error(data.message);
        return false;
      }

      toast.success("Comment added successfully!");
      queryClient.invalidateQueries({
        queryKey: [`comments-${postId}`],
        exact: true,
      });
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function isLiked(likes: string[]) {
    return likes.includes(user?.id as string);
  }

  async function handleLikeComment(
    commentId: string
  ): Promise<{ success: boolean }> {
    try {
      const comLike = await likeComment(postId, commentId);

      if (!comLike.success) {
        toast.error(comLike.message);
        return { success: false };
      }
      queryClient.invalidateQueries({
        queryKey: [`comments-${postId}`],
        exact: true,
      });
      toast.success(comLike.message);
      return { success: true };
    } catch (error) {
      console.log(error);
      toast.error("Failed to like comment");
      return { success: false };
    }
  }

  return {
    data,
    isLoadingComments,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    handleAddComment,
    isLiked,
    handleLikeComment,
    commentId: c,
    loggedUserId: user?.id,
  };
}
