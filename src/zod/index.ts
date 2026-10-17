import * as z from "zod";

export const Signupbody = z.object({
    username: z.string().min(5).max(20),
    email: z.email(),
    password: z.string().regex(/^[a-zA-Z0-9]+$/)
})