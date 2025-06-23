import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useUser from "./useUser";

// prettier-ignore
type deletePostResponse = Promise<{ success: true; }|{success: false, message: string}>;

const api = process.env.NEXT_PUBLIC_SERVER_URL || "";

async function deleteP(postId: string): deletePostResponse {
  const res = await fetch(`${api}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function useDeleteUpdatePost(
  postId: string,
  postAuthorId: string,
  closeModal: () => void
) {
  const { user } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const showPrivateOptions = postAuthorId === user?.id;

  function deleteParam() {
    const params = new URLSearchParams(searchParams);
    params.delete("post");
    params.delete("c");
    router.replace(`${pathname}?${params.toString()}`);
  }

  async function deletePost() {
    setIsDeleting(true);
    try {
      const res = await deleteP(postId);

      if (!res.success) {
        toast.error(res.message || "Failed to delete post");
        return;
      }
      toast.success("Post deleted successfully");
      deleteParam();
      closeModal();
    } catch (err) {
      console.error("Error deleting post:", err);
      return;
    } finally {
      setIsDeleting(false);
    }
  }

  return { deletePost, isDeleting, showPrivateOptions };
}
