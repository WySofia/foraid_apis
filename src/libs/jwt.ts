import jwt from 'jsonwebtoken';

export const TOKEN_SECRET = process.env.JWT_SECRET ?? 'tu_clave_secreta';

export const createAccessToken = (payload: object): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err || !token) {
                reject(err || new Error('Error desconocido al crear token'));
            } else {
                resolve(token);
            }
        });
    });
};
