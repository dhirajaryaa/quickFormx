import z from 'zod';

export default loginSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) // Minimum 8 characters, at least one letter and one number
})
