"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import useStory from "@/app/_hooks/useStory";
import StoryContentHeader from "./StoryContentHeader";
import StoryContentFooter from "./StoryContentFooter";
import StorySkeleton from "../skeletons/StorySkeleton";

type props = {
  index: number;
};

export default function StoryContent({ index }: props) {
  const {
    stArr,
    active,
    isPaused,
    next,
    dissableNext,
    prev,
    dissablePrev,
    togglePause,
  } = useStory();

  if (false) return <StorySkeleton index={index} />;

  const btnClass =
    "  absolute rounded-full size-7 opacity-0 group-hover:opacity-100  bg-background/60 disabled:opacity-0 hover:bg-background/40 text-primary   ";
  return (
    <div
      className={`relative group ${
        index === 2 ? "h-[90dvh]" : "h-[50dvh]"
      } rounded-lg bg-accent p-0`}
    >
      <StoryContentHeader
        active={active}
        isPaused={isPaused}
        togglePause={togglePause}
        arrLength={stArr.length}
      />

      <div className={`relative h-full w-full  `}>
        <Image
          src={stArr[active]?.image || ""}
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

      <StoryContentFooter />
    </div>
  );
}
