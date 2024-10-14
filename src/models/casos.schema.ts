import z from 'zod';

export const casosSchema = z.object({
    id_usuario: z.number().int(),
    fecha: z.date(),
    titulo: z.string().min(1, 'El título del caso es obligatorio'),
    descripcion: z.string().optional(),
    id_tipo_caso: z.number().int(),
    calle_principal: z.string().optional(),
    calle_secundaria: z.string().optional(),
    provincia: z.string().optional(),
    canton: z.string().optional(),
});
