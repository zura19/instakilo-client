import { AuthFormTemplate } from "@/app/_components/auth/AuthFormTemplate";
import LoginForm from "@/app/_components/auth/LoginForm";

export const metadata = {
  title: "Instakilo - Login",
  description:
    "Login to Instakilo, a simple, fast, and secure file sharing service.",
};

export default function page() {
  return (
    <div className="max-w-[900px]  mx-auto py-12 h-dvh">
      {/* <div className="w-[70%]"> */}
      <AuthFormTemplate>
        <LoginForm />
      </AuthFormTemplate>
      {/* </div> */}
    </div>
  );
}
