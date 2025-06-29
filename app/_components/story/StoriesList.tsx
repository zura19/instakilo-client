import { chunkArray } from "@/lib/utils";
import Story from "./Story";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const arr = Array.from({ length: 20 });

const btnClass =
  "absolute size-6 dark:bg-accent opacity-0 group-hover:opacity-100 disabled:opacity-0 hover:dark:bg-accent/70 transition-all duration-300 ";

const chunkedStories = chunkArray(arr, 8);
export default function StoriesList() {
  return (
    <Carousel className="relative group max-w-[610px]  py-1">
      <CarouselContent className="">
        {chunkedStories.map((group, i) => (
          <CarouselItem key={i}>
            <div className="flex gap-6">
              {group.map((_, j) => (
                <Story name="JohnDoe1232wel" key={j} to="/story/1" />
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={btnClass + " left-5 group-hover:left-2"} />
      <CarouselNext className={btnClass + ` right-5 group-hover:right-2 `} />
    </Carousel>
  );
}
