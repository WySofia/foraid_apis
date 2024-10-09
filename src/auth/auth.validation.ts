import { z } from 'zod';

export const validateRegister = z.object({
    nombre: z.string().min(1, 'Nombre es requerido'),
    apellido: z.string().min(1, 'Apellido es requerido'),
    correo: z.string().email('Correo inválido'),
    contrasenia: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const validateLogin = z.object({
    correo: z.string().email('Correo inválido'),
    contrasenia: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
