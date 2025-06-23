"use client";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type props = {
  param: string;
};

export default function SearchInput({ param }: props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState("");

  function handleClear() {
    setName("");
    const params = new URLSearchParams(searchParams);
    params.delete(param);
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    const params = new URLSearchParams(searchParams);
    if (e.target.value.length > 3) {
      params.set(param, e.target.value);
    } else {
      params.delete(param);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 dark:bg-input pr-2 rounded-sm ">
      {!isFocused && <Search className="ml-4" size={18} />}
      <Input
        value={name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleSearch}
        placeholder="Search"
        className={`w-full dark:bg-input/0 border-0  focus-visible:ring-0 rounded-sm  transition-all duration-200 ${
          !isFocused ? "px-0" : "px-4"
        }`}
      />
      {name.length > 0 && (
        <div
          onClick={handleClear}
          className="cursor-pointer ml-auto bg-input/80 p-1 rounded-full hover:bg-input/50 transition-all duration-300 disabled:pointer-events-none  "
        >
          <X className="font-bold" size={13} />
        </div>
      )}
    </div>
  );
}
