import z from 'zod';

// Password schema
export const passwordSchema = z
    .string()
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .min(8, "Password must be greater than 8 characters")
    .max(80, "Password must be less than 80 characters");

// Username schema
export const usernameSchema = z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, "Username must contain only letters, numbers, and underscores")
    .min(3, "Username must be greater than 3 characters")
    .max(30, "Username must be less than 30 characters");

// Register schema
export const registerSchema = z.object({
    email: z.string().email(),
    password: passwordSchema,
    name: z
        .string()
        .min(3, "Name must be greater than 3 characters")
        .max(60, "Name must be less than 60 characters"),
    username: usernameSchema
});
