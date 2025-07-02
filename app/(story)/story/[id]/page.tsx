import StoryContent from "@/app/_components/story/StoryContent";

type props = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: props) {
  const { id } = await params;
  return (
    <div className="max-w-[400px] mx-auto">
      {/* <div className={`${"h-[90dvh]"} rounded-lg bg-red-500 p-2`}> */}
      <StoryContent id={id} index={2} />
      {/* </div> */}
    </div>
  );
}
