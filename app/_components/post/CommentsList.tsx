import useComments from "@/app/_hooks/useComments";
import Comment from "./Comment";
import Loader from "../Loader";
import LoginToSee from "../LoginToSee";
import FetchMoreBtn from "../FetchMoreBtn";
type props = {
  paddingClass: string;
  postId: string;
};

export default function CommentsList({ postId, paddingClass }: props) {
  // prettier-ignore
  const { data, isLoadingComments, isFetchingNextPage, fetchNextPage, hasNextPage, isLiked, handleLikeComment, loggedUserId} = useComments(postId);

  const firstPage = data?.pages[0];

  const renderComments = !isLoadingComments && firstPage?.success;
  const renderErrorMessage = !isLoadingComments && !firstPage?.success;
  // prettier-ignore
  const renderNoCommentsYet = !isLoadingComments && firstPage?.success && firstPage.comments && firstPage.comments.length === 0;

  if (renderErrorMessage)
    return (
      <div
        className={paddingClass + "   text-sm text-muted-foreground space-y-3 "}
      >
        <div className="text-center">
          {firstPage?.message === "User is not Authenticated" ? (
            <LoginToSee message="Please login to see comments" />
          ) : (
            <p>{firstPage?.message}</p>
          )}
        </div>
      </div>
    );

  if (renderNoCommentsYet)
    // prettier-ignore
    return ( <div className={paddingClass + "   text-sm text-muted-foreground space-y-3 "}>  <p className="text-center">No comments yet</p>  </div> );

  if (isLoadingComments) return <Loader className="mx-auto" />;

  if (renderComments) {
    const comments = data?.pages
      .filter((page) => page.success)
      .flatMap((page) => page.comments);

    return (
      <div
        className={paddingClass + "   text-sm text-muted-foreground space-y-3 "}
      >
        {comments?.map((comment) => (
          <Comment
            commentId={comment.id}
            isLiked={isLiked}
            handleLikeComment={handleLikeComment}
            userId={comment.author.id}
            loggedUserId={loggedUserId as string}
            likes={comment.likes}
            content={comment.content}
            username={comment.author.name}
            image={comment.author.image}
            createdAt={comment.createdAt}
            key={comment.id}
          />
        ))}
        {/* prettier-ignore */}
        <FetchMoreBtn className="mx-auto" isFetching={isFetchingNextPage} hasMore={hasNextPage} fetchNext={fetchNextPage} />
      </div>
    );
  }
}
