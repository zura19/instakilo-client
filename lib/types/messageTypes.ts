export type messageSenderType = {
  id: string;
  name: string;
  image: string;
};

export type messageType = {
  id: string;
  conversationId: string;
  message: string;
  isRead: boolean;
  senderId: string;
  sender: messageSenderType;
  createdAt: string;
  updatedAt: string;
};

export type conversationType = {
  id: string;
  messages: messageType[];
};
