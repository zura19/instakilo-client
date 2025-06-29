import StoryContent from "@/app/_components/story/StoryContent";

export default function page() {
  return (
    <div className="max-w-[400px] mx-auto">
      {/* <div className={`${"h-[90dvh]"} rounded-lg bg-red-500 p-2`}> */}
      <StoryContent index={2} />
      {/* </div> */}
    </div>
  );
}
