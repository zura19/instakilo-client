import { NotificationType } from "@/lib/types/notificationTypes";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type getType =
  | {
      success: true;
      notifications: NotificationType[];
      nextPage: number | null;
    }
  | { success: false; message: string };

const api = process.env.NEXT_PUBLIC_SERVER_URL;

async function getNotifications(
  limit?: number,
  page?: number
): Promise<getType> {
  const res = await fetch(`${api}/notifications?limit=${limit}&page=${page}`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

async function readNotifications(): Promise<{ success: boolean }> {
  const res = await fetch(`${api}/notifications/read`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function useNotifications() {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<getType>({
      queryKey: ["notifications"],
      queryFn: ({ pageParam }) => getNotifications(15, pageParam as number),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.success && lastPage.nextPage,
    });

  const isFirstPage = data?.pages[0].success;

  useEffect(() => {
    if (!isFirstPage) return;
    async function read() {
      const res = await readNotifications();
      if (!res.success) return;
      queryClient.invalidateQueries({ queryKey: ["count-notifications"] });
    }

    read();
  }, [queryClient, isFirstPage]);

  return {
    data,
    isLoading,
    isFirstPage,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
