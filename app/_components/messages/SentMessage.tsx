"use client";
import useMessages from "@/app/_hooks/useMessages";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Smile } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SentMessage() {
  const [message, setMessage] = useState("");
  const { handleSentMessage } = useMessages();

  const iconClass =
    "text-primary cursor-pointer hover:text-primary/70 transition-all duration-300";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 250) {
      toast.error("Message cannot exceed 250 characters");
      return;
    }
    setMessage(e.target.value);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message) return;
    const msg = message.replaceAll("\n", " ");
    const bool = await handleSentMessage(msg);
    if (!bool) return;
    setMessage("");
  }

  useEffect(() => {
    if (!message) return;
    if (message.length % 130 === 0) {
      setMessage(message + "\n");
    }
  }, [message]);
  return (
    <form onSubmit={handleSubmit} className="px-4 py-3">
      <div className="px-3 py-0.5 flex items-center gap-2 rounded-full border ">
        <Smile size={20} className={iconClass} />
        <Textarea
          value={message}
          rows={1}
          onChange={handleChange}
          className="flex-1 resize-none items-center dark:bg-background focus:outline-none  focus-visible:ring-0 border-none rounded-none px-0 break-words text-sm sm:max-h-[400px] h-full  placeholder:text-sm  overflow-hidden"
          placeholder="Type a message..."
        />

        <div className="ml-auto">
          {message ? (
            <Button
              type="submit"
              variant={"link"}
              className="text-blue-400 hover:text-blue-500 hover:no-underline transition-all duration-300"
            >
              Send
            </Button>
          ) : (
            <div className="flex pr-2">
              <ImageIcon className={iconClass} size={20} />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
