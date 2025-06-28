"use client";
import useUser from "@/app/_hooks/useUser";
import { Bookmark, Grid, UserSquare } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type props = { userId: string };

export default function ProfileNav({ userId }: props) {
  const { user } = useUser();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const tab = searchParams.get("tab");

  const showSaved = user?.id === userId ? true : false;

  function setActiveTab(tab: "posts" | "saved" | "tagged") {
    const params = new URLSearchParams(searchParams);
    if (tab === "posts") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    if (tab === "saved" && !showSaved) {
      setActiveTab("posts");
    }
  }, [tab, showSaved]);

  return (
    <div className="border-t border-border flex items-center justify-center gap-12">
      <p
        onClick={() => setActiveTab("posts")}
        className="text-xs text-muted-foreground flex items-center gap-1 relative pt-6 cursor-pointer"
      >
        <Grid size={14} />
        <span className={`${!tab && "text-primary font-semibold"}`}>POSTS</span>
        <span
          className={`${
            !tab ? "text-white w-16" : "hidden"
          } absolute   h-[2px] bg-muted-foreground top-0 left-0 `}
        ></span>
      </p>

      {showSaved && (
        <p
          onClick={() => setActiveTab("saved")}
          className="text-xs text-muted-foreground flex items-center gap-1 relative pt-6 cursor-pointer"
        >
          <Bookmark size={14} />
          <span
            className={`${tab === "saved" && "text-primary font-semibold"}`}
          >
            SAVES
          </span>
          <span
            className={`${
              tab === "saved" ? "text-white w-16" : "hidden"
            } absolute   h-[2px] bg-muted-foreground top-0 left-0 `}
          ></span>
        </p>
      )}
      <p
        onClick={() => setActiveTab("tagged")}
        className="text-xs text-muted-foreground flex items-center gap-1 relative pt-6 cursor-pointer"
      >
        <UserSquare size={14} />
        <span className={`${tab === "tagged" && "text-primary font-semibold"}`}>
          TAGGED
        </span>
        <span
          className={`${
            tab === "tagged" ? "text-white w-18" : "hidden"
          } absolute   h-[2px] bg-muted-foreground top-0 left-0 `}
        ></span>
      </p>
    </div>
  );
}
