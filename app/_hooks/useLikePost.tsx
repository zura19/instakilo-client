import { useState } from "react";
// import { useOptimistic, useState, useTransition } from "react";

import useUser from "./useUser";
import { toast } from "sonner";

const api = process.env.NEXT_PUBLIC_SERVER_URL;

export default function useLikePost(initialLikes: string[] | []) {
  const { user } = useUser();

  const [likes, setLikes] = useState(initialLikes || []);
  const hasLiked = likes?.some((like) => like === user?.id);

  // const [isPending, startTransition] = useTransition();

  // const [optimisticLikes, setOptimisticLikes] = useOptimistic(
  //   likes,
  //   (state: string[], action: { type: "like" | "unlike"; userId: string }) => {
  //     switch (action.type) {
  //       case "like":
  //         return [...state, action.userId];
  //       case "unlike":
  //         return state.filter((like) => like !== action.userId);
  //       default:
  //         return state;
  //     }
  //   }
  // );

  // const hasLikedOptimistic = optimisticLikes.includes(user?.id as string);

  async function handleOptimisticLike(postId: string) {
    if (!user) return;

    setLikes((likes) =>
      hasLiked ? likes.filter((like) => like !== user.id) : [...likes, user.id]
    );

    function handleError() {
      if (!user) return;
      toast.error("Failed to like post");
      setLikes((likes) =>
        !hasLiked
          ? likes.filter((like) => like !== user.id)
          : [...likes, user.id]
      );
    }

    try {
      const data = await likePost(postId);
      console.log(data);
      if (!data.success) {
        handleError();
      }
    } catch (error) {
      console.log(error);
      handleError();
    }
  }

  async function likePost(postId: string) {
    const res = await fetch(`${api}/posts/${postId}/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }

  return {
    hasLiked,
    handleOptimisticLike,
    optimisticLikes: likes,
  };
}
