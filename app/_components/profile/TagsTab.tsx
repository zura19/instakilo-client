import PostOnProfile from "../profile/PostOnProfile";
import EmptyTab from "./EmptyTab";

type props = {
  id: string;
};

type postType = {
  id: string;
  images: string[];
  likedBy: { id: string }[] | [];
};

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

async function getPosts(id: string) {
  const res = await fetch(`${api}/posts/profile/${id}/tagged`);
  const data = await res.json();
  return data;
}

export default async function TagsTab({ id }: props) {
  const data:
    | { success: true; posts: postType[] }
    | { success: false; message: string } = await getPosts(id);

  if (!data.success) {
    return (
      <div>
        <p>{data.message}</p>
      </div>
    );
  }

  console.log(data);

  if (data.posts?.length === 0) return <EmptyTab id={id} tab="tagged" />;

  return (
    <div className="grid grid-cols-3 gap-1">
      {data.posts?.map((post) => (
        <PostOnProfile
          likes={post.likedBy.length}
          id={post.id}
          image={post.images}
          key={post.id}
        />
      ))}
    </div>
  );
}
