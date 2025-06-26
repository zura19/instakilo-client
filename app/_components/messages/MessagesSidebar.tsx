import UserComp from "../UserComp";
import ConversationList from "./ConversationList";

type props = {
  withId: string;
};

export default async function MessagesSidebar({ withId }: props) {
  const px = "px-4";
  return (
    <div className="grid grid-rows-[auto_auto_1fr] border-r border-border px-0 py-3">
      <div className={`py-10 ${px}`}>
        <UserComp size="lg" />
      </div>
      <div className={` flex items-center justify-between mb-2 ${px}`}>
        <p className="text-sm font-semibold text-primary">Messages</p>
        <p className="text-xs text-primary">Requests</p>
      </div>
      {/* <Suspense
        fallback={
          <div className="flex justify-center pt-6">
            <Loader className="text-center" />
          </div>
        } */}
      {/* > */}
      <ConversationList withId={withId} />
      {/* </Suspense> */}
    </div>
  );
}
