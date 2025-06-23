"use client";
import Message from "./Message";
import Loader from "../Loader";
import useMessages from "@/app/_hooks/useMessages";
import React, { useEffect, useRef } from "react";
import ConversationError from "./ConversationError";
import InfiniteLoader from "../InfiniteLoader";

export default function MessangerMain() {
  const messageRef = useRef<HTMLDivElement>(null);
  // prettier-ignore
  const { data, isLoading, checkMessageType, mounted, msgs, handleReadMessages, fetchNextPage, isFetchingNextPage, hasNextPage} = useMessages();

  useEffect(() => {
    if (!mounted || isLoading) return;
    const read = async () => {
      console.log("read");
      await handleReadMessages();
    };
    const t = setTimeout(async () => {
      read();
    }, 1000);

    return () => clearTimeout(t);
  }, [mounted, isLoading, handleReadMessages]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const firstPage = data?.pages[0];
  if (!mounted || isLoading)
    return <Loader boxClassName="flex items-center justify-center" />;

  if (!firstPage?.success)
    return <ConversationError text={firstPage?.message as string} />;

  if (mounted && firstPage?.success) {
    const allMessages = data?.pages
      .filter((page) => page.success)
      .flatMap((page) => page.conversation.messages);

    const renderMessages = [...(allMessages as []), ...msgs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
      <main className="px-4 py-8 flex  flex-col-reverse overflow-scroll ">
        {renderMessages.map((message, i) => (
          <Message
            ref={messageRef as React.RefObject<HTMLDivElement>}
            key={i}
            sender={message.sender}
            id={message.id}
            type={checkMessageType(message.senderId)}
            message={message.message}
            createdAt={message.createdAt}
          />
        ))}
        <InfiniteLoader
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        >
          <Loader boxClassName="flex items-center justify-center" />
        </InfiniteLoader>
      </main>
    );
  }
}
