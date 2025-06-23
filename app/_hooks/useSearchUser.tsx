import { fullUserType } from "@/lib/types/userTypes";
import { useQuery } from "@tanstack/react-query";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

async function searchUsers(
  username: string
): Promise<
  { success: false; message: string } | { success: true; users: fullUserType[] }
> {
  const res = await fetch(`${api}/users/many/${username}`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function useSearchUser(username: string) {
  const { data, isLoading } = useQuery({
    queryKey: [`search-${username}`],
    queryFn: () => searchUsers(username),
    enabled: !!username && username.length > 3,
  });

  return { data, isLoading };
}
