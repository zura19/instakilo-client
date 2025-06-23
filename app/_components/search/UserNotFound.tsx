import { User } from "lucide-react";

export default function UserNotFound() {
  return (
    <div className="px-4 items-center flex flex-col gap-2">
      <div className="border-2 border-primary/85 rounded-full  flex items-center justify-center size-[60px] ">
        <User className=" text-primary/85" size={35} />
      </div>
      <h1 className="text-3xl font-semibold text-primary">Start Searching</h1>

      <p className="text-xs text-primary text-center">
        When you start searching, they will appear on your profile.
      </p>
      <p>{}</p>
    </div>
  );
}
