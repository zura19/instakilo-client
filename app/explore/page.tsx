import EmptyTab from "../_components/profile/EmptyTab";
import PostOnProfile from "../_components/profile/PostOnProfile";

type postType = {
  id: string;
  images: string[];
  likedBy: { id: string }[] | [];
};

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

async function getPosts() {
  const res = await fetch(`${api}/posts/randomPosts`);
  const data = await res.json();
  return data;
}

export default async function page() {
  const data:
    | { success: true; posts: postType[] }
    | { success: false; message: string } = await getPosts();

  if (!data.success) {
    return (
      <div>
        <p>{data.message}</p>
      </div>
    );
  }

  if (data.posts?.length === 0) return <EmptyTab tab="" />;

  return (
    <div className="max-w-[700px] mx-auto py-6">
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
    </div>
  );
}
