"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormInputComp from "../FormInputComp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/lib/zod";
import { Form } from "@/components/ui/form";
import useLogin from "@/app/_hooks/useLogin";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-balance">
              Login to your Instakilo account
            </p>
          </div>
          <FormInputComp
            label="Email"
            name="email"
            inputClassName="w-full"
            placeholder="m@example.com"
            type="text"
            control={form.control}
          />
          <div>
            <FormInputComp
              label="Password"
              name="password"
              inputClassName="w-full"
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
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
