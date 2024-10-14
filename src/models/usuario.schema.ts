import { z } from 'zod';

export const usuarioSchema = z.object({
    nombre: z.string().min(3, 'El nombre es obligatorio'),
    apellido: z.string().min(3, 'El apellido es obligatorio'),
    correo: z.string().email('Debe ser un correo válido'),
    contrasenia_hash: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(50, 'La contraseña no puede tener más de 100 caracteres'),
    cargo: z.string().optional(),
    rango: z.string().optional(),
});
