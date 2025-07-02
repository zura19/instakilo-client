import { X } from "lucide-react";
import UserProfilePicture from "../UserProfilePicture";
import Link from "next/link";
import Loader from "../Loader";
import UserTooltip from "../UserTooltip";

type res =
  | {
      success: true;
      viewers: { id: string; name: string; image: string }[];
    }
  | { success: false; message: string };

//   prettier-ignore
type props = { viewersData: res | undefined; isLoadingViewers: boolean; views: number; showViewers: boolean;
  handleShowViewers: () => void; handleHideViewers: () => void };

//   prettier-ignore
export default function StoryViewers({ viewersData, isLoadingViewers, views, showViewers, handleHideViewers, handleShowViewers }: props) {

    console.log(viewersData);

  return (
    <>
      <div
        onClick={handleShowViewers}
        className="absolute text-xs font-semibold bottom-6 left-6 bg-muted/90 shadow-black shadow-sm px-4 py-2 rounded-full cursor-pointer  text-primary hover:bg-muted/80 transition-all duration-200"
      >
        {views} Views
      </div>

      <div
        onClick={handleHideViewers}
        className={` absolute ${
          showViewers ? "opacity-100" : "opacity-0 inset-full"
        } bg-black/40 cursor-pointer inset-0 transition-opacity duration-300`}
      />

      <div
        className={`absolute bottom-0 grid grid-rows-[auto_1fr] ${
          showViewers
            ? "opacity-100 h-[400px] bottom-0"
            : "-bottom-24 opacity-0 h-0"
        }  bg-muted w-full transition-all duration-400 `}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <p className="text-sm font-semibold text-primary">
            Viewers ({views})
          </p>

          <X
            onClick={handleHideViewers}
            strokeWidth={2.5}
            className="text-primary  hover:text-primary/70 transition-all duration-300 cursor-pointer"
            size={20}
          />
        </div>
        {isLoadingViewers && <Loader boxClassName="mx-auto py-6" />}
        {!isLoadingViewers && !viewersData?.success && (
          <p>{viewersData?.message}</p>
        )}
        {!isLoadingViewers && viewersData?.success && (
          <div className="overflow-y-scroll">
            {viewersData.viewers.map((user, index) => (
              <Link
                  key={index}
                  href={`/profile/${user.id}`}
                  className="flex items-center w-full gap-1 text-sm  px-4 py-2 hover:bg-input/50 transition-all duration-300"
                >
                  <UserProfilePicture
                    imageSize="sm"
                    image={user.image}
                    iconSize="sm"
                  />
              <UserTooltip  id={user.id}>
                  <p className=" hover:text-primary/50 transition-all duration-300">{user.name}</p>
              </UserTooltip>
                </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
