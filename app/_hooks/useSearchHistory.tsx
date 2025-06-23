import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const api = process.env.NEXT_PUBLIC_SERVER_URL!;

type getSearchHistoryType = Promise<
  | {
      success: true;
      searchHistory: {
        id: string;
        image: string | null;
        name: string;
        isVerificated: boolean;
      }[];
    }
  | { success: false; message: string }
>;

type addToSearchHistoryType = Promise<
  { success: true; message: string } | { success: false; message: string }
>;

type clearSearchHistoryType = Promise<
  { success: true; message: string } | { success: false; message: string }
>;

async function getSearchHistory(): getSearchHistoryType {
  const res = await fetch(`${api}/users/searchHistory`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

async function addToSearchHistory(userId: string): addToSearchHistoryType {
  const res = await fetch(`${api}/users/searchHistory/${userId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

async function clearSearchHistory(): clearSearchHistoryType {
  const res = await fetch(`${api}/users/searchHistory`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

async function handleClearOne(id: string): clearSearchHistoryType {
  const res = await fetch(`${api}/users/searchHistory/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function useSearchHistory() {
  const [loadingOne, setLoadingOne] = useState("");
  const [isClearing, setIsClearing] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["searchHistory"],
    queryFn: getSearchHistory,
  });

  async function handleSearch(
    id: string,
    closeModal: () => void
  ): Promise<boolean> {
    setLoadingOne(id);
    try {
      const data = await addToSearchHistory(id);
      console.log(data);
      if (!data.success) {
        toast.error(data.message);
        return false;
      } else {
        closeModal();
        queryClient.invalidateQueries({
          queryKey: ["searchHistory"],
          exact: true,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoadingOne("");
    }
  }

  async function handleclearSearchHistory(): Promise<void> {
    setIsClearing(true);
    try {
      const data = await clearSearchHistory();
      if (!data.success) {
        toast.error(data.message);
      }
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["searchHistory"],
        exact: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsClearing(false);
    }
  }

  async function removeOneUserFromSearchHistory(id: string): Promise<void> {
    try {
      setLoadingOne(id);
      const data = await handleClearOne(id);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["searchHistory"],
        exact: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOne("");
    }
  }

  return {
    data,
    isLoading,
    handleSearch,
    loadingOne,
    removeOneUserFromSearchHistory,
    handleclearSearchHistory,
    isClearing,
  };
}
