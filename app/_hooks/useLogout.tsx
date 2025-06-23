import { useAppDispatch } from "@/store";
import { clearUser } from "../_slices/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

type logoutType = {
  success: boolean;
  message: string;
};

async function logout(): Promise<logoutType> {
  console.log(api);
  const res = await fetch(`${api}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleLogout() {
    console.log("tishetu");
    const res = await logout();

    if (!res.success) {
      toast.error(res.message);
      console.log(res.message);
      return;
    }
    console.log(res.message);
    toast.success(res.message);
    localStorage.removeItem("user");
    dispatch(clearUser());
    router.push("/login");
  }

  return { handleLogout };
}
