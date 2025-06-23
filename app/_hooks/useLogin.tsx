import { userType } from "@/lib/types/userTypes";
import { loginSchemaType } from "@/lib/zod";
import { useAppDispatch } from "@/store";
import { toast } from "sonner";
import { setUser } from "../_slices/userSlice";
import { useRouter } from "next/navigation";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

type loginType = {
  success: true;
  token: string;
  user: userType;
  message: string;
};

async function login(data: loginSchemaType): Promise<loginType> {
  const res = await fetch(`${api}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const fetchedData = res.json();
  return fetchedData;
}

export default function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleLogin(data: loginSchemaType) {
    const user = await login(data);

    if (!user.success) {
      toast.error(user.message);
      return;
    }

    dispatch(setUser(user.user));
    localStorage.setItem("user", JSON.stringify(user.user));
    toast.success(user.message);
    router.push("/");
  }

  return { handleLogin };
}
