import { Button } from "@/components/ui/button";
import FollowButton from "../FollowButton";
import Link from "next/link";

type props = {
  name: string;
  id: string;
  followersArr: { followerId: string }[];
  loggedUserId?: string;
};

export default function ProfileHeaderProtect({
  name,
  id,
  loggedUserId,
  followersArr,
}: props) {
  return (
    <div className="flex items-center gap-3">
      <p className="text-primary">{name}</p>

      {loggedUserId !== id ? (
        <>
          <FollowButton
            mounted={false}
            followersArr={followersArr}
            userId={id}
            btnVariant="default"
          />
          <Button
            size={"sm"}
            variant={"secondary"}
            className="text-xs h-7 px-4 rounded-md"
            asChild
          >
            <Link href={`/messages?with=${id}`}>Message</Link>
          </Button>
        </>
      ) : (
        <>
          <Button size={"sm"} variant={"secondary"} className="text-xs" asChild>
            <Link href={`/settings/edit`}>Edit Profile</Link>
          </Button>
          <Button variant={"secondary"} size={"sm"} className="text-xs">
            View Archive
          </Button>
        </>
      )}
    </div>
  );
}
