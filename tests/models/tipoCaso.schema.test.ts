import { describe, it, expect } from 'vitest';
import { TipoCasoSchema } from '../../src/models/tipoCaso.schema';

describe('TipoCasoSchema', () => {
    it('should validate a correct schema', () => {
        const validData = {
            id_tipo_caso: 1,
            nombre: 'Caso de prueba',
            Casos: [1, 2, 3],
        };

        const result = TipoCasoSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should fail if nombre is less than 3 characters', () => {
        const invalidData = {
            id_tipo_caso: 1,
            nombre: 'Ca',
            Casos: [1, 2, 3],
        };

        const result = TipoCasoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El nombre del tipo de caso debe tener al menos 3 caracteres.'
            );
        }
    });

    it('should fail if nombre is more than 100 characters', () => {
        const invalidData = {
            id_tipo_caso: 1,
            nombre: 'C'.repeat(101),
            Casos: [1, 2, 3],
        };

        const result = TipoCasoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El nombre del tipo de caso no puede exceder 100 caracteres.'
            );
        }
    });

    it('should validate schema without optional fields', () => {
        const validData = {
            nombre: 'Caso de prueba',
        };

        const result = TipoCasoSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should fail if Casos contains non-number elements', () => {
        const invalidData = {
            id_tipo_caso: 1,
            nombre: 'Caso de prueba',
            Casos: [1, 'two', 3],
        };

        const result = TipoCasoSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
    });
});
