"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader";

const api = process.env.NEXT_PUBLIC_SERVER_URL;
// prettier-ignore
type resType = { success: true; stories: { image: string; id: string; createdAt: string}[]} | { success: false; message: string };
async function getStories(): Promise<resType> {
  const res = await fetch(`${api}/stories/archive`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function ArchivedStories() {
  const { data, isLoading } = useQuery({
    queryKey: ["archived-stories"],
    queryFn: getStories,
  });

  const imageUrl =
    "https://res.cloudinary.com/demai8flb/image/upload/v1751333324/lhd5vofxebbofrxouxej.png";

  if (isLoading) return <Loader boxClassName="flex justify-center py-6" />;
  if (!data?.success) return <p>{data?.message}</p>;
  const { stories } = data;

  function renderPartDate(date: string, num: number) {
    const d = new Date(date).toDateString().split(" ");
    return d[num];
  }

  if (data.stories.length === 0)
    return (
      <p className="text-center text-primary font-semibold py-6">
        No Archived Stories
      </p>
    );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 w-full mt-6">
      {stories.map((s, index) => (
        <Link
          href={`/story/${s.id}`}
          key={index}
          className="relative bg-muted w-full h-[380px] overflow-hidden  cursor-pointer hover:scale-[104%] transition-all duration-300"
        >
          <div className="absolute top-0 z-20  text-secondary bg-white w-fit m-2 text-[10px] p-1 font-medium text-center leading-[13px]  rounded-md shadow-black/50 shadow-sm">
            <p className="font-bold">{renderPartDate(s.createdAt, 2)}</p>
            <p>{renderPartDate(s.createdAt, 1)}</p>
            <p>{renderPartDate(s.createdAt, 3)}</p>
          </div>

          <Image
            src={imageUrl}
            fill
            alt="Image"
            className="absolute object-contain w-full h-full "
          />
        </Link>
      ))}
    </div>
  );
}
