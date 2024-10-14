import { z } from 'zod';

export const TipoCasoSchema: z.ZodSchema = z.object({
    id_tipo_caso: z.number().optional(),

    nombre: z
        .string()
        .min(3, {
            message:
                'El nombre del tipo de caso debe tener al menos 3 caracteres.',
        })
        .max(100, {
            message:
                'El nombre del tipo de caso no puede exceder 100 caracteres.',
        }),

    Casos: z.array(z.number()).optional(),
});
