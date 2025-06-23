"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchInput from "../search/SearchInput";
import FollowersFollowings from "./FollowersFollowings";
// import { Suspense } from "react";

type props = {
  type: "followers" | "following";
  children?: React.ReactNode;
  id: string;
};

export default function FollowersFollowingsModal({
  type,
  children,
  id,
}: props) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="grid grid-rows-[auto_1fr] h-full max-h-[calc(50%)]">
        <DialogHeader>
          <DialogTitle className="">{type}</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <SearchInput
            param={type === "followers" ? "follower" : "following"}
          />
        </DialogHeader>
        <FollowersFollowings id={id} type={type} />
      </DialogContent>
    </Dialog>
  );
}
