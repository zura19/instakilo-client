"use client";
import { Input } from "@/components/ui/input";
import FormButtonComp from "../FormButtonComp";
import useCreatePost from "@/app/_hooks/useCreatePost";
import { ImageIcon, PlaySquareIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useImagesUploader from "@/app/_hooks/useImagesUploader";

export default function UploadImage() {
  const { post, handleImages } = useCreatePost();
  const { images, handleImageChange, clearImages, removeImage } =
    useImagesUploader({
      defaultImages: post.images,
    });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Invalid image url");
      return;
    }
    handleImages(images);
  }

  const iconSize = " size-14 text-primary rounded-full ";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
      <div className="flex items-center justify-center relative mb-0">
        <ImageIcon strokeWidth={0.8} className={`${iconSize} -rotate-5`} />
        <PlaySquareIcon
          strokeWidth={0.8}
          className={`${iconSize}  absolute translate-x-1/2 translate-y-5 rotate-5`}
        />
      </div>
      <Input
        id="fileUploader"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="peer hidden"
        placeholder=""
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
        {images.map((image, i) => (
          <div
            onClick={() => removeImage(i)}
            className="relative w-[100px] aspect-square group hover:fill-black/50 transition-all duration-500"
            key={i}
          >
            <Trash2
              onClick={() => removeImage(i)}
              className="absolute z-50 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-500 "
            />
            <Image
              src={image}
              alt="Image"
              width={40}
              height={40}
              className=" object-cover object-center group-hover:fill-black/50 w-full h-full  absolute"
            />
          </div>
        ))}
      </div>

      <div className="space-y-2 mt-auto">
        {images.length === 0 ? (
          <Button
            className="bg-blue-500 text-primary hover:bg-blue-400 transition-all duration-400"
            asChild
          >
            <label
              htmlFor="fileUploader"
              className="text-sm w-full font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Upload images
            </label>
          </Button>
        ) : (
          <Button variant={"outline"} onClick={clearImages} className="w-full">
            Clear Images
          </Button>
        )}

        <FormButtonComp
          disabled={!images.length}
          text="Next"
          className=" mt-auto "
          type="submit"
        />
      </div>
    </form>
  );
}
