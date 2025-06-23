import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import AddComment from "./AddComment";
import PostImageCarousel from "./PostImageCarousel";
import LikeCommentShareBookmark from "./LikeCommentShareBookmark";
import { postType } from "@/lib/types/postTypes";

export default function Post({ post }: { post: postType }) {
  const iconClass =
    "hover:opacity-80 cursor-pointer transition-all duration-300 ";
  const iconSize = 22;

  const likesArr = post?.likedBy.map((like) => like.id);
  const savedArr = post?.savedBy?.map((save) => save.id);

  return (
    <div className="w-[400px] border-b pb-2 border-border ">
      <PostHeader
        postId={post.id}
        followersArr={post.author.followers}
        userId={post.author.id}
        username={post.author.name}
        image={post.author.image}
        post={{ images: post.images, tags: post.tags, content: post.content }}
        createdAt={post?.createdAt}
      />
      <PostImageCarousel tags={post.tags} imageArr={post.images} />
      <LikeCommentShareBookmark
        postId={post.id}
        likes={likesArr}
        saved={savedArr}
        iconClass={iconClass}
        iconSize={iconSize}
      />
      <PostContent content={post.content} />
      <AddComment postId={post?.id} iconClass={iconClass} iconSize={iconSize} />
    </div>
  );
}
