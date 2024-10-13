// tests/errorUtils.test.ts
import { describe, it, expect } from 'vitest';
import {
    getErrorMessage,
    createError,
    handleError,
} from '../src/errors/errorUtils';
import { ApiError } from '../src/errors/errorTypes';

describe('errorUtils', () => {
    describe('getErrorMessage', () => {
        it('returns the message from an Error instance', () => {
            const error = new Error('Test error message');
            expect(getErrorMessage(error)).toBe('Test error message');
        });

        it('returns the message from an object with message property', () => {
            const error = { message: 'Test error' };
            expect(getErrorMessage(error)).toBe('Test error');
        });

        it('returns string representation for unknown errors', () => {
            const error = 404;
            expect(getErrorMessage(error)).toBe('404');
        });
    });

    describe('createError', () => {
        it('creates an ApiError with statusCode', () => {
            const error = createError('ApiError', 'API failed', {
                statusCode: 500,
            }) as ApiError;
            expect(error.tag).toBe('ApiError');
            expect(error.message).toBe('API failed');
            expect(error.statusCode).toBe(500);
        });
    });

    describe('handleError', () => {
        it('handles ValidationError correctly', () => {
            const error = handleError(
                'ValidationError',
                new Error('Invalid input')
            );
            expect(error.tag).toBe('ValidationError');
            expect(error.message).toContain('Invalid input');
        });

        it('returns UnknownError for unsupported tags', () => {
            const error = handleError('UnknownError', 'An unknown issue');
            expect(error.tag).toBe('UnknownError');
            expect(error.message).toContain('An unknown issue');
        });
    });
});