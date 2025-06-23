import { useAppDispatch, useAppSelector } from "@/store";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  handleClear,
  handleFirstPart,
  handleSecondPart,
  IRegisterFormState,
} from "../_slices/registerFormSlice";
import { registerSchemaPartTwoType, registerSchemaType } from "@/lib/zod";
import { toast } from "sonner";

const api = process.env.NEXT_PUBLIC_SERVER_URL;

async function checkIfEmailOrNameRegistered(
  email: string,
  name: string
): Promise<{ success: boolean }> {
  const response = await fetch(`${api}/users/checkEmailAndName`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name }),
  });
  const data = await response.json();
  return data;
}

async function register(data: IRegisterFormState) {
  const res = await fetch(`${api}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();

  return json;
}

export default function useRegister() {
  const { registerForm } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const hasPermisionToPartTwo =
    registerForm.name !== "" &&
    registerForm.email !== "" &&
    registerForm.password !== "";

  async function handleFirstPartOfRegister(data: registerSchemaType) {
    const isEmailOrNameRegistered = await checkIfEmailOrNameRegistered(
      data.email,
      data.name
    );

    if (!isEmailOrNameRegistered.success) {
      toast.error("Email or name already registered");
      return;
    }

    dispatch(handleFirstPart(data));
    const params = new URLSearchParams(searchParams);
    params.set("p", "2");
    router.push(`${pathname}?${params.toString()}`);
  }

  async function handleSecondPartOfRegister(
    data: registerSchemaPartTwoType,
    prevData: IRegisterFormState
  ) {
    const user = await register({ ...data, ...prevData });
    dispatch(
      handleSecondPart({
        ...data,
        birthDay: data.birthDay.toISOString(),
      })
    );

    if (!user.success) {
      toast.error(user.message);
      return { success: false };
    }

    toast.success("Account created successfully");
    const params = new URLSearchParams(searchParams);
    params.delete("p");
    router.replace("/login");

    return { success: true };
  }

  function handleReset() {
    dispatch(handleClear());
  }

  return {
    handleFirstPartOfRegister,
    handleSecondPartOfRegister,
    hasPermisionToPartTwo,
    handleReset,
  };
}
