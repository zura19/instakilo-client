import { toBase64 } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  defaultImages: string[];
  limit?: number;
};

export default function useImagesUploader({ defaultImages, limit = 5 }: Props) {
  const [images, setImages] = useState<string[]>(defaultImages || []);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      for (const file of files) {
        if (file.size > limit * 1024 * 1024) {
          toast.error(`Image size should not be more then ${limit} mb`);
          return;
        }
      }
    }
    if (!files || files.length === 0) return;

    const arr: string[] = [];
    for (const file of files) {
      const base64 = await toBase64(file);
      arr.push(base64);
    }
    setImages(arr);
  }

  function removeImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  }

  function clearImages() {
    setImages([]);
  }

  return { images, handleImageChange, removeImage, clearImages };
}
