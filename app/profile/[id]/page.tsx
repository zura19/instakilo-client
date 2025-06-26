import PostsTab from "@/app/_components/profile/PostsTab";
import ProfileHeader from "@/app/_components/profile/ProfileHeader";
import ProfileNav from "@/app/_components/profile/ProfileNav";
import SavesTab from "@/app/_components/profile/SavesTab";
import TagsTab from "@/app/_components/profile/TagsTab";
import PostOnProfileSkeleton from "@/app/_components/skeletons/PostOnProfileSkeleton";
import ProfileHeaderSkeleton from "@/app/_components/skeletons/ProfileHeaderSkeleton";
import { Suspense } from "react";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: "saved" | "tagged" }>;
}

export default async function page({ params, searchParams }: Props) {
  const { id } = await params;
  const { tab } = await searchParams;

  return (
    <div className="max-w-[800px] mx-auto py-6  space-y-5 ">
      <Suspense fallback={<ProfileHeaderSkeleton isTooltip={false} />}>
        <ProfileHeader id={id} />
      </Suspense>
      <ProfileNav userId={id} />
      {!tab && (
        <Suspense key={tab} fallback={<PostOnProfileSkeleton count={6} />}>
          <PostsTab id={id} />
        </Suspense>
      )}
      {tab === "saved" && (
        <Suspense key={tab} fallback={<PostOnProfileSkeleton count={6} />}>
          <SavesTab id={id} />
        </Suspense>
      )}
      {tab === "tagged" && (
        <Suspense key={tab} fallback={<PostOnProfileSkeleton count={6} />}>
          <TagsTab id={id} />
        </Suspense>
      )}
    </div>
  );
}
