import {z} from 'zod'

export const UserRole = z.enum(['USER', 'ADMIN'])

export const createUserSchema = z.object({
    name: z.string().min(2).max(80).trim(),
    email: z.email({message: 'Ungültige E-Mail-Adresse'}).max(120).trim(),  
}).strict();

export const updateUserSchema = z.object({
    name: z.string().min(2).max(80).trim(),
    email: z.email({message: 'Ungültige E-Mail-Adresse'}).max(120).trim(),
    role: UserRole,
}).strict();

export const userIdParamsSchema = z.object({
    id: z.uuid(),
}).strict();