import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PostImage from "./PostImage";
import Taggs from "./Taggs";

export default function PostImageCarousel({
  imageArr,
  isModalActive = false,
  tags,
}: {
  imageArr: string[];
  isModalActive?: boolean;
  tags: { id: string; name: string }[];
}) {
  const btnsClass =
    "absolute size-6 disabled:opacity-0 opacity-0 group-hover:opacity-100 transition-all duration-200 ";

  return (
    <Carousel className="group relative">
      <CarouselContent>
        {imageArr?.map((image, i) => (
          <CarouselItem className="p-0" key={i}>
            <PostImage
              isModalActive={isModalActive}
              image={image}
              alt={`Image ${i + 1}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {tags.length > 0 && <Taggs tags={tags} />}
      {imageArr?.length <= 1 ? null : (
        <>
          <CarouselPrevious
            variant={"secondary"}
            className={
              btnsClass +
              "  right-full translate-x-[250%]  group-hover:translate-x-[240%]  "
            }
          />
          <CarouselNext
            variant={"secondary"}
            className={
              btnsClass +
              " left-full -translate-x-[170%] group-hover:-translate-x-[150%]"
            }
          />
        </>
      )}
    </Carousel>
  );
}
