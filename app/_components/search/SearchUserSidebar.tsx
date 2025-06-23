"use client";
import { useSearchParams } from "next/navigation";
import SearchInput from "./SearchInput";
import Search from "./Search";
import SearchedUsers from "./SearchedUsers";
import { useEffect, useRef } from "react";
import { XIcon } from "lucide-react";

type props = {
  close: () => void;
};

export default function SearchUserSidebar({ close }: props) {
  const divRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const iconClass =
    "text-primary/80 hover:text-primary cursor-pointer transition-all duration-300 ";

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
    <div ref={divRef} className="h-full">
      <header className="px-4 pt-3 pb-5 border-b space-y-5 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Search</h1>
          <XIcon onClick={close} className={iconClass} />
        </div>
        <SearchInput param="name" />
      </header>
      <div>
        {name && name?.length > 3 && <Search closeModal={close} name={name} />}
        {(!name || name?.length < 4) && <SearchedUsers closeModal={close} />}
      </div>
    </div>
  );
}
