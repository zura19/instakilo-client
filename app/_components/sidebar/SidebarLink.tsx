"use client";
//prettier-ignore
import { Compass,Home,PlusSquare,Search,  User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfilePicture from "../UserProfilePicture";
import UploadModal from "../upload/UploadModal";
import MessagesIcon from "../messages/MessagesIcon";
import NotificationsIcon from "../notifications/NotificationsIcon";

type props = {
  to: string | null;
  text: string;
  isSearchHistoryActive: boolean;
  isNotificationsActive: boolean;
  showSmallSidebar: () => boolean;
  toggleSearchHistory: () => void;
  toggleNotifications: () => void;
};

function SidebarLink({
  to,
  text,
  showSmallSidebar,
  isSearchHistoryActive,
  toggleSearchHistory,
  isNotificationsActive,
  toggleNotifications,
}: props) {
  const pathname = usePathname();
  const isActive = pathname === to && !isSearchHistoryActive;
  const hideText = showSmallSidebar();

  const ICONSIZE = 22;
  const ICONCLASS = "text-primary";

  const TEXTCLASS = `hidden text-sm ${hideText ? "" : "sm:inline"} ${
    isActive ? "font-semibold" : "font-light"
  }`;

  const DIVCLASS = `${
    isActive ? "bg-accent text-accent-foreground" : ""
  } block hover:bg-accent hover:text-accent-foreground sm:text-sm px-1.5 py-2 rounded-md transition-colors duration-300`;

  const strokeWidth = isActive ? 2.5 : 2;

  const user = true;

  const excludedArr = ["Login", "Profile"];

  if (!to && text === "Search")
    return (
      <p
        onClick={toggleSearchHistory}
        className={
          DIVCLASS +
          ` ${
            isSearchHistoryActive
              ? "bg-accent text-accent-foreground cursor-pointer"
              : "cursor-pointer"
          } `
        }
      >
        <span className="sm:flex sm:items-center gap-3 cursor-pointer">
          {text === "Search" && (
            <Search
              strokeWidth={strokeWidth}
              className={ICONCLASS}
              size={ICONSIZE}
            />
          )}

          <span className={TEXTCLASS}>{text}</span>
        </span>
      </p>
    );

  if (!to && text === "Notifications")
    return (
      <div
        onClick={toggleNotifications}
        className={
          DIVCLASS +
          ` ${
            isNotificationsActive
              ? "bg-accent text-accent-foreground cursor-pointer"
              : "cursor-pointer"
          } `
        }
      >
        <div className="sm:flex sm:items-center gap-3 cursor-pointer">
          {text === "Notifications" && (
            <NotificationsIcon
              strokeWidth={strokeWidth}
              ICONCLASS={ICONCLASS}
              ICONSIZE={ICONSIZE}
            />
          )}

          <span className={TEXTCLASS}>{text}</span>
        </div>
      </div>
    );

  if (!to && text === "Upload") {
    return (
      <UploadModal>
        <p className={DIVCLASS}>
          <span className="sm:flex sm:items-center gap-3 cursor-pointer">
            {text === "Upload" && (
              <PlusSquare
                strokeWidth={strokeWidth}
                className={ICONCLASS}
                size={ICONSIZE}
              />
            )}

            <span className={TEXTCLASS}>{text}</span>
          </span>
        </p>
      </UploadModal>
    );
  }

  if (to)
    return (
      <Link className={DIVCLASS} href={to}>
        <span className="sm:flex sm:items-center gap-3">
          {text === "Home" && (
            <Home
              strokeWidth={strokeWidth}
              className={ICONCLASS}
              size={ICONSIZE}
            />
          )}
          {text === "Explore" && (
            <Compass
              strokeWidth={strokeWidth}
              className={ICONCLASS}
              size={ICONSIZE}
            />
          )}
          {text === "Messages" && (
            <MessagesIcon
              strokeWidth={strokeWidth}
              ICONCLASS={ICONCLASS}
              ICONSIZE={ICONSIZE}
            />
          )}

          {user && text === "Profile" && (
            <>
              <UserProfilePicture
                image="https://media.licdn.com/dms/image/v2/D5603AQE8whqpXLay9w/profile-displayphoto-shrink_800_800/B56ZOtuOVSGkAc-/0/1733786398485?e=1754524800&v=beta&t=j65H8FSRiEyfEQgt_pXhlV4xed7SFQyedM2XyCwRKgA"
                imageSize="xs"
                iconSize="xs"
              />

              <span className={TEXTCLASS}>Profile</span>
            </>
          )}

          {!user && text === "Login" && (
            <>
              <User2
                className={ICONCLASS}
                size={ICONSIZE}
                strokeWidth={strokeWidth}
              />
              <span className={TEXTCLASS}>Login</span>
            </>
          )}

          {excludedArr.includes(text) ? null : (
            <span className={TEXTCLASS + " hidden"}>{text}</span>
          )}
        </span>
      </Link>
    );
}
export default SidebarLink;
