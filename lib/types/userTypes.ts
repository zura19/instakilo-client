export type userType = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  isVerficated?: boolean;
};

export type serverUserType =
  | { success: true; user: userType }
  | { success: false; message: string };

export type fullUserType = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  bio: string;
  birthDay: string;
  gender: string;
  followers: { followerId: string }[];
  following: { followingId: string }[];
};
