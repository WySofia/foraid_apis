import z from 'zod';

export const loginSchema = z.object({
    correo: z.string().email({
        message: 'El email no es válido.',
    }),
    contrasenia_hash: z.string().min(8, {
        message: 'La contraseña debe tener al menos 6 caracteres.',
    }),
});
