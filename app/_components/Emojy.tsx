import { Smile } from "lucide-react";
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

  const emojys = [
    "😂",
    "❤️",
    "😀",
    "😁",
    "😃",
    "😄",
    "😅",
    "😆",
    "😉",
    "😊",
    "🙂",
    "🙃",
    "😋",
    "😎",
    "😍",
    "😘",
    "😗",
    "😙",
    "😚",
    "😇",
    "😈",
    "👹",
    "👺",
    "👻",
    "👼",
    "👽",
    "👾",
    "👿",
    "💀",
    "👻",
  ];

  function handleEmojySelect(emojy: string) {
    const cursor = inputRef.current.selectionStart;
    const newText = text.slice(0, cursor) + emojy + text.slice(cursor);
    inputRef.current.focus();

    setText(newText);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Smile
          onClick={() => pickerRef.current?.focus()}
          className={iconClass}
          size={18}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="h-[340px] ">
        <div className="grid grid-cols-6 gap-2" ref={pickerRef}>
          {emojys.map((emoji, i) => (
            <span
              key={i}
              className="cursor-pointer p-1 rounded-full hover:bg-primary/10 transition-all duration-300"
              onClick={() => handleEmojySelect(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
