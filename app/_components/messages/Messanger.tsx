import MessangerHeader from "./MessangerHeader";
import MessangerMain from "./MessangerMain";
import SentMessage from "./SentMessage";

type props = { id: string };

export default function Messanger({ id }: props) {
  return (
    <div className="grid grid-rows-[auto_1fr] max-h-dvh pb-0">
      <MessangerHeader id={id} />
      <MessangerMain />
      <SentMessage />
    </div>
  );
}
