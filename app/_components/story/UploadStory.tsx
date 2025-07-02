"use client";
import useImagesUploader from "@/app/_hooks/useImagesUploader";
import { Button } from "@/components/ui/button";
import { ImagesIcon } from "lucide-react";
import Image from "next/image";
import FormButtonComp from "../FormButtonComp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;
type res = { success: true } | { success: false; message: string };

async function upload(image: string): Promise<res> {
  const res = await fetch(`${api}/stories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function UploadStory() {
  const { images, handleImageChange, clearImages } = useImagesUploader({
    defaultImages: [],
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await upload(images[0]);

      if (!res.success) {
        // toast.error("Failed to upload story");
        toast.error(res.message);
        return;
      }
      toast.success("Story uploaded successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (images.length > 0)
    return (
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleUpload(e)}
        className="relative h-[90dvh] bg-accent p-0 rounded-lg max-w-[400px] w-full"
      >
        <div className="relative w-full h-full">
          <Image src={images[0]} fill alt="story" className="object-contain" />
        </div>
        <div className="absolute space-y-2 w-full py-4 rounded-lg px-4 top-full -translate-y-full   bg-accent/90">
          <FormButtonComp
            disabled={isLoading}
            type="submit"
            text={isLoading ? "Uploading..." : "Create Story"}
            className="w-full"
          />
          <Button
            disabled={isLoading}
            onClick={clearImages}
            variant={"destructive"}
            className="w-full"
          >
            Discard
          </Button>
        </div>
      </form>
    );

  return (
    <>
      <input
        value={images[0]}
        onChange={handleImageChange}
        type="file"
        accept="image/*"
        id="story"
        hidden
      />
      <label
        htmlFor="story"
        className="flex flex-col h-[50%] gap-2 justify-center items-center p-12 rounded-md instagram-story-color hover:opacity-80 cursor-pointer transition-all duration-300 "
      >
        <div className="bg-accent/90 p-3 rounded-full shadow-primary shadow-md ">
          <ImagesIcon size={28} className="text-primary" />
        </div>
        <p className="text-sm font-bold">Create A Photo Story</p>
      </label>
    </>
  );
}
