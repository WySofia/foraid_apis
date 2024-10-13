import { describe, it, expect } from 'vitest';
import {
    LogicError,
    DataError,
    UnknownError,
    ApiError,
    ValidationError,
    CustomError,
} from '../src/errors/errorTypes';

describe('ErrorTypes', () => {
    describe('LogicError', () => {
        it('should create a LogicError with correct properties', () => {
            const error: LogicError = {
                tag: 'LogicError',
                message: 'Logical operation failed',
            };
            expect(error.tag).toBe('LogicError');
            expect(error.message).toBe('Logical operation failed');
        });
    });

    describe('DataError', () => {
        it('should create a DataError with correct properties', () => {
            const error: DataError = {
                tag: 'DataError',
                message: 'Data processing failed',
            };
            expect(error.tag).toBe('DataError');
            expect(error.message).toBe('Data processing failed');
        });
    });

    describe('UnknownError', () => {
        it('should create an UnknownError with correct properties', () => {
            const error: UnknownError = {
                tag: 'UnknownError',
                message: 'Something went wrong',
            };
            expect(error.tag).toBe('UnknownError');
            expect(error.message).toBe('Something went wrong');
        });
    });

    describe('ApiError', () => {
        it('should create an ApiError with statusCode', () => {
            const error: ApiError = {
                tag: 'ApiError',
                message: 'API request failed',
                statusCode: 404,
            };
            expect(error.tag).toBe('ApiError');
            expect(error.message).toBe('API request failed');
            expect(error.statusCode).toBe(404);
        });

        it('should create an ApiError without statusCode', () => {
            const error: ApiError = {
                tag: 'ApiError',
                message: 'API request failed',
            };
            expect(error.tag).toBe('ApiError');
            expect(error.message).toBe('API request failed');
            expect(error.statusCode).toBeUndefined();
        });
    });

    describe('ValidationError', () => {
        it('should create a ValidationError with field information', () => {
            const error: ValidationError = {
                tag: 'ValidationError',
                message: 'Invalid field input',
                field: 'email',
            };
            expect(error.tag).toBe('ValidationError');
            expect(error.message).toBe('Invalid field input');
            expect(error.field).toBe('email');
        });

        it('should create a ValidationError without field information', () => {
            const error: ValidationError = {
                tag: 'ValidationError',
                message: 'Invalid input',
            };
            expect(error.tag).toBe('ValidationError');
            expect(error.message).toBe('Invalid input');
            expect(error.field).toBeUndefined();
        });
    });

    describe('CustomError', () => {
        it('should accept any valid CustomError type', () => {
            const logicError: CustomError = {
                tag: 'LogicError',
                message: 'Logic failed',
            };
            const apiError: CustomError = {
                tag: 'ApiError',
                message: 'API failed',
                statusCode: 500,
            };

            expect(logicError.tag).toBe('LogicError');
            expect(logicError.message).toBe('Logic failed');
            expect(apiError.tag).toBe('ApiError');
            expect(apiError.message).toBe('API failed');
            expect(apiError.statusCode).toBe(500);
        });
    });
});
