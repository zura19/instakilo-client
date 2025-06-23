"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// prettier-ignore
import {  FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
// prettier-ignore
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";

export default function FormSelectComp({
  options = [],
  label = "",
  name = "",
  placeholder,
  description = "",
  selectClassName = "",
  control,
}: {
  options?: { value: string; label: string }[]; // Array of options for the select
  label?: string;
  name?: string;
  placeholder?: string;
  description?: string;
  selectClassName?: string; // Optional className for the input
  control: any; // Replace 'any' with the actual type of your form if available
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className={selectClassName}>
                <SelectValue className="w-full" placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="w-full">
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
