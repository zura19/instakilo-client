import Link from "next/link";
import UserProfilePicture from "../UserProfilePicture";

type props = {
  image?: string;
  to: string;
  name: string;
  isViewed: boolean;
};

export default function Story({ image, to, name, isViewed }: props) {
  const borderClass = !isViewed ? " instagram-story-color " : " bg-input";
  const renderName = name.length > 8 ? name.slice(0, 8) + "..." : name;

  return (
    <Link href={to} className="space-y-0.5">
      <div
        className={`flex items-center justify-center w-fit  p-[2px] rounded-full cursor-pointer ${borderClass} `}
      >
        <div className="bg-black/50 rounded-full p-[1px]">
          <UserProfilePicture image={image} imageSize="lg" iconSize="2xl" />
        </div>
      </div>
      <p className="text-[10px] text-center">{renderName}</p>
    </Link>
  );
}
