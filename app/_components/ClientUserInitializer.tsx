// app/_components/ClientUserInitializer.tsx
"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store";
import { setUser } from "../_slices/userSlice"; // adjust path as needed
import { userType } from "@/lib/types/userTypes";

export default function ClientUserInitializer() {
  const dispatch = useAppDispatch();
  const hasInitialized = useRef(false); // <-- key part

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      try {
        const user: userType = JSON.parse(userFromStorage);
        dispatch(setUser(user));
      } catch (error) {
        console.error("Failed to parse user:", error);
      }
    }
  }, [dispatch]);

  return null; // Nothing rendered
}
