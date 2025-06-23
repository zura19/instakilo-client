export type NotificationType = {
  id: string;
  type: "post" | "comment" | "like" | "tag" | "follow" | "likedComment";
  receiverId: string;
  senderId: string;
  message: string;
  redirectTo?: string;
  isRead: boolean;
  receiver: { id: string; image: string; name: string };
  sender: { id: string; image: string; name: string };
  createdAt: string;
  updatedAt: string;
};
