import { Casos } from '@prisma/client';
import { err, Result } from '../errors/result';
import { CustomError, ValidationError } from '../errors/errorTypes';
import { tryCatch } from '../errors/resultUtils';
import { prisma } from '../db';
import { handleError } from '../errors/errorUtils';
import { CasosSchema } from '../models/casos.schema';
import z from 'zod';

export const createCaso = async (
    data: unknown
): Promise<Result<Casos, CustomError>> => {
    const parseResult = CasosSchema.safeParse(data);
    if (!parseResult.success) {
        const validationError: ValidationError = {
            tag: 'ValidationError',
            message: parseResult.error.message,
            field: parseResult.error.errors[0]?.path.join('.') || undefined,
        };
        return err(validationError);
    }

    const casoData = parseResult.data;

    return await tryCatch(
        async () => {
            const nuevoCaso = await prisma.casos.create({
                data: {
                    id_usuario: casoData.id_usuario,
                    fecha: casoData.fecha,
                    titulo: casoData.titulo,
                    descripcion: casoData.descripcion,
                    id_tipo_caso: casoData.id_tipo_caso,
                    calle_principal: casoData.calle_principal,
                    calle_secundaria: casoData.calle_secundaria,
                    provincia: casoData.provincia,
                    canton: casoData.canton,
                    Identikits: {
                        connect: casoData.Identikits?.map((id) => ({
                            id_identikit: id,
                        })),
                    },
                },
                include: {
                    usuario: true,
                    tipoCaso: true,
                    Identikits: true,
                },
            });
            return nuevoCaso;
        },
        (error) => handleError('DataError', error)
    );
};

export const getCasoById = async (
    id: number
): Promise<Result<Casos, CustomError>> => {
    if (isNaN(id)) {
        return err({
            tag: 'ValidationError',
            message: 'El ID del caso debe ser un número válido.',
            field: 'id_caso',
        });
    }

    return await tryCatch(
        async () => {
            const caso = await prisma.casos.findUnique({
                where: { id_caso: id },
                include: {
                    usuario: true,
                    tipoCaso: true,
                    Identikits: true,
                },
            });
            if (!caso) {
                throw new Error('Caso no encontrado.');
            }
            return caso;
        },
        (error) => {
            if (
                error instanceof Error &&
                error.message === 'Caso no encontrado.'
            ) {
                return handleError('LogicError', error);
            }
            return handleError('DataError', error);
        }
    );
};

export const getAllCasos = async (): Promise<Result<Casos[], CustomError>> => {
    return await tryCatch(
        async () => {
            const casos = await prisma.casos.findMany({
                include: {
                    usuario: true,
                    tipoCaso: true,
                    Identikits: true,
                },
            });
            return casos;
        },
        (error) => handleError('DataError', error)
    );
};

export const updateCaso = async (
    data: unknown
): Promise<Result<Casos, CustomError>> => {
    const updateSchema = CasosSchema.extend({
        id_caso: z.number({
            required_error:
                'El ID del caso es requerido para la actualización.',
            invalid_type_error: 'El ID del caso debe ser un número válido.',
        }),
    });

    const parseResult = updateSchema.safeParse(data);
    if (!parseResult.success) {
        const validationError: ValidationError = {
            tag: 'ValidationError',
            message: parseResult.error.message,
            field: parseResult.error.errors[0]?.path.join('.') || undefined,
        };
        return err(validationError);
    }

    const casoData = parseResult.data;

    return await tryCatch(
        async () => {
            const casoExistente = await prisma.casos.findUnique({
                where: { id_caso: casoData.id_caso },
            });
            if (!casoExistente) {
                throw new Error('Caso no encontrado.');
            }

            const casoActualizado = await prisma.casos.update({
                where: { id_caso: casoData.id_caso },
                data: {
                    id_usuario: casoData.id_usuario,
                    fecha: casoData.fecha,
                    titulo: casoData.titulo,
                    descripcion: casoData.descripcion,
                    id_tipo_caso: casoData.id_tipo_caso,
                    calle_principal: casoData.calle_principal,
                    calle_secundaria: casoData.calle_secundaria,
                    provincia: casoData.provincia,
                    canton: casoData.canton,
                    Identikits: {
                        set:
                            casoData.Identikits?.map((id) => ({
                                id_identikit: id,
                            })) || [],
                    },
                },
                include: {
                    usuario: true,
                    tipoCaso: true,
                    Identikits: true,
                },
            });
            return casoActualizado;
        },
        (error) => {
            if (
                error instanceof Error &&
                error.message === 'Caso no encontrado.'
            ) {
                return handleError('LogicError', error);
            }
            return handleError('DataError', error);
        }
    );
};

// Eliminar un caso
export const deleteCaso = async (
    id: number
): Promise<Result<Casos, CustomError>> => {
    if (isNaN(id)) {
        return err({
            tag: 'ValidationError',
            message: 'El ID del caso debe ser un número válido.',
            field: 'id_caso',
        });
    }

    return await tryCatch(
        async () => {
            const casoExistente = await prisma.casos.findUnique({
                where: { id_caso: id },
            });
            if (!casoExistente) {
                throw new Error('Caso no encontrado.');
            }

            const casoEliminado = await prisma.casos.delete({
                where: { id_caso: id },
                include: {
                    usuario: true,
                    tipoCaso: true,
                    Identikits: true,
                },
            });
            return casoEliminado;
        },
        (error) => {
            if (
                error instanceof Error &&
                error.message === 'Caso no encontrado.'
            ) {
                return handleError('LogicError', error);
            }
            return handleError('DataError', error);
        }
    );
};
