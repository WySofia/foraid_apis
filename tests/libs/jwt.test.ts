import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../../src/libs/jwt';
import { Payload } from '../../src/types/payload';

describe('createAccessToken', () => {
    const mockPayload: Payload = {
        id_usuario: 1,
        nombre: 'John',
        apellido: 'Doe',
        correo: 'john.doe@example.com',
    };

    const mockToken = 'mocked.jwt.token';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should generate a token successfully', async () => {
        vi.spyOn(jwt, 'sign').mockImplementation(
            (payload, secret, options, callback) => {
                callback(null, mockToken);
            }
        );

        const token = await createAccessToken(mockPayload);
        expect(token).toBe(mockToken);
    });

    it('should reject with an error if jwt.sign fails', async () => {
        vi.spyOn(jwt, 'sign').mockImplementation(
            (payload, secret, options, callback) => {
                callback(new Error('Token generation error'), null);
            }
        );

        await expect(createAccessToken(mockPayload)).rejects.toThrow(
            'Token generation error'
        );
    });

    it('should handle unknown errors when token is null', async () => {
        vi.spyOn(jwt, 'sign').mockImplementation(
            (payload, secret, options, callback) => {
                callback(null, '');
            }
        );

        await expect(createAccessToken(mockPayload)).rejects.toThrow(
            'Error desconocido al crear token'
        );
    });
});
