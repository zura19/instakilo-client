import Link from "next/link";
import UserProfilePicture from "../UserProfilePicture";
import LastMessage from "./LastMessage";
import { Suspense } from "react";

type props = {
  to: string;
  id: string;
  withSearchParam: string;
  withUser: { id: string; name: string; image: string };
  hasToRead: boolean;
  lastmessage: string;
  lastmessageAt: string;
};

export default function MessageUser({
  withUser,
  to,
  hasToRead,
  withSearchParam,
  lastmessage,
  lastmessageAt,
}: props) {
  const selectedClass = withSearchParam === withUser.id && "bg-accent/40";
  return (
    <Link
      href={to}
      className={`flex items-center gap-2 px-4 py-2 hover:bg-accent/40 ${selectedClass} transition-all duration-300`}
    >
      <UserProfilePicture
        imageSize="md"
        iconSize="md"
        image={withUser.image || ""}
      />

      <Suspense fallback={null}>
        <LastMessage
          withUser={withUser}
          lastmessage={lastmessage}
          lastmessageAt={lastmessageAt}
        />
      </Suspense>
      {hasToRead && !selectedClass && (
        <div className="w-2 h-2 ml-auto bg-blue-400 rounded-full" />
      )}
    </Link>
  );
}
