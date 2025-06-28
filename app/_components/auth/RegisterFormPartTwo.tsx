"use client";
import FormInputComp from "../FormInputComp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchemaPartTwo, registerSchemaPartTwoType } from "@/lib/zod";
import { Form } from "@/components/ui/form";
import { redirect } from "next/navigation";
import FormSelectComp from "../FormSelectComp";
import FormCalendarComp from "../FormCalendareComp";
import useRegister from "@/app/_hooks/useRegister";
import FormButtonComp from "../FormButtonComp";
import { useAppSelector } from "@/store";
import useImagesUploader from "@/app/_hooks/useImagesUploader";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RegisterFormPartTwo() {
  const form = useForm<registerSchemaPartTwoType>({
    resolver: zodResolver(registerSchemaPartTwo),
    defaultValues: {
      bio: "",
      birthDay: new Date(),
      gender: "male",
      image: "",
    },
  });
  const { registerForm } = useAppSelector((state) => state);
  const { images, handleImageChange, clearImages } = useImagesUploader({
    defaultImages: [],
    limit: 5,
  });
  const {
    hasPermisionToPartTwo: permision,
    handleSecondPartOfRegister,
    handleReset,
  } = useRegister();

  const onSubmit = async (data: registerSchemaPartTwoType) => {
    console.log({ ...data, image: images[0] });

    const res = await handleSecondPartOfRegister(
      { ...data, image: images[0] },
      registerForm
    );

    if (!res.success) return;
    setTimeout(() => {
      handleReset();
    }, 2000);
  };

  if (!permision) redirect("/");

  if (permision)
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-6 py-10 bg-accent/50"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Hello {registerForm.name}</h1>
              <p className="text-muted-foreground text-balance">
                Complete your profile to get started on Instakilo
              </p>
            </div>

            <FormSelectComp
              label="Gender"
              name="gender"
              placeholder="Select your gender"
              selectClassName="w-full rounded-none "
              control={form.control}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />

            <FormCalendarComp
              label="Birth date"
              name="birthDay"
              placeholder="Select your birth date"
              control={form.control}
            />

            <FormInputComp
              label="Bio"
              name="bio"
              inputClassName="w-full rounded-none"
              placeholder="Tell us about yourself"
              type="text"
              control={form.control}
            />

            {images[0] ? (
              <div className="flex items-center justify-between">
                <div className="relative h-[60px] aspect-square rounded-full">
                  <Image
                    fill
                    src={images[0]}
                    alt="Uploaded"
                    className="object-cover rounded-full"
                  />
                </div>
                <Button
                  onClick={clearImages}
                  type="button"
                  variant={"link"}
                  className="w-fit"
                >
                  Clear
                </Button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden rounded-none"
                  onChange={handleImageChange}
                  id="image"
                />
                <Button
                  type="button"
                  variant={"secondary"}
                  className="w-full bg-blue-500 hover:bg-blue-400 rounded-none"
                  asChild
                >
                  <label
                    htmlFor="image"
                    className="cursor-pointer text-sm text-primary"
                  >
                    Upload an image
                  </label>
                </Button>
              </>
            )}

            <FormButtonComp
              className="w-full rounded-none "
              isLoading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
              type="submit"
              text="Continue"
            />
          </div>
        </form>
      </Form>
    );
}
