import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter your password",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, {
    message: "Please enter your name",
  }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(4, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url(),
  authorId: z.string(),
});

export const DonationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  comments: z.string().optional(),
});
