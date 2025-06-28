import MessagesInit from "@/app/_components/messages/MessagesInit";
import MessagesSidebar from "@/app/_components/messages/MessagesSidebar";
import Messanger from "@/app/_components/messages/Messanger";

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
