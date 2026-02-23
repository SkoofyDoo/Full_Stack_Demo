import {z} from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(2).max(80).trim(),
    email: z.email({message: 'Ungültige E-Mail-Adresse'}).max(120).trim(),  
}).strict();

export const userIdParamsSchema = z.object({
    id: z.string().min(1)
}).strict();