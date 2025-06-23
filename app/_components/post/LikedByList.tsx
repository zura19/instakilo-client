import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import UserProfilePicture from "../UserProfilePicture";
import Link from "next/link";

type props = {
  postId?: string;
  commentId?: string;
};

const api = process.env.NEXT_PUBLIC_SERVER_URL;

type getLikesResponse =
  | {
      success: true;
      likes: { id: string; name: string; image: string }[];
    }
  | { success: false; message: string };
// prettier-ignore
async function getLikes( query: string,limit: number,page?: number): Promise<getLikesResponse> {
  const res = await fetch(
    `${api}/posts/getLikes?page=${page}&limit=${limit}&${query}`,
    { credentials: "include" }
  );
  const data = await res.json();
  console.log(data);
  return data;
}

export default function LikedByList({ postId, commentId }: props) {
  const { data, isLoading } = useQuery({
    queryKey: [`likes`, postId, commentId],
    queryFn: () =>
      getLikes(postId ? `postId=${postId}` : `commentId=${commentId}`, 0, 10),
  });

  if (isLoading) return <Loader boxClassName="mx-auto py-6" />;

  if (data?.success)
    return (
      <div className="flex flex-col gap-1  overflow-scroll">
        {data?.likes?.map((like) => (
          <Link
            href={`/profile/${like.id}`}
            className="flex items-center px-2 py-1 gap-2 rounded-sm hover:bg-accent transition-all duration-300"
            key={like.id}
          >
            <UserProfilePicture
              image={like.image}
              imageSize="sm"
              iconSize="sm"
            />
            <p className="text-sm font-semibold">{like.name}</p>
          </Link>
        ))}
      </div>
    );
}
