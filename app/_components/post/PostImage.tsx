import Image from "next/image";

export default function PostImage({
  image,
  alt,
  isModalActive = false,
}: {
  image: string;
  alt?: string;
  isModalActive?: boolean;
}) {
  return (
    <div
      className={`${
        isModalActive ? "w-[100%] h-[726px]" : "w-[400px] aspect-square"
      }       relative overflow-hidden`}
    >
      <Image
        src={image}
        alt={alt + "s"}
        fill
        className="object-contain object-center w-full h-full  absolute"
      />
    </div>
  );
}
