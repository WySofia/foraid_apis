import { Casos } from '@prisma/client';
import { err, ok, Result } from '../errors/result';
import { CustomError, ValidationError } from '../errors/errorTypes';
import { isErr, tryCatch } from '../errors/resultUtils';
import { prisma } from '../db';
import { handleError } from '../errors/errorUtils';
import { CasosSchema } from '../models/casos.schema';

const mapDataToCaso = (data: unknown): Result<Casos, CustomError> => {
    const parseResult = CasosSchema.safeParse(data);

    if (!parseResult.success) {
        const validationError: ValidationError = {
            tag: 'ValidationError',
            message: parseResult.error.message,
            field: parseResult.error.errors[0]?.path.join('.') || undefined,
        };
        return err(validationError);
    }

    return ok(parseResult.data);
};

export class CasoService {
    async createCaso(data: unknown): Promise<Result<Casos, CustomError>> {
        const caso = mapDataToCaso(data);
        if (isErr(caso)) {
            return caso;
        }

        const result = await tryCatch(
            () => prisma.casos.create({ data: caso.value }),
            (error) => handleError('DataError', error)
        );

        return result;
    }

    async getCasos(): Promise<Result<Casos[], CustomError>> {
        const result = await tryCatch(
            () => prisma.casos.findMany(),
            (error) => handleError('DataError', error)
        );

        return result;
    }

    async getCasoById(id: number): Promise<Result<Casos | null, CustomError>> {
        const result = await tryCatch(
            () => prisma.casos.findUnique({ where: { id_caso: id } }),
            (error) => handleError('DataError', error)
        );

        return result;
    }

    async updateCaso(
        id: number,
        data: unknown
    ): Promise<Result<Casos, CustomError>> {
        const caso = mapDataToCaso(data);
        if (isErr(caso)) {
            return caso;
        }

        const result = await tryCatch(
            () =>
                prisma.casos.update({
                    where: { id_caso: id },
                    data: caso.value,
                }),
            (error) => handleError('DataError', error)
        );

        return result;
    }

    async deleteCaso(id: number): Promise<Result<Casos, CustomError>> {
        const result = await tryCatch(
            () => prisma.casos.delete({ where: { id_caso: id } }),
            (error) => handleError('DataError', error)
        );

        return result;
    }
}
