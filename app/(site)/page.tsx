import Link from "next/link";
import PostList from "../_components/post/PostList";
import StoriesList from "../_components/story/StoriesList";
import LoggedUserStory from "../_components/story/LoggedUserStory";

export default async function Home() {
  return (
    <div className="grid grid-cols-[10fr_4fr] gap-12 w-[1000px] mx-auto py-6 px-12">
      <div className="flex flex-col gap-2 justify-center ">
        <StoriesList />
        <PostList />
      </div>
      <div className="space-y-4">
        <LoggedUserStory />
        <div className=" h-fit">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs">Suggested for you</p>
            <Link
              href="/"
              className="text-xs text-primary font-bold hover:text-primary/60 transition-all duration-300"
            >
              See All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
