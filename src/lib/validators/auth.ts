import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^a-zA-Z0-9]/, "Must include a special character"),
  profilePhoto: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
