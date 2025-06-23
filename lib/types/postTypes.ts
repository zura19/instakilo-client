import { userType } from "./userTypes";

export type postType = {
  id: string;
  content: string;
  authorId: string;
  tags: userType[] | [];
  images: string[];
  author: userType & {
    isVerified: boolean;
    followers: { followerId: string }[];
  };
  likedBy: { id: string }[] | [];
  savedBy: { id: string }[] | [];
  createdAt: string;
  updatedAt: string;
};

export type commentType = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  author: userType & { isVerified: boolean };
  likes: { id: string }[] | [];
  createdAt: string;
  updatedAt: string;
};
