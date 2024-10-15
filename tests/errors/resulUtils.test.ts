import { describe, it, expect } from 'vitest';
import { ok, err } from '../../src/errors/result';
import {
    isOk,
    isErr,
    map,
    mapErr,
    flatMap,
    fold,
    tryCatch,
} from '../../src/errors/resultUtils';
import { DataError, CustomError } from '../../src/errors/errorTypes';

describe('resultUtils', () => {
    const success = ok(10);
    const failure = err<DataError>({
        tag: 'DataError',
        message: 'Test failure',
    });

    describe('isOk', () => {
        it('returns true for Ok results', () => {
            expect(isOk(success)).toBe(true);
        });

        it('returns false for Err results', () => {
            expect(isOk(failure)).toBe(false);
        });
    });

    describe('isErr', () => {
        it('returns true for Err results', () => {
            expect(isErr(failure)).toBe(true);
        });

        it('returns false for Ok results', () => {
            expect(isErr(success)).toBe(false);
        });
    });

    describe('map', () => {
        it('applies function to Ok result', () => {
            const result = map(success, (value) => value * 2);
            expect(result).toEqual(ok(20));
        });

        it('does not modify Err result', () => {
            const result = map(failure, (value) => value * 2);
            expect(result).toBe(failure);
        });
    });

    describe('mapErr', () => {
        it('applies function to Err result', () => {
            const result = mapErr(failure, (error: DataError) => ({
                ...error,
                message: 'New error message',
            }));
            if (result.type === 'err') {
                expect(result.error.message).toBe('New error message');
            }
        });

        it('does not modify Ok result', () => {
            const result = mapErr(success, (error: CustomError) => ({
                ...error,
                message: 'Ignored',
            }));
            expect(result).toBe(success);
        });
    });

    describe('flatMap', () => {
        it('chains Ok results', () => {
            const result = flatMap(success, (value) => ok(value + 5));
            expect(result).toEqual(ok(15));
        });

        it('returns original Err result if the first result is an error', () => {
            const result = flatMap(failure, (value) => ok(value + 5));
            expect(result).toBe(failure);
        });
    });

    describe('fold', () => {
        it('applies onOk function for Ok result', () => {
            const result = fold(
                success,
                (value) => `Value: ${value}`,
                () => 'Error'
            );
            expect(result).toBe('Value: 10');
        });

        it('applies onErr function for Err result', () => {
            const result = fold(
                failure,
                () => 'Success',
                (error) => `Error: ${error.message}`
            );
            expect(result).toBe('Error: Test failure');
        });
    });

    describe('tryCatch', () => {
        const successFn = async () => 42;
        const failureFn = async () => {
            throw new Error('Test error');
        };

        const mapError = (error: unknown): CustomError => ({
            tag: 'LogicError',
            message: error instanceof Error ? error.message : 'Unknown error',
        });

        it('returns Ok result when function resolves successfully', async () => {
            const result = await tryCatch(successFn, mapError);
            expect(result).toEqual(ok(42));
        });

        it('returns Err result when function throws an error', async () => {
            const result = await tryCatch(failureFn, mapError);
            expect(result).toEqual(
                err<CustomError>({
                    tag: 'LogicError',
                    message: 'Test error',
                })
            );
        });

        it('handles unknown errors gracefully', async () => {
            const faultyFn = async () => {
                throw null;
            };
            const result = await tryCatch(faultyFn, mapError);
            expect(result).toEqual(
                err<CustomError>({
                    tag: 'LogicError',
                    message: 'Unknown error',
                })
            );
        });

        it('works with custom error mapping logic', async () => {
            const customMapError = (error: unknown): DataError => ({
                tag: 'DataError',
                message:
                    error instanceof Error
                        ? error.message
                        : 'Custom error handling',
            });

            const result = await tryCatch(failureFn, customMapError);
            expect(result).toEqual(
                err<DataError>({
                    tag: 'DataError',
                    message: 'Test error',
                })
            );
        });
    });
});
