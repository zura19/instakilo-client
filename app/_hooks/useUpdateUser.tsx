import { userType } from "@/lib/types/userTypes";
import { editProfileSchemaType } from "@/lib/zod";
import { useAppDispatch } from "@/store";
import { setUser } from "../_slices/userSlice";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type updateType = Promise<
  { success: true; user: userType } | { success: false; message: string }
>;

const api = process.env.NEXT_PUBLIC_SERVER_URL;

async function updateUser(data: editProfileSchemaType): updateType {
  const res = await fetch(`${api}/users/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ data }),
  });

  const d = await res.json();
  return d;
}

export default function useUpdateUser() {
  const dispathch = useAppDispatch();

  async function handleUpdate(data: editProfileSchemaType) {
    const user = await updateUser(data);
    console.log(user);
    if (!user.success) {
      toast.error(user.message);
      return;
    }
    toast.success("Profile updated successfully");
    localStorage.setItem("user", JSON.stringify(user.user));
    dispathch(setUser(user.user));
    redirect("/");
  }

  return { handleUpdate };
}
