import { describe, it, expect } from 'vitest';
import { CasosSchema } from '../../src/models/casos.schema';

describe('CasosSchema', () => {
    it('should validate a valid case', () => {
        const validData = {
            id_usuario: 1,
            fecha: new Date(),
            titulo: 'Título válido',
            id_tipo_caso: 1,
        };

        const result = CasosSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should fail if id_usuario is missing', () => {
        const invalidData = {
            fecha: new Date(),
            titulo: 'Título válido',
            id_tipo_caso: 1,
        };

        const result = CasosSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El ID del usuario es requerido.'
            );
        }
    });

    it('should fail if fecha is invalid', () => {
        const invalidData = {
            id_usuario: 1,
            fecha: 'invalid-date',
            titulo: 'Título válido',
            id_tipo_caso: 1,
        };

        const result = CasosSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'La fecha debe ser una fecha válida.'
            );
        }
    });

    it('should fail if titulo is too short', () => {
        const invalidData = {
            id_usuario: 1,
            fecha: new Date(),
            titulo: '1234',
            id_tipo_caso: 1,
        };

        const result = CasosSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El título debe tener al menos 5 caracteres.'
            );
        }
    });

    it('should fail if id_tipo_caso is missing', () => {
        const invalidData = {
            id_usuario: 1,
            fecha: new Date(),
            titulo: 'Título válido',
        };

        const result = CasosSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El ID del tipo de caso es requerido.'
            );
        }
    });

    it('should validate optional fields', () => {
        const validData = {
            id_usuario: 1,
            fecha: new Date(),
            titulo: 'Título válido',
            id_tipo_caso: 1,
            descripcion: 'Descripción válida',
            calle_principal: 'Calle principal válida',
            calle_secundaria: 'Calle secundaria válida',
            provincia: 'Provincia válida',
            canton: 'Cantón válido',
            Identikits: [1, 2, 3],
        };

        const result = CasosSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });
});
