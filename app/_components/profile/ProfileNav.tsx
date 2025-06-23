"use client";
import { Bookmark, Grid, UserSquare } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProfileNav({
  renderedTabs,
}: {
  renderedTabs: string[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const tab = searchParams.get("tab");

  function setActiveTab(tab: "posts" | "saved" | "tagged") {
    const params = new URLSearchParams(searchParams);
    if (tab === "posts") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function renderTab(tab: string) {
    if (renderedTabs.includes(tab)) return true;
    return false;
  }

  return (
    <div className="border-t border-border flex items-center justify-center gap-12">
      {renderTab("posts") && (
        <p
          onClick={() => setActiveTab("posts")}
          className="text-xs text-muted-foreground flex items-center gap-1 relative pt-6 cursor-pointer"
        >
          <Grid size={14} />
          <span className={`${!tab && "text-white"}`}>POSTS</span>
          <span
            className={`${
              !tab ? "text-white w-16" : "hidden"
            } absolute   h-[2px] bg-muted-foreground top-0 left-0 `}
          ></span>
        </p>
      )}

      {renderTab("saved") && (
        <p
          onClick={() => setActiveTab("saved")}
          className="text-xs text-muted-foreground flex items-center gap-1 relative pt-6 cursor-pointer"
        >
          <Bookmark size={14} />
          <span className={`${tab === "saved" && "text-white"}`}>SAVES</span>
          <span
            className={`${
              tab === "saved" ? "text-white w-16" : "hidden"
            } absolute   h-[2px] bg-muted-foreground top-0 left-0 `}
          ></span>
        </p>
      )}

      {renderTab("tagged") && (
        <p
          onClick={() => setActiveTab("tagged")}
          className="text-xs text-muted-foreground flex items-center gap-1 relative pt-6 cursor-pointer"
        >
          <UserSquare size={14} />
          <span className={`${tab === "tagged" && "text-white"}`}>TAGGED</span>
          <span
            className={`${
              tab === "tagged" ? "text-white w-18" : "hidden"
            } absolute   h-[2px] bg-muted-foreground top-0 left-0 `}
          ></span>
        </p>
      )}
    </div>
  );
}
