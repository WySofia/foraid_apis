import { describe, it, expect } from 'vitest';
import { UsuarioSchema } from '../../src/models/usuario.schema';

describe('UsuarioSchema', () => {
    it('should validate a valid user', () => {
        const validUser = {
            id_usuario: 1,
            nombre: 'Juan',
            apellido: 'Perez',
            correo: 'juan.perez@example.com',
            contrasenia_hash: 'password123',
            cargo: 'Developer',
            rango: 'Senior',
            Casos: [1, 2, 3],
        };

        const result = UsuarioSchema.safeParse(validUser);
        expect(result.success).toBe(true);
    });

    it('should invalidate a user with short nombre', () => {
        const invalidUser = {
            nombre: 'J',
            apellido: 'Perez',
            correo: 'juan.perez@example.com',
            contrasenia_hash: 'password123',
        };

        const result = UsuarioSchema.safeParse(invalidUser);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El nombre debe tener al menos 2 caracteres.'
            );
        }
    });

    it('should invalidate a user with invalid correo', () => {
        const invalidUser = {
            nombre: 'Juan',
            apellido: 'Perez',
            correo: 'juan.perez',
            contrasenia_hash: 'password123',
        };

        const result = UsuarioSchema.safeParse(invalidUser);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'Debe proporcionar un correo electrónico válido.'
            );
        }
    });

    it('should invalidate a user with short contrasenia_hash', () => {
        const invalidUser = {
            nombre: 'Juan',
            apellido: 'Perez',
            correo: 'juan.perez@example.com',
            contrasenia_hash: 'pass',
        };

        const result = UsuarioSchema.safeParse(invalidUser);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'La contraseña debe tener al menos 8 caracteres.'
            );
        }
    });

    it('should invalidate a user with long nombre', () => {
        const invalidUser = {
            nombre: 'J'.repeat(51),
            apellido: 'Perez',
            correo: 'juan.perez@example.com',
            contrasenia_hash: 'password123',
        };

        const result = UsuarioSchema.safeParse(invalidUser);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'El nombre no puede exceder 50 caracteres.'
            );
        }
    });

    it('should invalidate a user with long contrasenia_hash', () => {
        const invalidUser = {
            nombre: 'Juan',
            apellido: 'Perez',
            correo: 'juan.perez@example.com',
            contrasenia_hash: 'p'.repeat(101),
        };

        const result = UsuarioSchema.safeParse(invalidUser);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe(
                'La contraseña no puede exceder 100 caracteres.'
            );
        }
    });
});
