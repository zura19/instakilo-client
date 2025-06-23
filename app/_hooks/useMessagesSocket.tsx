import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client"; // Adjust the import path as needed
import useUser from "./useUser";
import { NotificationType } from "@/lib/types/notificationTypes";

const socketUrl = process.env.NEXT_PUBLIC_SERVER_URL!.split("/api")[0];

interface Imessage {
  id: string;
  message: string;
  senderId: string;
  isRead: boolean;
  sender: { id: string; name: string; image: string };
  updatedAt: string;
  createdAt: string;
}

function useMessagesSocket() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Imessage[]>([]);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [count, setCount] = useState(0);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(socketUrl, {
      query: { userId: user?.id },
    });

    socketRef.current.on("connect", () => {
      console.log("Socket.IO connected");
    });

    socketRef.current.on("sendMessage", (message: Imessage) => {
      console.log(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, type: message.senderId === user?.id ? "me" : "other" },
      ]);

      setCount((prevCount) => prevCount + 1);
    });

    socketRef.current.on(
      "sendNotification",
      (notification: NotificationType) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification,
        ]);
      }
    );

    socketRef.current.on("readNotifications", () => {
      setNotifications([]);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user?.id]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("sendMessage", { message });
    }
  };

  const sendNotification = (notification: NotificationType) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("sendNotification", notification);
    }
  };

  const readNotifications = () => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("readNotifications");
    }
  };

  function decreaseCount() {
    setCount((prevCount) => prevCount - 1);
  }

  return {
    msgs: messages.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    sendMessage,
    count,
    decreaseCount,
    sendNotification,
    readNotifications,
    notifications: notifications.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
  };
}

export default useMessagesSocket;
