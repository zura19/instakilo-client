import { toast } from "sonner";
import useUser from "./useUser";
import { useState } from "react";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;
async function savePost(
  userId: string,
  postId: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${api}/posts/profile/${userId}/saved/${postId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  console.log(data);
  return data;
}

export default function useSavePost(postId: string, initialSaved: string[]) {
  const { user } = useUser();
  const [saved, setSaved] = useState(initialSaved);

  const isSaved = saved?.some((id) => id === user?.id);

  async function handleSavePost() {
    if (!user) {
      toast.error("Please login to save post");
      return;
    }

    setSaved((saved) =>
      isSaved
        ? saved.filter((id) => id !== user?.id)
        : [...saved, user?.id as string]
    );
    const data = await savePost(user?.id as string, postId);

    if (!data.success) {
      setSaved((saved) =>
        !isSaved
          ? saved.filter((id) => id !== user?.id)
          : [...saved, user?.id as string]
      );
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
  }

  return { handleSavePost, isSaved, optSaved: saved };
}
