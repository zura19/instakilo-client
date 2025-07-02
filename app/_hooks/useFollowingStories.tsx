import { useQuery } from "@tanstack/react-query";
const api = process.env.NEXT_PUBLIC_SERVER_URL!;

type resType =
  | {
      success: true;
      stories: { name: string; id: string; image: string; isViewed: boolean }[];
    }
  | {
      success: false;
      message: string;
    };

async function getStories(): Promise<resType> {
  const res = await fetch(`${api}/stories`, {
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export default function useFollowingStories() {
  const { data, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: () => getStories(),
  });

  return { data, isLoading };
}
