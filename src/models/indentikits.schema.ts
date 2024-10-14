import z from 'zod';

export const identikitsSchema = z.object({
    id_caso: z.number().int(),
    fecha_creacion: z.date(),
    id_metodo_creacion: z.number().int(),
    imagen: z.string().optional(),
});
