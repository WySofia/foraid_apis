import { describe, it, expect } from 'vitest';
import { IdentikitSchema } from '../../src/models/indentikits.schema';

describe('IdentikitSchema', () => {
    it('should validate a correct identikit object', () => {
        const validIdentikit = {
            id_identikit: 1,
            id_caso: 123,
            fecha_creacion: new Date(),
            id_metodo_creacion: 2,
            imagen: 'http://example.com/image.png',
            Caracteristicas: [
                {
                    id_caracteristica: 1,
                    id_identikit: 1,
                    nombre_caracteristica: 'Ojos',
                    descripcion: 'Ojos azules',
                },
            ],
        };

        const result = IdentikitSchema.safeParse(validIdentikit);
        expect(result.success).toBe(true);
    });

    it('should fail if id_caso is missing', () => {
        const invalidIdentikit = {
            fecha_creacion: new Date(),
            id_metodo_creacion: 2,
        };

        const result = IdentikitSchema.safeParse(invalidIdentikit);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El ID del caso es requerido.'
            );
        }
    });

    it('should fail if fecha_creacion is not a valid date', () => {
        const invalidIdentikit = {
            id_caso: 123,
            fecha_creacion: 'invalid-date',
            id_metodo_creacion: 2,
        };

        const result = IdentikitSchema.safeParse(invalidIdentikit);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'La fecha de creación debe ser una fecha válida.'
            );
        }
    });

    it('should fail if id_metodo_creacion is missing', () => {
        const invalidIdentikit = {
            id_caso: 123,
            fecha_creacion: new Date(),
        };

        const result = IdentikitSchema.safeParse(invalidIdentikit);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El ID del método de creación es requerido.'
            );
        }
    });

    it('should fail if imagen is not a valid URL', () => {
        const invalidIdentikit = {
            id_caso: 123,
            fecha_creacion: new Date(),
            id_metodo_creacion: 2,
            imagen: 'invalid-url',
        };

        const result = IdentikitSchema.safeParse(invalidIdentikit);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'La imagen debe ser una URL válida.'
            );
        }
    });

    it('should validate an identikit object without optional fields', () => {
        const validIdentikit = {
            id_caso: 123,
            fecha_creacion: new Date(),
            id_metodo_creacion: 2,
        };

        const result = IdentikitSchema.safeParse(validIdentikit);
        expect(result.success).toBe(true);
    });
});
