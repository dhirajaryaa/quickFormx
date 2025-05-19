import z from 'zod';
import {passwordSchema} from "./register.js"

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
      password: passwordSchema
});
