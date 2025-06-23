import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImagePreview from "./ImagePreview";
export default function UploadCarousel({ images }: { images: string[] }) {
  console.log(images);

  const btnsClass =
    "absolute size-6 disabled:opacity-0 opacity-0 group-hover:opacity-100 transition-all duration-200 ";
  return (
    <Carousel className="group relative">
      <CarouselContent className="w-[400px] md:w-[601px]">
        {images.map((image, i) => (
          <CarouselItem key={i}>
            <ImagePreview image={image} />
          </CarouselItem>
        ))}
      </CarouselContent>

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
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
}
