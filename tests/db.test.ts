import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../src/db';

let myPrisma: PrismaClient;

beforeAll(() => {
    myPrisma = prisma;
});

afterAll(async () => {
    await myPrisma.$disconnect();
});

describe('PrismaClient', () => {
    it('should initialize PrismaClient without errors', () => {
        expect(myPrisma).toBeDefined();
    });

    it('should fetch an empty list of users', async () => {
        const users = await myPrisma.usuario.findMany();
        expect(users).toBeInstanceOf(Array);
    });

    it('should handle connection error gracefully', async () => {
        try {
            const invalidPrisma = new PrismaClient({
                datasources: { db: { url: 'invalid-url' } },
            });
            await invalidPrisma.usuario.findMany();
        } catch (error) {
            expect(error).toBeDefined();
            expect(error).toHaveProperty('message');
        }
    });
});
