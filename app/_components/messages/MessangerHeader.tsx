import UserProfilePicture from "../UserProfilePicture";
import Link from "next/link";
import { cookies } from "next/headers";
import CloseConversation from "./CloseConversation";

type props = {
  id: string;
};

const api = process.env.NEXT_PUBLIC_SERVER_URL;

async function getUser(id: string): Promise<
  | {
      success: true;
      user: { name: string; image: string; id: string };
    }
  | { success: false; message: string }
> {
  const token = (await cookies()).get("jwt")?.value;
  const res = await fetch(
    `${api}/users/${id}?include=false,select={name:true,image:true,id:true}`,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}

export default async function MessangerHeader({ id }: props) {
  const data = await getUser(id);
  console.log(data);

  if (!data.success) return null;

  return (
    <header className="flex items-center gap-2 px-4 border-b border-border py-4">
      <Link href={`/profile/${data.user.id}`} className="text-primary">
        <UserProfilePicture
          imageSize="md"
          iconSize="md"
          image={data.user.image}
        />
      </Link>
      <Link href={`/profile/${id}`} className="text-sm font-semibold">
        {data.user.name}
      </Link>
      <CloseConversation classname="text-primary ml-auto cursor-pointer hover:text-primary/70 transition-all duration-300" />
    </header>
  );
}
