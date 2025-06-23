import { Smile } from "lucide-react";
import PickerReact from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type props = {
  iconClass?: string;
  iconSize?: number;
  setText: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  text: string;
  align?: "start" | "end" | "center";
};

export default function Emojy({
  iconClass,
  setText,
  inputRef,
  text,
  align = "end",
}: props) {
  const pickerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleEmojySelect(e: any) {
    const cursor = inputRef.current.selectionStart;
    const newText = text.slice(0, cursor) + e.native + text.slice(cursor);
    setText(newText);

    setTimeout(() => {
      inputRef.current.selectionStart = cursor + e.native.length;
      inputRef.current.selectionEnd = cursor + e.native.length;
      inputRef.current.focus();
    }, 0);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Smile className={iconClass} size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="h-[340px] ">
        <div ref={pickerRef}>
          <PickerReact onEmojiSelect={handleEmojySelect} data={data} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
