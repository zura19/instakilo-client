type props = {
  renderSidebarSibling: boolean;
  messagesPath: boolean;
  children: React.ReactNode;
};

export default function SidebarSibling({
  renderSidebarSibling,
  messagesPath,
  children,
}: props) {
  const leftStart = messagesPath ? "left-[-300%]" : "left-[-300%]";
  const leftEnd = messagesPath ? "left-[100%]" : "left-[25%]";

  return (
    <div
      className={`absolute h-full   z-20 ${
        renderSidebarSibling
          ? `w-[340px] ${leftEnd}  opacity-100`
          : `w-[250px] px-0 ${leftStart}  border-0 opacity-0 `
      } bg-background border border-l-0  border-border transition-all duration-500`}
    >
      {renderSidebarSibling ? children : null}
    </div>
  );
}
