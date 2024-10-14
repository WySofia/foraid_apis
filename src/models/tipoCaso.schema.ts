import z from 'zod';

export const tipoCasoSchema = z.object({
    nombre: z.string().min(3, 'El nombre del tipo de caso es obligatorio'),
});
