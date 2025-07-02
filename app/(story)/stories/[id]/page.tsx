import StoryContent from "@/app/_components/story/StoryContent";

export default function page() {
  return (
    <div className="max-w-[1300px] mx-auto h-[90dvh]">
      <div className="grid grid-cols-[10fr_10fr_20fr_10fr_10fr] gap-8 h-full items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <StoryContent id={"index"} key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
