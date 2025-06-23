import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchHistoryActive, setIsSearchHistoryActive] = useState(false);
  const [isNotificationsActive, setIsNotificationsActive] = useState(false);

  function toggleSearchHistory() {
    setIsSearchHistoryActive(!isSearchHistoryActive);
  }

  function toggleNotifications() {
    setIsNotificationsActive(!isNotificationsActive);
  }

  function closeSearchHistory() {
    setIsSearchHistoryActive(false);
    const params = new URLSearchParams(searchParams);
    params.delete("name");
    router.push(`${pathname}?${params.toString()}`);
  }

  function closeNotifications() {
    setIsNotificationsActive(false);
  }

  function showSmallSidebar() {
    if (pathname.includes("messages")) return true;
    if (isSearchHistoryActive) return true;
    if (isNotificationsActive) return true;

    return false;
  }

  useEffect(() => {
    if (!isSearchHistoryActive) {
      const params = new URLSearchParams(searchParams);
      params.delete("name");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, isSearchHistoryActive, router, pathname]);

  return {
    showSmallSidebar,
    toggleSearchHistory,
    isSearchHistoryActive,
    closeSearchHistory,
    toggleNotifications,
    isNotificationsActive,
    closeNotifications,
    pathname,
  };
}
