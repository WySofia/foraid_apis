import { describe, it, expect } from 'vitest';
import { CasosSchema } from '../../src/models/casos.schema';

describe('CasosSchema', () => {
    it('should validate a correct schema', () => {
        const validData = {
            id_caso: 1,
            id_usuario: 123,
            fecha: '',
            titulo: 'Título válido',
            descripcion: 'Descripción válida',
            id_tipo_caso: 1,
            calle_principal: 'Calle Principal',
            calle_secundaria: 'Calle Secundaria',
            provincia: 'Provincia',
            canton: 'Cantón',
        };

        const result = CasosSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should fail if id_usuario is missing', () => {
        const invalidData = {
            titulo: 'Título válido',
            id_tipo_caso: 456,
        };

        const result = CasosSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El ID del usuario es requerido.'
            );
        }
    });

    it('should fail if titulo is too short', () => {
        const invalidData = {
            id_usuario: 123,
            titulo: 'abc',
            id_tipo_caso: 456,
        };

        const result = CasosSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El título debe tener al menos 5 caracteres.'
            );
        }
    });

    it('should fail if titulo is too long', () => {
        const invalidData = {
            id_usuario: 123,
            titulo: 'a'.repeat(201),
            id_tipo_caso: 456,
        };

        const result = CasosSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El título no puede exceder 200 caracteres.'
            );
        }
    });

    it('should fail if descripcion is too long', () => {
        const invalidData = {
            id_usuario: 123,
            titulo: 'Título válido',
            descripcion: 'a'.repeat(2001),
            id_tipo_caso: 456,
        };

        const result = CasosSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'La descripción no puede exceder 1000 caracteres.'
            );
        }
    });

    it('should fail if id_tipo_caso is missing', () => {
        const invalidData = {
            id_usuario: 123,
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
});
