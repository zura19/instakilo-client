import ArchivedStories from "@/app/_components/story/ArchivedStories";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="max-w-[1000px] mx-auto py-6 px-4">
      <Link href="/" className="flex items-center gap-1">
        <ArrowLeft size={20} /> Archive
      </Link>
      <p className="text-muted-foreground text-[10px]">
        Only you can see your archived stories unless you choose to share them.
      </p>
      <ArchivedStories />
    </div>
  );
}
