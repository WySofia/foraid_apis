import z from 'zod';

export const caracteristicasSchema = z.object({
    id_identikit: z.number().int(),
    nombre_caracteristica: z
        .string()
        .min(3, 'El nombre de la característica es obligatorio'),
    descripcion: z.string().optional(),
});
