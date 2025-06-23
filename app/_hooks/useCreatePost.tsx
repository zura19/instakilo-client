import { useAppDispatch, useAppSelector } from "@/store";
import { addImages, clearPost, nextPage, prevPage } from "../_slices/postSlice";
import { useState } from "react";
import { tagType } from "../_components/upload/TaggedAccordion";
import { toast } from "sonner";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

type updateResType = Promise<
  { success: true } | { success: false; message: string }
>;

async function createPost(content: string, tags: string[], images: string[]) {
  const res = await fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, tags, images }),
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

async function updatePost(
  id: string,
  content: string,
  tags: string[],
  images: string[]
): updateResType {
  const res = await fetch(`${api}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, tags, images }),
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function useCreatePost() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { page, post } = useAppSelector((state) => state.post);

  async function handleCreate(
    content: string,
    tagged: tagType[],
    images: string[],
    closeModal: () => void
  ) {
    setIsLoading(true);
    try {
      if (!content) return;
      const taggedIds = tagged.map((user) => user.id);
      const trimedContent = content.trim();

      const data = await createPost(trimedContent, taggedIds, images);
      if (!data.success) {
        toast.success(data.message);
        return;
      }

      toast.success(data.message);
      dispatch(clearPost());
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleImages(images: string[]) {
    if (images.length === 0) return;
    dispatch(addImages(images));
  }

  function handlePrevPage() {
    dispatch(prevPage());
  }

  function handleNextPage() {
    dispatch(nextPage());
  }

  async function handleUpdate(
    id: string,
    content: string,
    tagged: tagType[],
    images: string[],
    closeModal: () => void
  ) {
    setIsLoading(true);
    try {
      if (!content) return;
      const taggedIds = tagged.map((user) => user.id);
      const data = await updatePost(id, content, taggedIds, images);

      if (!data.success) return toast.error(data.message);

      toast.success("Post updated successfully");
      closeModal();
      console.log(data);
    } catch (error) {
      toast.error("Something went wrong");
      return error;
    } finally {
      setIsLoading(false);
    }
  }
  return {
    page,
    post,
    handleImages,
    handlePrevPage,
    handleNextPage,
    handleCreate,
    handleUpdate,
    isLoading,
  };
}
