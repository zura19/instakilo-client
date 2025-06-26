// import { cookies } from "next/headers";
"use client";
import { useQuery } from "@tanstack/react-query";
import MessageUser from "./MessageUser";
import Loader from "../Loader";

const api = process.env.NEXT_PUBLIC_SERVER_URL;

type conversationsType = {
  id: string;
  conversationWith: { id: string; name: string; image: string };
  lastMessage: string;
  lastMessageAt: string;
  hasToRead: boolean;
};

async function getConvs(): Promise<
  | { success: true; conversations: conversationsType[] }
  | { success: false; message: string }
> {
  const res = await fetch(`${api}/messages/conversations`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

type props = { withId: string };

export default function ConversationList({ withId }: props) {
  const { data, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConvs,
  });
  if (isLoading) return <Loader boxClassName="mx-auto py-6" />;

  if (!data?.success) return <div>{data?.message}</div>;

  if (data.success) {
    const { conversations } = data;
    console.log(conversations);
    return (
      <div className="flex flex-col overflow-scroll h-[575px] space-y-1">
        {conversations.map((c) => (
          <MessageUser
            key={c.id}
            id={c.id}
            withSearchParam={withId}
            to={`/messages/?with=${c.conversationWith.id}`}
            withUser={c.conversationWith}
            hasToRead={c.hasToRead}
            lastmessage={c.lastMessage}
            lastmessageAt={c.lastMessageAt}
          />
        ))}
      </div>
    );
  }
}
