"use client";
import { chunkArray } from "@/lib/utils";
import Story from "./Story";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import UserStorySkeleton from "../skeletons/UserStorySkeleton";
import useFollowingStories from "@/app/_hooks/useFollowingStories";

const btnClass =
  "absolute size-6 dark:bg-accent opacity-0 group-hover:opacity-100 disabled:opacity-0 hover:dark:bg-accent/70 transition-all duration-300 ";

export default function StoriesList() {
  // prettier-ignore
  const { data, isLoading,  } = useFollowingStories();

  if (isLoading) return <UserStorySkeleton />;
  if (!data?.success) return null;

  // const arr = data.pages.filter((p) => p.success).flatMap((p) => p.stories);
  console.log(data.stories);
  const chunkedStories = chunkArray(data.stories, 8);

  return (
    <Carousel
      opts={{ watchDrag: false }}
      className="relative group max-w-[610px]  py-1"
    >
      <CarouselContent className="">
        {chunkedStories.map((group, i) => (
          <CarouselItem key={i}>
            {
              <div className="flex gap-6">
                {group.map((story, i) => (
                  <Story
                    isViewed={story.isViewed}
                    image={story.image}
                    name={story.name}
                    key={story.id + i}
                    to={`/story/${story.id}`}
                  />
                ))}
              </div>
            }
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={btnClass + " left-5 group-hover:left-2"} />
      <CarouselNext className={btnClass + ` right-5 group-hover:right-2 `} />
    </Carousel>
  );
}
