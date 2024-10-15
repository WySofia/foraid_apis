import { CustomError } from './errorTypes';

export type Ok<T> = {
    readonly type: 'ok';
    readonly value: T;
};

export type Err<E extends CustomError> = {
    readonly type: 'err';
    readonly error: E;
};

export type Result<T, E extends CustomError> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Result<T, never> => ({
    type: 'ok',
    value: value,
});

export const err = <E extends CustomError>(error: E): Result<never, E> => ({
    type: 'err',
    error: error,
});
