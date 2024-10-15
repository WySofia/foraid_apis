import { CustomError, ErrorTag } from './errorTypes';

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    } else if (error && typeof error == 'object' && 'message' in error) {
        return String(error.message);
    } else {
        return String(error);
    }
};

export const createError = <T extends ErrorTag>(
    tag: T,
    message: string,
    details?: Partial<CustomError>
): CustomError => {
    return { tag, message, ...details } as CustomError;
};

export const handleError = (tag: ErrorTag, error: unknown): CustomError => {
    const message = getErrorMessage(error);
    switch (tag) {
        case 'ValidationError':
            return createError(tag, `Error validando los campos: ${message}`);
        case 'LogicError':
            return createError(tag, `Error lógico: ${message}`);
        case 'DataError':
            return createError(
                tag,
                `Error en el procesamiento de datos: ${message}`
            );
        case 'ApiError':
            return createError(
                tag,
                `Error al obtener datos de la API: ${message}`
            );
        default:
            return createError('UnknownError', `Error desconocido: ${message}`);
    }
};
