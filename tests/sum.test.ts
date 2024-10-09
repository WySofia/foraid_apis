import { describe, it, expect } from 'vitest';
import { add } from '../src/sum';

describe('add function', () => {
    it('should return the sum of two numbers', () => {
        expect(add(1, 2)).toBe(3);
        expect(add(-1, -1)).toBe(-2);
        expect(add(0, 0)).toBe(0);
        expect(add(100, 200)).toBe(300);
    });

    it('should handle adding negative numbers', () => {
        expect(add(-1, 1)).toBe(0);
        expect(add(-5, -5)).toBe(-10);
    });

    it('should handle adding zero', () => {
        expect(add(0, 5)).toBe(5);
        expect(add(5, 0)).toBe(5);
    });
});

// We recommend installing an extension to run vitest tests.
