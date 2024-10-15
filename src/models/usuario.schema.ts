import { z } from 'zod';

export const UsuarioSchema: z.ZodSchema = z.object({
    id_usuario: z.number().optional(),

    nombre: z
        .string()
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
        .max(50, { message: 'El nombre no puede exceder 50 caracteres.' }),

    apellido: z
        .string()
        .min(2, { message: 'El apellido debe tener al menos 2 caracteres.' })
        .max(50, { message: 'El apellido no puede exceder 50 caracteres.' }),

    correo: z
        .string()
        .email({ message: 'Debe proporcionar un correo electrónico válido.' }),

    contrasenia_hash: z
        .string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
        .max(100, {
            message: 'La contraseña no puede exceder 100 caracteres.',
        }),

    cargo: z
        .string()
        .max(50, { message: 'El cargo no puede exceder 50 caracteres.' })
        .optional(),

    rango: z
        .string()
        .max(50, { message: 'El rango no puede exceder 50 caracteres.' })
        .optional(),

    Casos: z.array(z.number()).optional(),
});
