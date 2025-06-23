import MessagesSidebar from "../_components/messages/MessagesSidebar";
import MessagesInit from "../_components/messages/MessagesInit";
import Messanger from "../_components/messages/Messanger";

type props = {
  searchParams: Promise<{ with?: string }>;
};

export default async function page({ searchParams }: props) {
  const params = await searchParams;

  return (
    <div className="grid grid-cols-[3fr_10fr] h-dvh">
      <MessagesSidebar withId={params.with || ""} />

      {!params.with && <MessagesInit />}
      {params.with && <Messanger id={params.with || ""} />}
    </div>
  );
}
