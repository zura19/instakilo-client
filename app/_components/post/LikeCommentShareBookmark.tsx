"use client";
// prettier-ignore
import {Bookmark,Heart,LucideMessageCircle,SendHorizontal} from "lucide-react";
import PostModal from "./PostModal";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import useLikePost from "@/app/_hooks/useLikePost";
import { useEffect, useRef, useState } from "react";
import LikeCommentShareBookmarkSkeleton from "../skeletons/LikeCommentShareBookmarkSkeleton";
import useSavePost from "@/app/_hooks/useSavePost";
import Loader from "../Loader";
import LikesModal from "./LikesModal";

// prettier-ignore
type props = { postId: string; iconSize?: number; iconClass?: string; likes: string[] | [];
   saved: string[] | []; className?: string; isActive?: boolean};

export default function LikeCommentShareBookmark({
  postId,
  iconClass = "",
  iconSize = 20,
  className = "",
  likes,
  saved,
  isActive = false,
}: props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const scrollRef = useRef<number | null>(null);

  const { hasLiked, optimisticLikes, handleOptimisticLike } =
    useLikePost(likes);
  const { handleSavePost, isSaved } = useSavePost(postId, saved);

  const [mounted, setMounted] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  function onCommentClick() {
    scrollRef.current = window.scrollY; // Save current scroll
    setIsOpening(true);
    const params = new URLSearchParams(searchParams);
    if (params.get("post")) {
      params.delete("post");
    } else {
      params.set("post", postId);
    }
    router.push(`${pathName}/?${params.toString()}`);
    setTimeout(() => {
      setIsOpening(false);
    }, 1000);
  }

  function handleLike() {
    handleOptimisticLike(postId);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const postParam = searchParams.get("post");

    // When the modal closes (param disappears), restore scroll
    if (!postParam && scrollRef.current !== null) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollRef.current!, behavior: "auto" });
        scrollRef.current = null; // Reset
      });
    }
  }, [searchParams]);

  if (!mounted) return <LikeCommentShareBookmarkSkeleton />;

  if (mounted)
    return (
      <section className={` px-1 py-2.5 ${className}`}>
        <div className="flex items-center gap-3 mb-1.5">
          <Heart
            onClick={handleLike}
            size={iconSize}
            className={
              iconClass +
              ` ${
                hasLiked
                  ? "stroke-red-500 fill-red-500"
                  : " stroke-primary fill-red-500/0 "
              }`
            }
          />
          {isActive ? (
            <LucideMessageCircle size={iconSize} className={iconClass} />
          ) : (
            <PostModal>
              {!isOpening ? (
                <LucideMessageCircle
                  onClick={onCommentClick}
                  className={iconClass}
                  size={iconSize}
                />
              ) : (
                <Loader className="scale-95" />
              )}
            </PostModal>
          )}
          <SendHorizontal size={iconSize} className={iconClass} />
          <Bookmark
            onClick={handleSavePost}
            size={iconSize}
            className={
              iconClass +
              `${
                isSaved
                  ? "stroke-white fill-white"
                  : " stroke-white fill-white/0 "
              }` +
              " ml-auto"
            }
          />
        </div>
        <LikesModal postId={postId}>
          <p className="text-xs cursor-pointer">
            {optimisticLikes?.length} likes
          </p>
        </LikesModal>
      </section>
    );
}
