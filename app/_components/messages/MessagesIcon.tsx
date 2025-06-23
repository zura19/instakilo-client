"use client";
import useUser from "@/app/_hooks/useUser";
import useMessagesSocket from "@/app/_hooks/useMessagesSocket";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type props = {
  strokeWidth: number;
  ICONCLASS: string;
  ICONSIZE: number;
};

const api = process.env.NEXT_PUBLIC_SERVER_URL;
async function countUnread(): Promise<{ count: number }> {
  const res = await fetch(`${api}/messages/countUnread`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function MessagesIcon({
  ICONCLASS,
  ICONSIZE,
  strokeWidth,
}: props) {
  const [mounted, setMounted] = useState(false);

  const { user } = useUser();
  const { count } = useMessagesSocket();
  const searchParams = useSearchParams();
  const convPath = searchParams.get("cId") && searchParams.get("with");

  const { data } = useQuery({
    queryKey: [`countUnread-${user?.id}`],
    queryFn: countUnread,
  });

  useEffect(() => setMounted(true), []);

  return (
    <div className="relative">
      <MessageCircle
        strokeWidth={strokeWidth}
        className={ICONCLASS + "  relative"}
        size={ICONSIZE}
      ></MessageCircle>

      {mounted && !convPath && count > 0 && (
        <span className="absolute flex items-center justify-center  top-0 right-0   bg-red-500 rounded-full font-bold text-[9px] size-[12px]">
          {count}
        </span>
      )}

      {mounted && !convPath && data && count === 0 && data?.count > 0 && (
        <span className="absolute flex items-center justify-center  top-0 right-0   bg-red-500 rounded-full font-bold text-[9px] size-[12px]">
          {data?.count}
        </span>
      )}

      {mounted && convPath && data && data?.count > 0 && (
        <span className="absolute flex items-center justify-center  top-0 right-0   bg-red-500 rounded-full font-bold text-[9px] size-[12px]">
          {data?.count}
        </span>
      )}
    </div>
  );
}
