import * as z from "zod";

export const UserType = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string()
})

export type User = z.infer<typeof UserType>


