import { z } from 'zod';
import { UsuarioSchema } from './usuario.schema';
import { TipoCasoSchema } from './tipoCaso.schema';

export const CasosSchema = z.object({
    id_caso: z.number().optional(),

    id_usuario: z.number({
        required_error: 'El ID del usuario es requerido.',
        invalid_type_error: 'El ID del usuario debe ser un número válido.',
    }),

    fecha: z
        .preprocess((arg) => {
            if (typeof arg === 'string' || arg instanceof Date) {
                return new Date(arg);
            }
            return arg;
        }, z.any())
        .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
            message: 'La fecha debe ser una fecha válida.',
        }),

    titulo: z
        .string()
        .min(5, { message: 'El título debe tener al menos 5 caracteres.' })
        .max(200, { message: 'El título no puede exceder 200 caracteres.' }),

    descripcion: z
        .string()
        .max(1000, {
            message: 'La descripción no puede exceder 1000 caracteres.',
        })
        .optional(),

    id_tipo_caso: z.number({
        required_error: 'El ID del tipo de caso es requerido.',
        invalid_type_error: 'El ID del tipo de caso debe ser un número válido.',
    }),

    calle_principal: z
        .string()
        .max(100, {
            message: 'La calle principal no puede exceder 100 caracteres.',
        })
        .optional(),

    calle_secundaria: z
        .string()
        .max(100, {
            message: 'La calle secundaria no puede exceder 100 caracteres.',
        })
        .optional(),

    provincia: z
        .string()
        .max(100, { message: 'La provincia no puede exceder 100 caracteres.' })
        .optional(),

    canton: z
        .string()
        .max(100, { message: 'El cantón no puede exceder 100 caracteres.' })
        .optional(),

    tipoCaso: TipoCasoSchema.optional(),
    usuario: UsuarioSchema.optional(),

    Identikits: z.array(z.number()).optional(),
});
