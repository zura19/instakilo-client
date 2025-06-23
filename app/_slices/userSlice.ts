"use client";
import { userType } from "@/lib/types/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = { user: userType | null };

// function getUserFromLocalStorage() {
//   if (typeof window === "undefined") return null; // Prevent access on the server
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// }

const initialState: initialStateType = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: initialStateType, action: PayloadAction<userType>) {
      state.user = action.payload;
    },
    clearUser(state: initialStateType) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
