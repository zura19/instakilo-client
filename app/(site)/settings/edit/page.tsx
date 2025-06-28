import EditProfileFrom from "@/app/_components/settings/EditProfileFrom";
import { fullUserType } from "@/lib/types/userTypes";
import { cookies } from "next/headers";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

type getType = Promise<
  { success: boolean; user: fullUserType } | { success: false; message: string }
>;

async function getUserData(): getType {
  const token = (await cookies()).get("jwt")?.value;
  const res = await fetch(`${api}/users/profile?full=true`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

export default async function page() {
  const data = await getUserData();

  console.log(data);

  if (data.success)
    return (
      <div className="max-w-[700px] px-6 py-9 w-full mx-auto ">
        <h1 className="text-lg font-bold">Edit Profile</h1>
        <EditProfileFrom
          name={data.user.name}
          email={data.user.email}
          bio={data.user.bio}
          gender={data.user.gender as "male" | "female"}
          image={data.user.image}
        />
      </div>
    );
}
