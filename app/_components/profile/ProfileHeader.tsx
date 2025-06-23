import { fullUserType, serverUserType } from "@/lib/types/userTypes";
import UserProfilePicture from "../UserProfilePicture";
import ProfileHeaderProtect from "./ProfileHeaderProtect";
import { redirect } from "next/navigation";
import FollowersFollowingsModal from "./FollowersFollowingsModal";

const api = process.env.NEXT_PUBLIC_SERVER_URL;

async function getUser(
  id: string
): Promise<
  | { success: true; user: fullUserType; posts: number }
  | { success: false; message: string }
> {
  const res = await fetch(`${api}/users/${id}`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default async function ProfileHeader({
  id,
  loggedUserData,
}: {
  id: string;
  loggedUserData: serverUserType;
}) {
  const user = await getUser(id);
  if (!user.success) redirect(`/${id}`);

  const {
    image,
    bio,
    name,
    following: followingArr,
    followers: followersArr,
  } = user.user;
  const { posts } = user;

  if (user.success)
    return (
      <section className="flex items-start gap-12">
        <UserProfilePicture image={image} imageSize="4xl" iconSize="4xl" />
        <div className="space-y-4">
          <ProfileHeaderProtect
            id={id}
            followersArr={followersArr}
            loggedUserId={
              loggedUserData.success ? loggedUserData?.user.id : undefined
            }
            name={name}
          />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <p>
              <span className="text-white">{posts} </span>
              posts
            </p>
            <FollowersFollowingsModal id={id} type="followers">
              <p className="cursor-pointer">
                <span className="text-white">{followersArr.length} </span>
                followers
              </p>
            </FollowersFollowingsModal>

            <FollowersFollowingsModal id={id} type="following">
              <p className="cursor-pointer">
                <span className="text-white">{followingArr.length} </span>
                following
              </p>
            </FollowersFollowingsModal>
          </div>
          <p className="text-sm break-words">{bio || ""}</p>
        </div>
      </section>
    );
}
