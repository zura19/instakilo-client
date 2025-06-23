import { User2 } from "lucide-react";
import Image from "next/image";

type sizeType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

export default function UserProfilePicture({
  image,
  imageSize = "md",
  iconSize = "md",
}: {
  image?: string;
  imageSize?: sizeType;
  iconSize?: sizeType;
}) {
  const imageSizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
    "3xl": "w-24 h-24",
    "4xl": "w-32 h-32",
  };

  const iconSizes = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 24,
    "2xl": 28,
    "3xl": 52,
    "4xl": 64,
  };

  if (!image)
    return (
      <div
        className={`${imageSizes[imageSize]} bg-foreground border border-border   rounded-full flex items-center justify-center`}
      >
        <User2
          className="text-background"
          size={iconSizes[iconSize]}
          aria-label="User Profile Picture"
        />
      </div>
    );

  if (image)
    return (
      <div
        className={`${imageSizes[imageSize]} relative border border-border rounded-full`}
      >
        <Image
          src={image}
          alt="Profile Picture"
          fill
          className="rounded-full object-cover"
        />
      </div>
    );
}
