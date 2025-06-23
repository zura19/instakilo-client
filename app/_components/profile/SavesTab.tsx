import { cookies } from "next/headers";
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
  const token = (await cookies()).get("jwt")?.value;
  const res = await fetch(`${api}/posts/profile/${id}/saved`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

export default async function SavesTab({ id }: props) {
  const data:
    | { success: true; posts: postType[] }
    | { success: false; message: string } = await getPosts(id);

  console.log(data);
  if (!data.success) {
    return (
      <div>
        <p>{data.message}</p>
      </div>
    );
  }

  if (data.posts?.length === 0) return <EmptyTab tab="saved" />;

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
