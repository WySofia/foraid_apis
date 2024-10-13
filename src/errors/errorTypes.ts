export type ErrorTag =
    | 'ValidationError'
    | 'LogicError'
    | 'DataError'
    | 'ApiError'
    | 'UnknownError';

type BaseError<T extends ErrorTag> = {
    readonly tag: T;
    readonly message: string;
};

export type LogicError = BaseError<'LogicError'>;

export type DataError = BaseError<'DataError'>;

export type UnknownError = BaseError<'UnknownError'>;

export type ApiError = BaseError<'ApiError'> & {
    readonly statusCode?: number;
};
export type ValidationError = BaseError<'ValidationError'> & {
    readonly field?: string;
};

export type CustomError =
    | ValidationError
    | LogicError
    | DataError
    | ApiError
    | UnknownError;
