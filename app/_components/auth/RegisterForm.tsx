"use client";
import Link from "next/link";
import FormInputComp from "../FormInputComp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerSchemaType } from "@/lib/zod";
import { Form } from "@/components/ui/form";
import useRegister from "@/app/_hooks/useRegister";
import FormButtonComp from "../FormButtonComp";
import { grandista } from "../sidebar/Sidebar";
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex flex-col gap-6  px-8 py-10 bg-accent/50">
          <Link
            href="/"
            className={`text-3xl text-center  ${grandista.className}`}
          >
            Instakilo
          </Link>
          <FormInputComp
            label="Name"
            name="name"
            inputClassName="w-full rounded-none"
            placeholder="John Doe"
            type="text"
            control={form.control}
          />

          <FormInputComp
            label="Email"
            name="email"
            inputClassName="w-full rounded-none"
            placeholder="m@example.com"
            type="text"
            control={form.control}
          />

          <FormInputComp
            label="Password"
            name="password"
            inputClassName="w-full rounded-none"
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
            className="w-full text-primary rounded-none bg-blue-500 hover:bg-blue-400 transition-all duration-300"
          />
        </div>
        <div className="text-center text-sm bg-accent/50 py-4 mt-6">
          Alredy have an account?{" "}
          <Link
            href="/login"
            className=" text-blue-500 hover:text-blue-400 transition-all duration-300 "
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
