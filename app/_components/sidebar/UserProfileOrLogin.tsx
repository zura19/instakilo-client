"use client";
import { User2 } from "lucide-react";
import UserProfilePicture from "../UserProfilePicture";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useUser from "@/app/_hooks/useUser";
import { SidebarUserSkeleton } from "../skeletons/sidebarUserSkeleton";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileOrLogin({
  showSmallSidebar,
}: {
  showSmallSidebar: () => boolean;
}) {
  const pathname = usePathname();
  const { isAuthenticated, user } = useUser();

  const [initialLoad, setInitialLoad] = useState(true);

  const to = isAuthenticated ? `/profile/${user?.id}` : "/login";
  const isActive = pathname === to;
  const ICONSIZE = 22;
  const ICONCLASS = "text-primary";
  const TEXTCLASS = `hidden text-sm sm:inline ${
    isActive ? "font-semibold" : "font-light"
  }`;
  const DIVCLASS = `${
    isActive ? "bg-accent text-accent-foreground" : ""
  } block hover:bg-accent hover:text-accent-foreground sm:text-sm px-1.5 py-2 rounded-md transition-colors duration-300`;

  useEffect(() => {
    if (window !== undefined) {
      setInitialLoad(false);
    }
  }, []);

  if (initialLoad && !showSmallSidebar())
    return <SidebarUserSkeleton DIVCLASS={DIVCLASS} />;
  if (initialLoad && showSmallSidebar())
    return (
      <div className={DIVCLASS + "  flex items-center gap-3 "}>
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    );

  if (isAuthenticated) {
    return (
      <Link href={to} className={DIVCLASS}>
        <span className="sm:flex sm:items-center gap-3">
          <UserProfilePicture
            image={user?.image}
            imageSize="xs"
            iconSize="xs"
          />

          {showSmallSidebar() ? null : (
            <span className={TEXTCLASS}>Profile</span>
          )}
        </span>
      </Link>
    );
  }

  if (!isAuthenticated) {
    return (
      <Link href={to} className={DIVCLASS}>
        <span className="sm:flex sm:items-center gap-3">
          <User2 className={ICONCLASS} size={ICONSIZE} />
          {showSmallSidebar() ? null : <span className={TEXTCLASS}>Login</span>}
        </span>
      </Link>
    );
  }
}
