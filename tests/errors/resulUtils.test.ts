import { describe, it, expect } from 'vitest';
import { ok, err } from '../../src/errors/result';
import {
    isOk,
    isErr,
    map,
    mapErr,
    flatMap,
    fold,
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
});
