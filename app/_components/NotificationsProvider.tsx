import { useEffect } from "react";
import { toast } from "sonner";
import Notification from "./notifications/Notification";
import useMessagesSocket from "../_hooks/useMessagesSocket";

export default function NotificationsProvider() {
  const { notifications } = useMessagesSocket();

  useEffect(() => {
    if (!notifications || notifications.length === 0) return;
    toast(
      <div className="w-[300px]">
        <Notification
          redirectTo={notifications[0].redirectTo}
          isRead={notifications[0].isRead}
          id={notifications[0].id}
          message={notifications[0].message}
          createdAt={notifications[0].createdAt}
          type={notifications[0].type}
          sender={notifications[0].sender}
        />
      </div>,
      {
        position: "bottom-left",
        closeButton: true,
        style: { borderRadius: "4px", padding: "9px", width: "320px" },
      }
    );
  }, [notifications]);

  return null;
}
