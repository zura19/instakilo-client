"use client";
import { LucideInstagram } from "lucide-react";
import SidebarLink from "./SidebarLink";
import UserProfileOrLogin from "./UserProfileOrLogin";
import MoreDropDown from "./MoreDropDown";
import useSidebar from "@/app/_hooks/useSidebar";
import SidebarSibling from "./SidebarSibling";
import SearchUserSidebar from "../search/SearchUserSidebar";
import Notifications from "../notifications/Notifications";
import local from "next/font/local";

export const grandista = local({
  src: "../../../public/fonts/grandista.otf",
  variable: "--font-grandista",
});

const sidebarLinks = [
  { to: "/", text: "Home" },
  { to: null, text: "Search" },
  { to: "/explore", text: "Explore" },
  { to: "/messages", text: "Messages" },
  { to: null, text: "Notifications" },
  { to: null, text: "Upload" },
];

export default function Sidebar() {
  const {
    showSmallSidebar,
    toggleSearchHistory,
    isSearchHistoryActive,
    closeSearchHistory,
    toggleNotifications,
    isNotificationsActive,
    closeNotifications,
    pathname,
  } = useSidebar();

  const messagesPath = pathname.includes("messages");

  return (
    <div
      className={`grid grid-cols-[auto_1fr] h-dvh relative  bg-background ${
        messagesPath ? "sm:w-full" : "sm:w-[270px]"
      }  transition-all duration-300`}
    >
      <aside
        className={`relative top-0 z-30 sm:w-[270px] p-4 border-r border-border/80 bg-background ${
          showSmallSidebar() ? "sm:w-full" : "sm:w-[270px]"
        } transition-all duration-500`}
      >
        <h1
          className={` hidden sm:block text-xl pl-2 font-extralight  text-primary ${
            grandista.className
          } ${showSmallSidebar() ? "sm:hidden" : ""} tracking-widest   ${""}`}
        >
          Instakilo
        </h1>

        <LucideInstagram
          className={`flex items-center justify-center w-full  ${
            showSmallSidebar() ? "sm:flex flex" : "sm:hidden"
          } text-primary `}
          size={22}
        />

        <nav className="h-[calc(100vh-100px)] ">
          <ul className="mt-6 flex flex-col space-y-2 h-full">
            {sidebarLinks.map((link) => (
              <SidebarLink
                showSmallSidebar={showSmallSidebar}
                toggleSearchHistory={toggleSearchHistory}
                isSearchHistoryActive={isSearchHistoryActive}
                toggleNotifications={toggleNotifications}
                isNotificationsActive={isNotificationsActive}
                key={link.text}
                to={link.to}
                text={link.text}
              />
            ))}
            <UserProfileOrLogin showSmallSidebar={showSmallSidebar} />

            <MoreDropDown showSmallSidebar={showSmallSidebar} />
          </ul>
        </nav>
      </aside>
      <SidebarSibling
        messagesPath={messagesPath}
        renderSidebarSibling={isSearchHistoryActive || isNotificationsActive}
      >
        {isSearchHistoryActive && (
          <SearchUserSidebar close={closeSearchHistory} />
        )}
        {isNotificationsActive && <Notifications close={closeNotifications} />}
      </SidebarSibling>
    </div>
  );
}
