import { X } from "lucide-react";
import UserProfilePicture from "../UserProfilePicture";
import { Button } from "@/components/ui/button";
import UserNotFound from "./UserNotFound";
import { useRef } from "react";
import useSearchHistory from "@/app/_hooks/useSearchHistory";
import Loader from "../Loader";
import { redirect } from "next/navigation";
import UserListSkeleton from "../skeletons/UserListSkeleton";
import LoginToSee from "../LoginToSee";

type userProps = {
  image: string;
  id: string;
  username: string;
  closeModal: () => void;
  handleSearch: (id: string, closeModal: () => void) => Promise<boolean>;
  removeOneUserFromSearchHistory: (id: string) => Promise<void>;
  loadingOne: string;
};

type props = {
  user?: { id: string; iamge: string; name: string };
  closeModal: () => void;
};

export default function SearchedUsers({ closeModal }: props) {
  // prettier-ignore
  const { data,isLoading,handleSearch,loadingOne,handleclearSearchHistory,isClearing,removeOneUserFromSearchHistory} = useSearchHistory();

  const renderNoUser = data?.success && data.searchHistory.length === 0;
  const renderClearBtn =
    data?.success && data.searchHistory.length > 0 && !isClearing;
  const renderClearLoader = data?.success && isClearing;

  return (
    <div className="flex flex-col gap-0">
      {isLoading && <UserListSkeleton />}
      {!data?.success && (
        <div className="px-4 text-center">
          {data?.message === "User is not Authenticated" ? (
            <LoginToSee message={"Please login to search users"} />
          ) : (
            <p>{data?.message}</p>
          )}
        </div>
      )}
      {renderNoUser && <UserNotFound />}
      {renderClearLoader && <Loader boxClassName="ml-auto px-4" />}
      {renderClearBtn && (
        <Button
          onClick={handleclearSearchHistory}
          variant={"link"}
          className="w-fit h-4 text-blue-400 hover:text-blue-500 hover:no-underline ml-auto mb-2"
        >
          Clear
        </Button>
      )}
      {data?.success &&
        data.searchHistory.map((user) => (
          <User
            key={user.id}
            id={user.id}
            image={user.image || ""}
            username={user.name}
            handleSearch={handleSearch}
            removeOneUserFromSearchHistory={removeOneUserFromSearchHistory}
            closeModal={closeModal}
            loadingOne={loadingOne}
          />
        ))}
    </div>
  );
}

function User({
  image,
  id,
  username,
  handleSearch,
  loadingOne,
  closeModal,
  removeOneUserFromSearchHistory,
}: userProps) {
  const closeRef = useRef(null);
  const closeDivRef = useRef(null);

  const showLoader = loadingOne === id;

  async function search(e: React.MouseEvent) {
    console.log(e.target);
    console.log(
      closeRef.current === e.target || closeDivRef.current === e.target
    );
    if (closeRef.current === e.target) {
      removeOneUserFromSearchHistory(id);
      return;
    }
    const bool = await handleSearch(id, closeModal);
    if (!bool) return;
    redirect(`/profile/${id}`);
  }

  return (
    <div
      onClick={(e) => search(e)}
      className={`flex items-center gap-2 text-primary text-sm hover:bg-accent hover:text-accent-foreground px-4 py-2  transition-all duration-300 cursor-pointer ${
        showLoader ? "pointer-events-none bg-accent" : ""
      }`}
    >
      <UserProfilePicture imageSize="sm" iconSize="sm" image={image || ""} />
      <p>{username}</p>
      {showLoader ? (
        <Loader boxClassName="ml-auto" className="scale-75" />
      ) : (
        <div
          id={"close-div"}
          ref={closeDivRef}
          className=" cursor-pointer ml-auto text-primary  p-0.5 hover:text-secondary hover:bg-primary rounded-full transition-all duration-300"
        >
          <X id="close" ref={closeRef} size={19} />
        </div>
      )}
    </div>
  );
}
