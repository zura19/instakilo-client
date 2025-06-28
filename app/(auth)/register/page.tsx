import { AuthFormTemplate } from "@/app/_components/auth/AuthFormTemplate";
import RegisterForm from "@/app/_components/auth/RegisterForm";
import RegisterFormPartTwo from "@/app/_components/auth/RegisterFormPartTwo";

export const metadata = {
  title: "Instakilo - Register",
  description:
    "Register to Instakilo, a simple, fast, and secure file sharing service.",
};

type props = {
  searchParams: Promise<{ p: string | undefined }>;
};

export default async function page({ searchParams }: props) {
  const params = await searchParams;

  return (
    <div className="pageContainer flex items-center h-dvh justify-center">
      <div className="w-[70%]">
        <AuthFormTemplate>
          {params.p === "2" ? <RegisterFormPartTwo /> : <RegisterForm />}
        </AuthFormTemplate>
      </div>
    </div>
  );
}
