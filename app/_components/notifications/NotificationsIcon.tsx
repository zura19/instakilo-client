"use client";
import useMessagesSocket from "@/app/_hooks/useMessagesSocket";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

type props = {
  strokeWidth: number;
  ICONCLASS: string;
  ICONSIZE: number;
};

const api = process.env.NEXT_PUBLIC_SERVER_URL;
async function countUnread(): Promise<{ count: number }> {
  const res = await fetch(`${api}/notifications/count`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function NotificationsIcon({
  ICONCLASS,
  ICONSIZE,
  strokeWidth,
}: props) {
  const [mounted, setMounted] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["count-notifications"],
    queryFn: countUnread,
  });

  const { notifications } = useMessagesSocket();

  useEffect(() => setMounted(true), []);

  if (!mounted || isLoading)
    return (
      <Heart size={ICONSIZE} strokeWidth={strokeWidth} className={ICONCLASS} />
    );

  return (
    <div className="relative">
      <Heart
        strokeWidth={strokeWidth}
        className={ICONCLASS + "  relative"}
        size={ICONSIZE}
      />

      {notifications.length > 0 && (
        <span className="absolute flex items-center justify-center  top-0 right-0   bg-red-500 rounded-full font-bold text-[9px] size-[12px]">
          {notifications.length}
        </span>
      )}

      {data && notifications.length === 0 && data?.count > 0 && (
        <span className="absolute flex items-center justify-center  top-0 right-0   bg-red-500 rounded-full font-bold text-[9px] size-[12px]">
          {data?.count}
        </span>
      )}
    </div>
  );
}
