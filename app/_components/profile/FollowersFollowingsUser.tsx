"use client";
import { redirect } from "next/navigation";
import UserProfilePicture from "../UserProfilePicture";

type props = {
  username: string;
  image: string;
  id: string;
};

export default function FollowersFollowingsUser({
  username,
  image,
  id,
}: props) {
  return (
    <div
      //   id="user-div"
      onClick={() => redirect(`/profile/${id}`)}
      className="flex items-center gap-2 text-primary text-sm hover:bg-accent hover:text-accent-foreground px-4 py-2  transition-all duration-300 cursor-pointer"
    >
      <UserProfilePicture imageSize="sm" iconSize="sm" image={image || ""} />
      <p>{username}</p>
      {/* <X
        ref={closeRef}
        onClick={filter}
        className=" cursor-pointer ml-auto hover:text-red-200"
        size={19}
      /> */}
    </div>
  );
}
