import { Settings } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="border-2  border-primary rounded-full w-fit p-2">
        <Settings size={40} className="text-primary/90" />
      </div>
      <h1 className="text-xl font-semibold">Settings</h1>
      <p className="text-sm text-primary/50">Manage your account settings.</p>
    </div>
  );
}
