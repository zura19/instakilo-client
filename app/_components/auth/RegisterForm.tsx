"use client";
import Link from "next/link";
import FormInputComp from "../FormInputComp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerSchemaType } from "@/lib/zod";
import { Form } from "@/components/ui/form";
import useRegister from "@/app/_hooks/useRegister";
import FormButtonComp from "../FormButtonComp";
// import { usePathname, useSearchParams, useRouter } from "next/navigation";
// import { handleFirstPart } from "@/app/_slices/registerFormSlice";

export default function RegisterForm() {
  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { handleFirstPartOfRegister } = useRegister();

  const onSubmit = async (data: registerSchemaType) => {
    console.log(data);
    await handleFirstPartOfRegister(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Hello</h1>
            <p className="text-muted-foreground text-balance">
              Sign up to Instakilo
            </p>
          </div>
          <FormInputComp
            label="Name"
            name="name"
            inputClassName="w-full"
            placeholder="John Doe"
            type="text"
            control={form.control}
          />

          <FormInputComp
            label="Email"
            name="email"
            inputClassName="w-full"
            placeholder="m@example.com"
            type="text"
            control={form.control}
          />

          <FormInputComp
            label="Password"
            name="password"
            inputClassName="w-full"
            placeholder="********"
            type="password"
            control={form.control}
          />

          <FormButtonComp
            isLoading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
            type="submit"
            variant="default"
            size="default"
            text="Continue"
          />

          <div className="text-center text-sm">
            Alredy have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
