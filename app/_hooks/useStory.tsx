import { useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useUser from "./useUser";
import { storyType } from "@/lib/types/storyTypes";
import { toast } from "sonner";
import useKeyDown from "./useKeyDown";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;
const DURATION = 5000;

// prettier-ignore
type getUserStoriesRes =  { success: true; stories: storyType[]} | { success: false; message: string };
// prettier-ignore
type viewStoryRes =  { success: true; message: string} | { success: false; message: string };
// prettier-ignore
type storyViewersType = {success: true; viewers: { id: string; name: string; image: string }[] } | { success: false; message: string };

async function getUserStories(id: string): Promise<getUserStoriesRes> {
  const res = await fetch(`${api}/stories/${id}`, {
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  return data;
}

async function viewStory(storyId: string): Promise<viewStoryRes> {
  const res = await fetch(`${api}/stories/view/${storyId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

async function getViewers(storyId: string): Promise<storyViewersType> {
  const res = await fetch(`${api}/stories/view/${storyId}`, {
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export default function useStory(id: string) {
  const { user } = useUser();
  const [isPaused, setIsPaused] = useState(false);
  const [showViewers, setShowViewers] = useState(false);
  const [active, setActive] = useState(0);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: () => getUserStories(id),
  });

  const activeStoryId = data?.success ? data.stories[active].id : null;
  const { data: viewersData, isLoading: isLoadingViewers } = useQuery({
    queryKey: ["viewers", activeStoryId],
    queryFn: () => getViewers(activeStoryId!),
    enabled: showViewers && !!activeStoryId,
  });

  useKeyDown({ key: "ArrowRight", fn: next });
  useKeyDown({ key: "ArrowLeft", fn: prev });

  const dissableNext =
    data?.success &&
    (data.stories.length === 1 || active === data.stories.length - 1);
  const dissablePrev =
    data?.success && (data.stories.length === 1 || active === 0);

  const isLoggedUser = user?.id === id;

  const initialActiveStory = useMemo(() => {
    if (!data?.success) return 0;
    const index = data.stories.findIndex(
      (story) =>
        story.viewedBy.length === 0 ||
        story.viewedBy.every((v) => v.id !== user?.id)
    );
    return index !== -1 ? index : 0;
  }, [data, user?.id]);

  useEffect(() => {
    if (user?.id === id) return;
    setActive((prev) => (initialActiveStory ? initialActiveStory : prev));
  }, [data, initialActiveStory, user?.id, id]);

  useEffect(() => {
    if (
      !data?.success ||
      isLoading ||
      isPaused ||
      active >= data.stories.length
    )
      return;

    const int = setInterval(() => {
      setActive((prev) => {
        if (prev + 1 >= data.stories.length) {
          clearInterval(int);
          redirect("/");
        }
        return prev + 1;
      });
    }, DURATION);

    return () => clearInterval(int);
  }, [active, isPaused, isLoading, data]);

  useEffect(() => {
    async function view() {
      if (!data?.success || user?.id === id) return;
      const isViewed = data.stories[active].viewedBy.some(
        (v) => v.id === user?.id
      );
      if (isViewed) return;

      const d = await viewStory(data.stories[active].id);
      if (!d?.success) {
        toast.error(d.message);
        return;
      }
      toast.success(d.message);
      queryClient.invalidateQueries({
        queryKey: ["stories"],
        exact: true,
      });
    }
    view();
  }, [active, data, user?.id, id, queryClient]);

  function next() {
    if (!data?.success) return;
    setActive((prev) => (prev + 1 >= data.stories.length ? 0 : prev + 1));
    setIsPaused(false);
  }

  function prev() {
    if (!data?.success) return;
    setActive((prev) => (prev === 0 ? data.stories.length - 1 : prev - 1));
    setIsPaused(false);
  }

  function togglePause() {
    setIsPaused((prev) => !prev);
  }

  function handleShowViewers() {
    if (user?.id !== id) return;
    setIsPaused(true);
    setShowViewers(true);
  }

  function handleHideViewers() {
    setIsPaused(false);
    setShowViewers(false);
  }

  return {
    data,
    isLoading,
    isLoggedUser,
    active,
    isPaused,
    next,
    dissableNext,
    prev,
    dissablePrev,
    togglePause,
    showViewers,
    handleShowViewers,
    handleHideViewers,
    viewersData,
    isLoadingViewers,
  };
}
