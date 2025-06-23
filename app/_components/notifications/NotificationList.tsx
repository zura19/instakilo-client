import useNotifications from "@/app/_hooks/useNotifications";
import Notification from "./Notification";
import FetchMoreBtn from "../FetchMoreBtn";
import Loader from "../Loader";

export default function NotificationList() {
  const {
    data,
    isFirstPage,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useNotifications();

  const notifications = data?.pages
    .filter((page) => page.success)
    .flatMap((page) => page.notifications);

  if (isLoading) return <Loader boxClassName="mx-auto py-6" />;

  if (isFirstPage)
    return (
      <div className="overflow-scroll py-2">
        {notifications?.map((notification) => (
          <Notification
            key={notification.id}
            id={notification.id}
            type={notification.type}
            createdAt={notification.createdAt}
            sender={notification.sender}
            message={notification.message}
            redirectTo={notification.redirectTo}
            isRead={notification.isRead}
          />
        ))}
        <FetchMoreBtn
          className="mx-auto"
          fetchNext={fetchNextPage}
          hasMore={hasNextPage}
          isFetching={isFetchingNextPage}
        />
      </div>
    );
}
