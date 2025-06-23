import UpdatePasswordForm from "@/app/_components/settings/UpdatePasswordForm";

export default function page() {
  return (
    <div className=" sm:w-[300px] md:w-[500px] mx-auto py-6 space-y-8 px-4 md:px-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Update Password</h1>
        <p className="text-xs text-primary/50">
          If you change your password, you will be logged out.
        </p>
      </div>
      <UpdatePasswordForm />
    </div>
  );
}
