import { CustomError } from './errorTypes';
import { err, Err, ok, Ok, Result } from './result';

export const isOk = <T, E extends CustomError>(
    result: Result<T, E>
): result is Ok<T> => result.type === 'ok';

export const isErr = <T, E extends CustomError>(
    result: Result<T, E>
): result is Err<E> => result.type === 'err';

export const map = <T, U, E extends CustomError>(
    result: Result<T, E>,
    fn: (_value: T) => U
): Result<U, E> => (isOk(result) ? ok(fn(result.value)) : result);

export const mapErr = <T, E extends CustomError, F extends CustomError>(
    result: Result<T, E>,
    fn: (_error: E) => F
): Result<T, F> => (isErr(result) ? err(fn(result.error)) : result);

export const flatMap = <T, U, E extends CustomError, F extends CustomError>(
    result: Result<T, E>,
    fn: (_value: T) => Result<U, F>
): Result<U, E | F> => (isOk(result) ? fn(result.value) : result);

export const fold = <T, E extends CustomError, U>(
    result: Result<T, E>,
    onOk: (_value: T) => U,
    onErr: (_error: E) => U
): U => (isOk(result) ? onOk(result.value) : onErr(result.error));
