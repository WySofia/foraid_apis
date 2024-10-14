import { z } from 'zod';
import { CaracteristicasSchema } from './caracteristicas.schema';

export const IdentikitsSchema: z.ZodSchema = z.object({
    id_identikit: z.number().optional(),

    id_caso: z.number({
        required_error: 'El ID del caso es requerido.',
        invalid_type_error: 'El ID del caso debe ser un número válido.',
    }),

    fecha_creacion: z
        .preprocess((arg) => {
            if (typeof arg === 'string' || arg instanceof Date) {
                return new Date(arg);
            }
            return arg;
        }, z.any())
        .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
            message: 'La fecha de creación debe ser una fecha válida.',
        }),

    id_metodo_creacion: z.number({
        required_error: 'El ID del método de creación es requerido.',
        invalid_type_error:
            'El ID del método de creación debe ser un número válido.',
    }),

    imagen: z
        .string()
        .url({ message: 'La imagen debe ser una URL válida.' })
        .optional(),

    Caracteristicas: z.array(CaracteristicasSchema).optional(),
});
