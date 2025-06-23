"use client";

import { Edit2 } from "lucide-react";
import UserProfilePicture from "../UserProfilePicture";
import { timeAgo } from "@/lib/utils";

type props = {
  type: "me" | "other";
  id: string;
  sender: { id: string; name: string; image: string };
  message: string;
  createdAt: string;
  ref: React.RefObject<HTMLDivElement>;
};

export default function Message({
  type,
  message,
  sender,
  createdAt,
  ref,
}: props) {
  const iconClass =
    "text-primary cursor-pointer hover:text-primary/70 transition-all duration-300";

  if (type === "other") {
    return (
      <div className="w-1/2 group" ref={ref}>
        <div className="flex items-center gap-2 justify-end text-xs py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ">
          <p>{timeAgo(createdAt)}</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-1">
          <div className="self-end">
            <UserProfilePicture
              imageSize="sm"
              iconSize="sm"
              image={sender.image}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs bg-accent rounded-2xl px-4 py-2 break-words">
              {message}
            </p>
            {/* <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
              <Edit2 size={14} className={iconClass} />
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  if (type === "me") {
    return (
      <div className="w-1/2 ml-auto flex flex-col group" ref={ref}>
        <div className="flex items-center gap-2 text-xs py-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p>{timeAgo(createdAt)}</p>
        </div>
        <div className="ml-auto grid grid-cols-[auto_1fr] items-center gap-1">
          <div className="flex items-center gap-2">
            <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
              <Edit2 size={14} className={iconClass} />
            </div>
            <p className="text-xs bg-blue-400  rounded-2xl  px-4 py-2 ml-auto break-words">
              {message}
            </p>
          </div>

          <div className="self-end">
            <UserProfilePicture
              imageSize="sm"
              iconSize="sm"
              image={sender.image}
            />
          </div>
        </div>
      </div>
    );
  }
}
