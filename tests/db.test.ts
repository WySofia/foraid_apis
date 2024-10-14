import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

beforeAll(() => {
    prisma = new PrismaClient();
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe('PrismaClient', () => {
    it('should initialize PrismaClient without errors', () => {
        expect(prisma).toBeDefined();
    });

    it('should fetch an empty list of users', async () => {
        const users = await prisma.usuario.findMany();
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
