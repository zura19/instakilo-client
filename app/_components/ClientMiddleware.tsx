"use client";
import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

export default function ClientMiddleware() {
  const user = localStorage.getItem("user");
  const pathname = usePathname();

  useEffect(() => {
    const authRoutes = ["/login", "/register"];
    const privateRoutes = [
      "/profile",
      "/notifications",
      "/messages",
      "/settings",
      "/settings/edit",
      "/settings/notifications",
      "/settings/updatePassword",
      "/settings/theme",
    ];

    if (user && authRoutes.includes(pathname)) {
      redirect("/");
    }

    if (!user && privateRoutes.includes(pathname)) {
      redirect("/login");
    }
  }, [user, pathname]);

  return null;
}
