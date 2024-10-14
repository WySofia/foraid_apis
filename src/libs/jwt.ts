import jwt from 'jsonwebtoken';
import { Payload } from '../types/payload';
import { handleError } from '../errors/errorUtils';

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'secret';

export async function createAccessToken(payload: Payload): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) reject(err);
            if (token) {
                resolve(token);
            } else {
                reject(
                    handleError(
                        'UnknownError',
                        'Error desconocido al crear token'
                    )
                );
            }
        });
    });
}
