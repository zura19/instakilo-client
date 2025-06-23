import { useInfiniteQuery } from "@tanstack/react-query";
import useUser from "./useUser";
import { useSearchParams } from "next/navigation";
import { conversationType, messageType } from "@/lib/types/messageTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useMessagesSocket from "./useMessagesSocket";
import { useQueryClient } from "@tanstack/react-query";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

// prettier-ignore
type getConversationType =  {success: true; conversation: conversationType,nextPage: number|null} | {success: false;message: string};
// prettier-ignore
type sentMessageType = {success: true; message:messageType } | {success: false; message: string};

// prettier-ignore
async function getConversation({ secondUserId, page, limit = 15}: {secondUserId: string; page?: number; limit?: number}): Promise<getConversationType> {
  const res = await fetch(
    `${api}/messages/conversation/${secondUserId}?page=${page}&limit=${limit}`,
    { credentials: "include" }
  );
  const data = await res.json();
  return data;
}

async function sentMessage(
  secondUserId: string,
  message: string
): Promise<sentMessageType> {
  const res = await fetch(`${api}/messages/${secondUserId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  return data;
}

async function readMessages(secondUserId: string, conversationId: string) {
  const res = await fetch(
    `${api}/messages/readMessages/${conversationId}/${secondUserId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
}

export default function useMessages() {
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const withId = searchParams.get("with");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<getConversationType>({
      queryKey: [`conversation-${withId}`],
      queryFn: ({ pageParam = 0 }) =>
        getConversation({
          secondUserId: withId as string,
          page: pageParam as number,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.success ? lastPage.nextPage : undefined,
      enabled: !!user && !!withId,
    });

  const { msgs, sendMessage } = useMessagesSocket();

  function checkMessageType(id: string): "me" | "other" {
    if (id === user?.id) {
      return "me";
    }
    return "other";
  }

  async function handleSentMessage(message: string): Promise<boolean> {
    sendMessage(message);
    console.log("WithId:" + withId);
    const data = await sentMessage(withId as string, message);

    if (!data.success) {
      toast.error(data.message);
      return false;
    }

    return true;
  }

  async function handleReadMessages() {
    if (!data?.pages[0].success) return;
    const read = await readMessages(
      withId as string,
      data.pages[0].conversation.id as string
    );
    if (!read.success) {
      toast.error(read.message);
    }
    queryClient.invalidateQueries({
      queryKey: [`countUnread-${user?.id}`],
    });
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    data,
    msgs,
    isLoading,
    checkMessageType,
    mounted,
    handleSentMessage,
    handleReadMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
