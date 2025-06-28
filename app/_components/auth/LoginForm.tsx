"use client";
import Link from "next/link";
import FormInputComp from "../FormInputComp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/lib/zod";
import { Form } from "@/components/ui/form";
import useLogin from "@/app/_hooks/useLogin";
import FormButtonComp from "../FormButtonComp";
import { grandista } from "../sidebar/Sidebar";

export default function LoginForm() {
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleLogin } = useLogin();
  async function onSubmit(data: loginSchemaType) {
    await handleLogin(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="  ">
        <div className="flex flex-col gap-4 bg-accent/50 px-6 py-10 border border-border">
          <div className="flex flex-col items-center text-center">
            <Link href="/" className={`text-3xl  ${grandista.className}`}>
              Instakilo
            </Link>
            {/* <p className="text-muted-foreground text-balance">
              Login to your Instakilo account
            </p> */}
          </div>
          <FormInputComp
            label="Email"
            name="email"
            inputClassName="w-full rounded-none"
            placeholder="m@example.com"
            type="text"
            control={form.control}
          />
          <div>
            <FormInputComp
              label="Password"
              name="password"
              inputClassName="w-full rounded-none"
              placeholder="********"
              type="password"
              control={form.control}
            />
            <Link
              href="/"
              className=" text-xs underline-offset-2 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <FormButtonComp
            text="Login"
            type="submit"
            className="w-full bg-blue-500 rounded-none text-primary hover:bg-blue-400 "
          />
        </div>
        <div className="text-center text-sm bg-accent/50 py-5 mt-4 border border-border">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="underline text-blue-500 hover:text-blue-400 underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
