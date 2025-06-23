import { showMoreText } from "@/lib/utils";
import { User2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type props = {
  tags: { id: string; name: string }[];
};

export default function Taggs({ tags }: props) {
  const [showTaggs, setShowTaggs] = useState(false);
  const positions: { [key: number]: string } = {
    0: "top-1/2 -translate-y-1/2 left-[10%]",
    1: "top-1/2 -translate-y-1/2 left-[40%]",
    2: "top-1/2 -translate-y-1/2 left-[70%]",
    3: "top-[60%] -translate-y-1/2 left-[20%]",
    4: "top-[60%] -translate-y-1/2 left-[55%]",
  };

  function likeClass(i: number) {
    const likeClass = `absolute ${positions[i]}  px-3 py-1 rounded-xs text-sm  bg-black/90 after:size-2 after:absolute after:top-full after:rotate-45   after:-translate-y-1  after:left-1/2 after:-translate-x-1/2 after:bg-black/90  `;
    return likeClass;
  }

  return (
    <>
      <div
        onClick={() => setShowTaggs(!showTaggs)}
        className="absolute top-[99%] -translate-y-full translate-x-2 bg-accent p-1 rounded-full cursor-pointer hover:bg-accent/80 transition-all duration-200"
      >
        <User2 size={15} />
      </div>

      {showTaggs &&
        tags.map((tag, i) => (
          <Link key={i} href={`/profile/${tag.id}`} className={likeClass(i)}>
            {showMoreText(tag.name, false, 6)}
          </Link>
        ))}
    </>
  );
}
