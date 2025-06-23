import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
export type loginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});
export type registerSchemaType = z.infer<typeof registerSchema>;

export const registerSchemaPartTwo = z.object({
  bio: z.string().min(1, "Bio is required"),
  birthDay: z.date({ required_error: "Birth date is required" }),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  image: z.string(),
});
export type registerSchemaPartTwoType = z.infer<typeof registerSchemaPartTwo>;

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  bio: z.string().min(1, "Bio is required"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  image: z.string(),
});
export type editProfileSchemaType = z.infer<typeof editProfileSchema>;

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
