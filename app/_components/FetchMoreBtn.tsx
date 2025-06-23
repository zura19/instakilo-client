import { PlusCircleIcon } from "lucide-react";
import Loader from "./Loader";

type props = {
  isFetching: boolean;
  fetchNext: () => void;
  hasMore: boolean;
  message?: string;
  messageClassName?: string;
  iconSize?: number;
  iconClassName?: string;
  className?: string;
};
export default function FetchMoreBtn({
  hasMore,
  isFetching,
  fetchNext,
  message,
  messageClassName,
  className,
  iconSize = 24,
  iconClassName,
}: props) {
  const btnClass =
    "flex items-center justify-center text-primary cursor-pointer hover:text-primary/70 transition-all duration-300";
  if (isFetching)
    return <Loader boxClassName="flex items-center justify-center" />;

  if (!isFetching && hasMore)
    return (
      <button
        type="button"
        onClick={fetchNext}
        className={btnClass + " " + className}
      >
        <PlusCircleIcon size={iconSize} className={iconClassName} />
      </button>
    );

  if (!isFetching && !hasMore)
    return (
      <p className={`text-sm text-primary text-center ${messageClassName}`}>
        {message}
      </p>
    );
}
