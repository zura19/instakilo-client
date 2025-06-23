"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function FormInputComp({
  label = "",
  name = "",
  placeholder,
  type = "text",
  description = "",
  inputClassName = "",
  control,
}: {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  description?: string;
  inputClassName?: string; // Optional className for the input

  control: any; // Replace 'any' with the actual type of your form if available
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className={inputClassName}
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
