import { describe, it, expect } from 'vitest';
import { loginSchema } from '../../src/schemas/login.schema';

describe('loginSchema', () => {
    it('should pass with valid email and password', () => {
        const validData = {
            correo: 'test@example.com',
            contrasenia_hash: 'password123',
        };
        expect(() => loginSchema.parse(validData)).not.toThrow();
    });

    it('should fail with invalid email', () => {
        const invalidEmailData = {
            correo: 'invalid-email',
            contrasenia_hash: 'password123',
        };
        expect(() => loginSchema.parse(invalidEmailData)).toThrow(
            'El email no es válido.'
        );
    });

    it('should fail with short password', () => {
        const shortPasswordData = {
            correo: 'test@example.com',
            contrasenia_hash: 'short',
        };
        expect(() => loginSchema.parse(shortPasswordData)).toThrow(
            'La contraseña debe tener al menos 6 caracteres.'
        );
    });

    it('should fail with empty email', () => {
        const emptyEmailData = {
            correo: '',
            contrasenia_hash: 'password123',
        };
        expect(() => loginSchema.parse(emptyEmailData)).toThrow(
            'El email no es válido.'
        );
    });

    it('should fail with empty password', () => {
        const emptyPasswordData = {
            correo: 'test@example.com',
            contrasenia_hash: '',
        };
        expect(() => loginSchema.parse(emptyPasswordData)).toThrow(
            'La contraseña debe tener al menos 6 caracteres.'
        );
    });
});
