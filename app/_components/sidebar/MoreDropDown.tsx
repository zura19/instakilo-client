"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import More from "./More";
import { Bookmark, Settings } from "lucide-react";
import Logout from "./Logout";
import useUser from "@/app/_hooks/useUser";
import Link from "next/link";

type props = {
  showSmallSidebar: () => boolean;
};

export default function MoreDropDown({ showSmallSidebar }: props) {
  const itemClass = `px-4 py-2 text-xs cursor-pointer`;
  const { user } = useUser();

  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="mt-auto w-full">
          <More showSmallSidebar={showSmallSidebar} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[240px]  rounded-sm">
          <DropdownMenuItem className={itemClass} asChild>
            <Link
              href={`/profile/${user?.id}/?tab=saved`}
              className="flex items-center"
            >
              <Bookmark size={20} className="mr-1" />
              <span>Saved</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={itemClass} asChild>
            <Link href="/settings" className="flex items-center">
              <Settings size={20} className="mr-1" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Logout itemClass={itemClass} />
        </DropdownMenuContent>
      </DropdownMenu>
    );
}
