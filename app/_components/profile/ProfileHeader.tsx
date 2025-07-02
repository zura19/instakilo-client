import { fullUserType } from "@/lib/types/userTypes";
import UserProfilePicture from "../UserProfilePicture";
import ProfileHeaderProtect from "./ProfileHeaderProtect";
import { redirect } from "next/navigation";
import FollowersFollowingsModal from "./FollowersFollowingsModal";
import ShowMoreText from "../ShowMoreText";
import Link from "next/link";

const api = process.env.NEXT_PUBLIC_SERVER_URL;

async function getUser(id: string): Promise<
  | {
      success: true;
      user: fullUserType & { hasStory: boolean; isStoryViewed: boolean };
      posts: number;
    }
  | { success: false; message: string }
> {
  const res = await fetch(`${api}/users/${id}`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default async function ProfileHeader({ id }: { id: string }) {
  const user = await getUser(id);
  if (!user.success) redirect(`/`);

  console.log(user);

  const {
    image,
    bio,
    name,
    following: followingArr,
    followers: followersArr,
  } = user.user;
  const { posts } = user;

  const hasStory = user?.user?.hasStory;

  if (user.success)
    return (
      <section className="grid grid-cols-[auto_1fr]  gap-12">
        <Link
          href={`/story/${id}`}
          className={`${
            !hasStory ? "bg-input" : "instagram-story-color"
          }  p-[2px] rounded-full`}
        >
          <UserProfilePicture image={image} imageSize="4xl" iconSize="4xl" />
        </Link>
        <div className=" space-y-4">
          <ProfileHeaderProtect
            id={id}
            followersArr={followersArr}
            name={name}
          />

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <p>
              <span className="text-primary font-semibold">{posts} </span>
              posts
            </p>
            <FollowersFollowingsModal id={id} type="followers">
              <p className="cursor-pointer">
                <span className="font-semibold text-primary">
                  {followersArr.length}{" "}
                </span>
                followers
              </p>
            </FollowersFollowingsModal>

            <FollowersFollowingsModal id={id} type="following">
              <p className="cursor-pointer">
                <span className="text-primary font-semibold">
                  {followingArr.length}{" "}
                </span>
                following
              </p>
            </FollowersFollowingsModal>
          </div>
          {bio && (
            <p className="text-sm break-words">
              <ShowMoreText text={bio} limit={70} />
            </p>
          )}
        </div>
      </section>
    );
}
