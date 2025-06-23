"use client";
// prettier-ignore
import { Dialog, DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog";
import SearchedUsers from "./SearchedUsers";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Search from "./Search";
type props = { children: React.ReactNode };

export default function SearchDialog({ children }: props) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const name = searchParams.get("name");

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      const params = new URLSearchParams(searchParams);
      params.delete("name");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, open, router, pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full cursor-pointer transition-all duration-1000">
        {children}
      </DialogTrigger>
      <DialogContent className="px-0 grid-rows-[auto_1fr] sm:max-w-[400px] h-full max-h-[calc(100%-8rem)]">
        <DialogHeader className="px-4">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription></DialogDescription>
          <SearchInput param="name" />
        </DialogHeader>
        {name && name?.length > 3 && (
          <Search closeModal={handleClose} name={name} />
        )}
        {(!name || name?.length < 4) && (
          <SearchedUsers closeModal={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
