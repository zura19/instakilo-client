import { useQuery } from "@tanstack/react-query";
import FollowersFollowingsUser from "./FollowersFollowingsUser";
import Loader from "../Loader";
import { useSearchParams } from "next/navigation";

type props = {
  type: "followers" | "following";
  id: string;
};

const api = process.env.NEXT_PUBLIC_SERVER_URL;

type followersType = {
  success: true;
  users: {
    id: string;
    name: string;
    image: string;
    isVerified: boolean;
  }[];
};

type followingType = {
  success: true;
  users: {
    id: string;
    name: string;
    image: string;
    isVerified: boolean;
  }[];
};

type error = { success: false; message: string };

async function getUsers(
  id: string,
  type: string,
  name?: string
): Promise<followersType | followingType | error> {
  const res = await fetch(`${api}/users/${id}/${type}?name=${name}`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function FollowersFollowings({ type, id }: props) {
  const searchParams = useSearchParams();
  const following = searchParams.get("following");
  const follower = searchParams.get("follower");

  const name = follower || following;

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: [type, id, name],
    queryFn: () => getUsers(id, type, name || undefined),
    enabled: !!id,
  });

  if (isLoading || isRefetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!data?.success) return <div>{data?.message}</div>;

  if (type === "following") {
    const { users: following } = data;

    return (
      <div className="overflow-scroll">
        {following.length === 0 && <div>No Followings</div>}
        {following.map((f) => (
          <FollowersFollowingsUser
            key={f.id}
            id={f.id}
            image={f.image}
            username={f.name}
          />
        ))}
      </div>
    );
  }
  if (type === "followers") {
    const { users: followers } = data;

    console.log(followers);
    return (
      <div className="overflow-scroll">
        {followers.length === 0 && <div>No followers</div>}
        {followers.map((f) => (
          <FollowersFollowingsUser
            key={f.id}
            id={f.id}
            image={f.image}
            username={f.name}
          />
        ))}
      </div>
    );
  }
}
