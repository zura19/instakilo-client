import React from "react";
import UserProfilePicture from "../UserProfilePicture";
import useSearchUser from "@/app/_hooks/useSearchUser";
import { redirect } from "next/navigation";
import useSearchHistory from "@/app/_hooks/useSearchHistory";
import Loader from "../Loader";
import UserListSkeleton from "../skeletons/UserListSkeleton";

type userProps = {
  image: string;
  id: string;
  username: string;
  closeModal: () => void;
};

type props = {
  closeModal: () => void;
  name?: string;
};

export default function Search({ closeModal, name }: props) {
  const { data, isLoading } = useSearchUser(name || "");

  if (isLoading) return <UserListSkeleton />;
  if (!data?.success) return <div className="px-4">{data?.message}</div>;

  if (data.success)
    return (
      <div className="">
        {data.users?.map((user) => (
          <User
            key={user.id}
            id={user.id}
            username={user.name}
            image={user.image}
            closeModal={closeModal}
          />
        ))}
      </div>
    );
}

function User({ image, id, username, closeModal }: userProps) {
  const { handleSearch, loadingOne: isRedirecting } = useSearchHistory();

  const showLoader = isRedirecting === id;

  async function search() {
    const bool = await handleSearch(id, closeModal);
    if (!bool) return;
    redirect(`/profile/${id}`);
  }

  return (
    <div
      onClick={search}
      className={`flex items-center gap-2 text-primary text-sm hover:bg-accent hover:text-accent-foreground px-4 py-2  transition-all duration-300 cursor-pointer ${
        showLoader && " pointer-events-none bg-accent"
      }`}
    >
      <UserProfilePicture imageSize="sm" iconSize="sm" image={image || ""} />
      <p>{username}</p>
      {showLoader && <Loader boxClassName="ml-auto" className="scale-75" />}
    </div>
  );
}
