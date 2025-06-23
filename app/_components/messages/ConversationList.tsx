import { cookies } from "next/headers";
import MessageUser from "./MessageUser";

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
  const token = (await cookies()).get("jwt")?.value;
  const res = await fetch(`${api}/messages/conversations`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

type props = { withId: string };

export default async function ConversationList({ withId }: props) {
  const data = await getConvs();

  if (!data.success) return <div>{data.message}</div>;

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
