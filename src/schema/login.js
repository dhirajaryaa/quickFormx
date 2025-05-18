import z from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
      password: z.string().regex(
   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Password must be at least 8 characters long and include at least one letter , one spacial character and one number"
  )
});
