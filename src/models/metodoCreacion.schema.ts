import { z } from 'zod';

export const MetodoCreacionSchema: z.ZodSchema = z.object({
    id_metodo_creacion: z.number().optional(),

    nombre: z
        .string()
        .min(3, {
            message:
                'El nombre del método de creación debe tener al menos 3 caracteres.',
        })
        .max(100, {
            message:
                'El nombre del método de creación no puede exceder 100 caracteres.',
        }),

    Identikits: z.array(z.number()).optional(),
});
