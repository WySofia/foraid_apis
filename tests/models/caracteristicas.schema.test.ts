import { describe, it, expect } from 'vitest';
import { CaracteristicasSchema } from '../../src/models/caracteristicas.schema';

describe('CaracteristicasSchema', () => {
    it('should validate a valid schema', () => {
        const validData = {
            id_caracteristica: 1,
            id_identikit: 123,
            nombre_caracteristica: 'Característica válida',
            descripcion: 'Descripción válida',
        };

        const result = CaracteristicasSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should fail if id_identikit is missing', () => {
        const invalidData = {
            nombre_caracteristica: 'Característica válida',
            descripcion: 'Descripción válida',
        };

        const result = CaracteristicasSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El ID del identikit es requerido.'
            );
        }
    });

    it('should fail if nombre_caracteristica is too short', () => {
        const invalidData = {
            id_identikit: 123,
            nombre_caracteristica: 'Ca',
            descripcion: 'Descripción válida',
        };

        const result = CaracteristicasSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El nombre de la característica debe tener al menos 3 caracteres.'
            );
        }
    });

    it('should fail if nombre_caracteristica is too long', () => {
        const invalidData = {
            id_identikit: 123,
            nombre_caracteristica: 'C'.repeat(101),
            descripcion: 'Descripción válida',
        };

        const result = CaracteristicasSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El nombre de la característica no puede exceder 100 caracteres.'
            );
        }
    });

    it('should fail if descripcion is too long', () => {
        const invalidData = {
            id_identikit: 123,
            nombre_caracteristica: 'Característica válida',
            descripcion: 'D'.repeat(501),
        };

        const result = CaracteristicasSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'La descripción no puede exceder 500 caracteres.'
            );
        }
    });
});
