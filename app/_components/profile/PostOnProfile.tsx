"use client";
import Image from "next/image";
import PostModal from "../post/PostModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import PostOnProfileSkeleton from "../skeletons/PostOnProfileSkeleton";
import { GalleryVerticalEndIcon, Heart } from "lucide-react";
import { useState } from "react";
import Loader from "../Loader";

type props = {
  id: string;
  image: string[];
  likes: number;
};

export default function PostOnProfile({ image, id, likes }: props) {
  const [opening, setOpening] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const handleClick = () => {
    setOpening(true);
    const params = new URLSearchParams(searchParams);
    if (params.get("post")) {
      params.delete("post");
    } else {
      params.set("post", id);
    }
    router.push(`${pathName}?${params.toString()}`);
    setTimeout(() => {
      setOpening(false);
    }, 1000);
  };

  if (true)
    return (
      <PostModal>
        <div
          onClick={handleClick}
          className="group w-full h-[300px] relative hover:opacity-50 transition-all duration-300 cursor-pointer"
        >
          <Image src={image[0]} alt="Post" fill className="object-cover" />
          <div className="absolute w-full h-full">
            {image.length > 1 && (
              <GalleryVerticalEndIcon
                className="absolute  left-[100%] -translate-x-[140%] translate-y-[40%] "
                size={20}
              />
            )}

            <div className=" flex items-center gap-1 opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary transition-all duration-300">
              {opening && <Loader boxClassName="ml-auto" />}
              {!opening && (
                <>
                  <Heart fill="white" size={20} />
                  <span className="text-sm font-semibold">{likes}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </PostModal>
    );
}
