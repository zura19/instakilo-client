"use client";
import useLogout from "@/app/_hooks/useLogout";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";
export default function Logout({ itemClass }: { itemClass: string }) {
  const { handleLogout } = useLogout();

  return (
    <DropdownMenuItem onClick={handleLogout} className={itemClass}>
      <span>Log out</span>
    </DropdownMenuItem>
  );
}
