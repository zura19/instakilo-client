type props = {
  text: string;
};

export default function ConversationError({ text }: props) {
  if (text === "Conversation not found")
    return (
      <div className="flex items-center justify-center">
        {" "}
        <p>Start new conversation</p>
      </div>
    );

  return <p>{text}</p>;
}
