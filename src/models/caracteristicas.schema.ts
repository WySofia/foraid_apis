import { z } from 'zod';

export const CaracteristicasSchema: z.ZodSchema = z.object({
    id_caracteristica: z.number().optional(),

    id_identikit: z.number({
        required_error: 'El ID del identikit es requerido.',
        invalid_type_error: 'El ID del identikit debe ser un número válido.',
    }),

    nombre_caracteristica: z
        .string()
        .min(3, {
            message:
                'El nombre de la característica debe tener al menos 3 caracteres.',
        })
        .max(100, {
            message:
                'El nombre de la característica no puede exceder 100 caracteres.',
        }),

    descripcion: z
        .string()
        .max(500, {
            message: 'La descripción no puede exceder 500 caracteres.',
        })
        .optional(),
});
