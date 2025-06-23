"use client";
import useMessagesSocket from "@/app/_hooks/useMessagesSocket";
import { timeAgo } from "@/lib/utils";
import { useEffect, useState } from "react";

type props = {
  withUser: { id: string; name: string; image: string };
  lastmessage: string;
  lastmessageAt: string;
};
export default function LastMessage({
  withUser,
  lastmessage,
  lastmessageAt,
}: props) {
  const { msgs } = useMessagesSocket();
  const lastM = msgs[0];
  const [last, setLast] = useState(lastM?.message || lastmessage);
  const [lastMessageAt, setLastMessageAt] = useState(
    lastM?.createdAt || lastmessageAt
  );

  useEffect(() => {
    setLast(lastM?.message || lastmessage);
    setLastMessageAt(lastM?.createdAt || lastmessageAt);
  }, [lastM, lastmessage, lastmessageAt, msgs]);

  console.log(lastM);

  return (
    <div>
      <p className="text-sm font-semibold">{withUser.name}</p>
      <div className="flex items-center gap-2 text-xs text-primary/50">
        {lastM && lastM?.senderId !== withUser.id ? "You:" : ""}
        <p>{last?.length > 20 ? last.slice(0, 20) + "..." : last}</p>
        <p>
          {timeAgo(lastMessageAt).includes("0s")
            ? "now"
            : timeAgo(lastMessageAt)}
        </p>
      </div>
    </div>
  );
}
