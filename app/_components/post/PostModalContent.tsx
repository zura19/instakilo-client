import PostImageCarousel from "./PostImageCarousel";
import PostHeader from "./PostHeader";
import LikeCommentShareBookmark from "./LikeCommentShareBookmark";
import PostContent from "./PostContent";
import AddComment from "./AddComment";
import { postType } from "@/lib/types/postTypes";
import CommentsList from "./CommentsList";

type props = {
  isActive: boolean;
  post: postType;
};

export default function PostModalContent({ isActive = false, post }: props) {
  const paddingClass = "px-3 py-2.5";
  const iconClass =
    "hover:opacity-80 cursor-pointer transition-all duration-300 ";
  const iconSize = 22;

  const likesArr = post?.likedBy.map((like) => like.id);
  const savedArr = post?.savedBy.map((save) => save.id);

  return (
    <div className="grid grid-cols-[5fr_4fr]">
      <div className="w-[100%]">
        <PostImageCarousel
          tags={post?.tags}
          isModalActive={isActive}
          imageArr={post?.images}
        />
      </div>
      <div className="grid grid-rows-[auto_1fr_auto_auto] w-full border-border pb-0">
        <div className="border-b border-border">
          <PostHeader
            post={{
              images: post?.images,
              tags: post?.tags,
              content: post?.content,
            }}
            postId={post?.id}
            followersArr={post?.author?.followers}
            userId={post?.author?.id}
            username={post?.author?.name}
            image={post?.author?.image}
            createdAt={post?.createdAt}
            className={paddingClass}
          />
        </div>
        <div className="h-[562px]  border-b border-border overflow-scroll">
          <PostContent content={post?.content || ""} className={paddingClass} />
          <CommentsList postId={post.id} paddingClass={paddingClass} />
        </div>
        <LikeCommentShareBookmark
          postId={post?.id || ""}
          saved={savedArr}
          isActive={isActive}
          iconClass={iconClass}
          iconSize={iconSize}
          className={paddingClass}
          likes={likesArr}
        />
        <div className="border-t border-border">
          <AddComment
            postId={post?.id}
            iconClass={iconClass}
            iconSize={iconSize}
            className={paddingClass}
          />
        </div>
      </div>
    </div>
  );
}
