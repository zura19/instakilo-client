import PostList from "../_components/post/PostList";
import StoriesList from "../_components/story/StoriesList";

export default async function Home() {
  return (
    <div className="grid grid-cols-[10fr_4fr] gap-12 w-[1000px] mx-auto py-6 px-12">
      <div className="flex flex-col gap-4 justify-center ">
        <StoriesList />
        <PostList />
      </div>
      <div className=" border rounded-sm p-4 h-fit">
        <p>Related</p>
      </div>
    </div>
  );
}
