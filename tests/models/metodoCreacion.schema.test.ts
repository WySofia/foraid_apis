import { describe, it, expect } from 'vitest';
import { MetodoCreacionSchema } from '../../src/models/metodoCreacion.schema';

describe('MetodoCreacionSchema', () => {
    it('should validate a correct schema', () => {
        const validData = {
            id_metodo_creacion: 1,
            nombre: 'Metodo de Creacion',
            Identikits: [1, 2, 3],
        };

        const result = MetodoCreacionSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should fail if nombre is too short', () => {
        const invalidData = {
            id_metodo_creacion: 1,
            nombre: 'Me',
            Identikits: [1, 2, 3],
        };

        const result = MetodoCreacionSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El nombre del método de creación debe tener al menos 3 caracteres.'
            );
        }
    });

    it('should fail if nombre is too long', () => {
        const invalidData = {
            id_metodo_creacion: 1,
            nombre: 'M'.repeat(101),
            Identikits: [1, 2, 3],
        };

        const result = MetodoCreacionSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El nombre del método de creación no puede exceder 100 caracteres.'
            );
        }
    });

    it('should validate schema without optional fields', () => {
        const validData = {
            nombre: 'Metodo de Creacion',
        };

        const result = MetodoCreacionSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should fail if Identikits contains non-number elements', () => {
        const invalidData = {
            id_metodo_creacion: 1,
            nombre: 'Metodo de Creacion',
            Identikits: [1, 'two', 3],
        };

        const result = MetodoCreacionSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });
});
