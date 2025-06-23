import { useAppSelector } from "@/store";

export default function useUser() {
  const { user } = useAppSelector((state) => state.user);
  const isAuthenticated = user !== null;

  return { user, isAuthenticated };
}
