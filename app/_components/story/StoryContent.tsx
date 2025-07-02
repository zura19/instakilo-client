"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import useStory from "@/app/_hooks/useStory";
import StoryContentHeader from "./StoryContentHeader";
import StoryContentFooter from "./StoryContentFooter";
import StorySkeleton from "../skeletons/StorySkeleton";
import { redirect } from "next/navigation";
import StoryViewers from "./StoryViewers";

type props = {
  index: number;
  id: string;
};

export default function StoryContent({ index, id }: props) {
  // prettier-ignore
  const { data, isLoading,isLoggedUser, active, isPaused, next, dissableNext, prev, dissablePrev,
        togglePause, showViewers, handleShowViewers, handleHideViewers,viewersData,isLoadingViewers } = useStory(id);

  if (isLoading) return <StorySkeleton index={index} />;

  if (!data?.success) return redirect("/");
  if (data.stories.length === 0) return redirect("/");
  const btnClass =
    "  absolute rounded-full size-7 opacity-0 group-hover:opacity-100  bg-background/60 disabled:opacity-0 hover:bg-background/40 text-primary   ";
  if (data && data?.success)
    return (
      <div
        className={`relative group ${
          index === 2 ? "h-[90dvh]" : "h-[50dvh]"
        } rounded-lg bg-accent p-0 overflow-hidden`}
      >
        <StoryContentHeader
          isLoggedUser={isLoggedUser}
          userId={data.stories[active].authorId}
          story={data?.stories[active]}
          active={active}
          isPaused={isPaused}
          togglePause={togglePause}
          id={data.stories[active].id}
          arrLength={data?.stories.length}
        />

        <div className={`relative h-full w-full  `}>
          <Image
            src={data?.stories[active]?.image || ""}
            alt="Story Image"
            fill
            className=" object-contain object-center w-full h-full "
          />
        </div>
        <Button
          disabled={dissableNext}
          onClick={next}
          size={"icon"}
          className={`${btnClass} top-1/2 -translate-y-1/2 right-0 group-hover:right-4 transition-all duration-300  `}
        >
          <ChevronRight className="text-primary" />
        </Button>

        <Button
          disabled={dissablePrev}
          onClick={prev}
          size={"icon"}
          className={`${btnClass} top-1/2 -translate-y-1/2 left-0  group-hover:left-4 transition-all duration-300  `}
        >
          <ChevronLeft className="text-primary" />
        </Button>

        {isLoggedUser && (
          <StoryViewers
            viewersData={viewersData}
            isLoadingViewers={isLoadingViewers}
            views={data.stories.at(active)?.viewedBy.length || 0}
            showViewers={showViewers}
            handleShowViewers={handleShowViewers}
            handleHideViewers={handleHideViewers}
          />
        )}

        {!isLoggedUser && (
          <StoryContentFooter
            key={data.stories[active].id}
            storyId={data.stories[active].id}
            isLiked={data.stories[active].isLiked}
          />
        )}
      </div>
    );
}
