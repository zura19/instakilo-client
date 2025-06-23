import { MessageCircle } from "lucide-react";

export default function MessagesInit() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col gap-y-2  items-center">
        <div className="border-2 border-primary/85 rounded-full  flex items-center justify-center size-[60px] ">
          <MessageCircle className="text-primary/85" size={35} />
        </div>
        <h1 className="text-3xl font-semibold text-primary">Send Messages</h1>

        <p className="text-xs text-primary text-center">
          When you send messages, they will appear on your profile.
        </p>
      </div>
    </div>
  );
}
