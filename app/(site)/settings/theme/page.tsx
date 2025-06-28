import Theme from "@/app/_components/settings/Theme";

export default function page() {
  return (
    <div className="max-w-[700px] w-full mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-semibold ">Theme</h1>
      <Theme />
    </div>
  );
}
