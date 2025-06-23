import { AuthFormTemplate } from "../_components/auth/AuthFormTemplate";
import LoginForm from "../_components/auth/LoginForm";

export const metadata = {
  title: "Instakilo - Login",
  description:
    "Login to Instakilo, a simple, fast, and secure file sharing service.",
};

export default function page() {
  return (
    <div className="pageContainer flex items-center h-dvh justify-center">
      <div className="w-[70%]">
        <AuthFormTemplate>
          <LoginForm />
        </AuthFormTemplate>
      </div>
    </div>
  );
}
