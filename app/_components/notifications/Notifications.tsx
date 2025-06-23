import { useEffect, useRef } from "react";
import NotificationList from "./NotificationList";

type props = {
  close: () => void;
};

export default function Notifications({ close }: props) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(e: any) {
      if (divRef.current?.contains(e.target)) return;

      if (divRef.current && !divRef.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <div ref={divRef} className="grid grid-rows-[auto_1fr] h-full">
      <header className="px-4 pt-3 pb-5 border-b space-y-5">
        <h1 className="text-xl font-semibold">Notifications</h1>
      </header>
      <NotificationList />
    </div>
  );
}
