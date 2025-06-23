"use client";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { registerFormSlice } from "./app/_slices/registerFormSlice";
import userSlice from "@/app/_slices/userSlice";
import postSlice from "./app/_slices/postSlice";

export const store = configureStore({
  reducer: {
    registerForm: registerFormSlice.reducer,
    user: userSlice,
    post: postSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
