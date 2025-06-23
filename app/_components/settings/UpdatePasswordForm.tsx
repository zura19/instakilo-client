"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormInputComp from "../FormInputComp";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema, updatePasswordSchemaType } from "@/lib/zod";
import FormButtonComp from "../FormButtonComp";
import { toast } from "sonner";
import { useAppDispatch } from "@/store";
import { clearUser } from "@/app/_slices/userSlice";
import { redirect } from "next/navigation";

const api = process.env.NEXT_PUBLIC_SERVER_URL;

type updateResType = {
  success: boolean;
  message: string;
};

async function update(
  values: updatePasswordSchemaType
): Promise<updateResType> {
  const res = await fetch(`${api}/auth/updatePassword`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(values),
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default function UpdatePasswordForm() {
  const dispatch = useAppDispatch();
  const form = useForm<updatePasswordSchemaType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const inputClassName = " min-w-0 dark:bg-bacground rounded-xl h-12 ";

  const onSubmit = async (data: updatePasswordSchemaType) => {
    const res = await update(data);

    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    localStorage.removeItem("user");
    dispatch(clearUser());
    redirect("/login");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormInputComp
          label="Old Password"
          name="oldPassword"
          placeholder="*******"
          type="password"
          inputClassName={inputClassName}
          control={form.control}
        />
        <FormInputComp
          label="New Password"
          name="newPassword"
          placeholder="*******"
          type="password"
          inputClassName={inputClassName}
          control={form.control}
        />
        <FormInputComp
          label="Confirm Password"
          name="confirmPassword"
          placeholder="*******"
          type="password"
          inputClassName={inputClassName}
          control={form.control}
        />
        <FormButtonComp
          type="submit"
          text="Update Password"
          disabled={form.formState.isSubmitting}
          className={inputClassName}
        />
      </form>
    </Form>
  );
}
