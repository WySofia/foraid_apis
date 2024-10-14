import { describe, it, expect } from 'vitest';
import { IdentikitsSchema } from '../../src/models/indentikits.schema';

describe('IdentikitsSchema', () => {
    it('should validate a correct schema', () => {
        const validData = {
            id_identikit: 1,
            id_caso: 123,
            fecha_creacion: new Date(),
            id_metodo_creacion: 2,
            imagen: 'https://example.com/image.png',
            Caracteristicas: [],
        };

        const result = IdentikitsSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should fail if id_caso is missing', () => {
        const invalidData = {
            fecha_creacion: new Date(),
            id_metodo_creacion: 2,
        };

        const result = IdentikitsSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El ID del caso es requerido.'
            );
        }
    });

    it('should fail if fecha_creacion is not a valid date', () => {
        const invalidData = {
            id_caso: 123,
            fecha_creacion: 'invalid-date',
            id_metodo_creacion: 2,
        };

        const result = IdentikitsSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'La fecha de creación debe ser una fecha válida.'
            );
        }
    });

    it('should fail if id_metodo_creacion is missing', () => {
        const invalidData = {
            id_caso: 123,
            fecha_creacion: new Date(),
        };

        const result = IdentikitsSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El ID del método de creación es requerido.'
            );
        }
    });

    it('should fail if imagen is not a valid URL', () => {
        const invalidData = {
            id_caso: 123,
            fecha_creacion: new Date(),
            id_metodo_creacion: 2,
            imagen: 'invalid-url',
        };

        const result = IdentikitsSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'La imagen debe ser una URL válida.'
            );
        }
    });
});
