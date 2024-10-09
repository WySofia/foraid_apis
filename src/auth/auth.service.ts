import { prisma } from '../prisma';
import { hashPassword, verifyPassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { User } from '@prisma/client';

interface RegisterInput {
    nombre: string;
    apellido: string;
    correo: string;
    contrasenia: string;
}

interface LoginInput {
    correo: string;
    contrasenia: string;
}

export const register = async (input: RegisterInput): Promise<User> => {
    const { nombre, apellido, correo, contrasenia } = input;
    const hashedPassword = await hashPassword(contrasenia);

    return prisma.usuario.create({
        data: {
            nombre,
            apellido,
            correo,
            contrasenia_hash: hashedPassword,
        },
    });
};

export const login = async (input: LoginInput): Promise<string> => {
    const { correo, contrasenia } = input;

    const user = await prisma.usuario.findUnique({ where: { correo } });

    if (!user || !(await verifyPassword(contrasenia, user.contrasenia_hash))) {
        throw new Error('Invalid credentials');
    }

    return generateToken(user.id_usuario);
};
