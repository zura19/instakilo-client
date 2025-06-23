import PostList from "./_components/post/PostList";

export default async function Home() {
  return (
    <div className="w-[1000px] mx-auto py-6 px-12">
      <div className="grid grid-cols-[25fr_10fr]">
        <PostList />
        <div className=" border rounded-sm p-4 h-fit">
          <p>Related</p>
        </div>
      </div>
    </div>
  );
}
