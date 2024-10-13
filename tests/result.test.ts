import { describe, it, expect } from 'vitest';
import { ok, err } from '../src/errors/result';
import { CustomError } from '../src/errors/errorTypes';

describe('result', () => {
    describe('ok', () => {
        it('creates an Ok result with a value', () => {
            const result = ok(42);
            expect(result.type).toBe('ok');
            if (result.type === 'ok') {
                expect(result.value).toBe(42);
            }
        });
    });

    describe('err', () => {
        it('creates an Err result with an error', () => {
            const error: CustomError = {
                tag: 'LogicError',
                message: 'Test error',
            };
            const result = err(error);
            expect(result.type).toBe('err');
            if (result.type === 'err') {
                expect(result.error).toBe(error);
            }
        });
    });
});
