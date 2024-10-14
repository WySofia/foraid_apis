import z from 'zod';

export const metodoCreacionSchema = z.object({
    nombre: z
        .string()
        .min(3, 'El nombre del método de creación es obligatorio'),
});
