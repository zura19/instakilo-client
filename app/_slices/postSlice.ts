"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  post: {
    images: string[];
  };
  page: number;
};

const initialState: initialStateType = {
  post: {
    images: [],
  },
  page: 1,
};

const postSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addImages(state: initialStateType, action: PayloadAction<string[]>) {
      state.post.images = action.payload;
      state.page += 1;
    },

    prevPage(state: initialStateType) {
      if (state.page === 1) return;
      state.page -= 1;
    },
    nextPage(state: initialStateType) {
      if (state.page === 2) return;
      state.page += 1;
    },

    clearPost(state: initialStateType) {
      state.post = {
        images: [],
      };
      state.page = 1;
    },
  },
});

export const { addImages, clearPost, prevPage, nextPage } = postSlice.actions;
export default postSlice.reducer;
