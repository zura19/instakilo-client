"use client";
import { Bookmark, Camera, SquareUser } from "lucide-react";
import UploadModal from "../upload/UploadModal";
import useUser from "@/app/_hooks/useUser";

type props = {
  tab: "" | "saved" | "tagged";
  id?: string;
};

function EmptyTab({ tab, id }: props) {
  const { user } = useUser();

  const isUser = id && user?.id === id;

  if (tab === "")
    return (
      <div className="flex flex-col gap-y-2 py-6 items-center ">
        <div className="border-2 border-primary/85 rounded-full  flex items-center justify-center size-[60px] ">
          <Camera className=" text-primary/85" size={35} />
        </div>

        {user?.id === id ? (
          <>
            <h1 className="text-3xl font-semibold text-primary">
              Share Photos
            </h1>

            <p className="text-xs text-primary text-center">
              When you share photos, they will appear on your profile.
            </p>
            <div>
              <UploadModal>
                <div className="text-blue-400 text-sm hover:text-blue-500 hover:no-underline transition-all duration-300">
                  Share your first photo
                </div>
              </UploadModal>
            </div>
          </>
        ) : (
          <h1 className="text-3xl font-semibold text-primary">No Photos Yet</h1>
        )}
      </div>
    );

  if (tab === "tagged")
    return (
      <div className="flex flex-col gap-y-2 py-6 items-center ">
        <div className="border-2 border-primary/85 rounded-full  flex items-center justify-center size-[60px] ">
          <SquareUser className=" text-primary/85" size={35} />
        </div>
        {isUser ? (
          <>
            <h1 className="text-3xl font-semibold text-primary">
              Tagged Photos
            </h1>

            <p className="text-xs text-primary text-center">
              When people tag you in photos, they&apos;ll appear here.
            </p>
          </>
        ) : (
          <h1 className="text-3xl font-semibold text-primary">No Taggs Yet</h1>
        )}
      </div>
    );

  if (tab === "saved")
    return (
      <div className="flex flex-col gap-y-2 py-6 items-center ">
        <div className="border-2 border-primary/85 rounded-full  flex items-center justify-center size-[60px] ">
          <Bookmark className=" text-primary/85" size={35} />
        </div>
        <h1 className="text-3xl font-semibold text-primary">Saved Photos</h1>

        <p className="text-xs text-primary text-center">
          When you save photos, they will appear here.
        </p>
      </div>
    );
}

export default EmptyTab;
