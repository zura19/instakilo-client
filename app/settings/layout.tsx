import SettingsSidebar from "../_components/settings/SettingsSidebar";

type props = {
  children: React.ReactNode;
};

export default function layout({ children }: props) {
  return (
    <div className="grid grid-cols-[3fr_10fr]">
      <SettingsSidebar />
      {children}
    </div>
  );
}
