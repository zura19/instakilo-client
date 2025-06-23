"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormInputComp from "../FormInputComp";
import { editProfileSchema, editProfileSchemaType } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormButtonComp from "../FormButtonComp";
import FormSelectComp from "../FormSelectComp";
import UserProfilePicture from "../UserProfilePicture";
import { Button } from "@/components/ui/button";
import useUpdateUser from "@/app/_hooks/useUpdateUser";
import useImagesUploader from "@/app/_hooks/useImagesUploader";

// prettier-ignore
type props = { name: string; email: string; bio: string; gender: "male" | "female"; image: string};

// prettier-ignore
export default function EditProfileFrom({ name, email, bio, gender, image, }: props) {
  const form = useForm<editProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
    // prettier-ignore
    defaultValues: { name: name || "", email: email || "", bio: bio || "", gender: gender || "male", image: image || ""},
  });

  const {handleUpdate} = useUpdateUser();
  const {images,handleImageChange} = useImagesUploader({defaultImages:[image || ""], limit: 10});

  const inpClass = " dark:bg-bacground rounded-xl h-12";

  const onSubmit = async (data: editProfileSchemaType) => {
    await handleUpdate({...data,image: images[0] || ""});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9 space-y-6">
        <div className="bg-accent rounded-lg px-4 py-3 space-y-2">
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserProfilePicture
                iconSize="2xl"
                imageSize="xl"
                image={images[0] || ""}
              />
              <p className="font-bold">{form.getValues("name")}</p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileImage"
              onChange={handleImageChange}
            />
            <Button
              type="button"
            size={"sm"}
              className="bg-blue-500 hover:bg-blue-400 transition-all duration-300 text-xs text-primary"
              asChild
            >
              <label htmlFor="profileImage" className="cursor-pointer">
              Change Photo
              </label>
            </Button>
          </div>
        </div>

        <FormInputComp
          inputClassName={inpClass}
          name="name"
          label="Name"
          placeholder="Name"
          control={form.control}
        />

        <FormInputComp
          inputClassName={inpClass}
          name="email"
          label="Email"
          placeholder="Email"
          control={form.control}
        />

        <FormInputComp
          inputClassName={inpClass}
          name="bio"
          label="Bio"
          placeholder="Bio"
          control={form.control}
        />

        <FormSelectComp
          name="gender"
          label="Gender"
          placeholder="Gender"
          selectClassName={inpClass + " w-full py-6"}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          control={form.control}
        />
        <div className="flex justify-end w-full">
          <FormButtonComp
            text="Save changes"
            type="submit"
            isLoading={form.formState.isSubmitting}
            className=" w-fit bg-blue-500 hover:bg-blue-400 text-primary transition-all duration-300"
          />
        </div>
      </form>
    </Form>
  );
}
