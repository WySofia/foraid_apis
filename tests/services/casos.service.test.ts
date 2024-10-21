import { describe, it, expect, vi } from 'vitest';
import { prisma } from '../../src/db';
import { CasoService } from '../../src/services/casos.service';
import { err, ok } from '../../src/errors/result';
import { isErr } from '../../src/errors/resultUtils';
describe('CasoService', () => {
    const casoService = new CasoService();

    beforeEach(() => {
        vi.mock('../../src/db', () => ({
            prisma: {
                casos: {
                    create: vi.fn(),
                    findMany: vi.fn(),
                    findUnique: vi.fn(),
                    update: vi.fn(),
                    delete: vi.fn(),
                },
            },
        }));
    });

    it('should create a caso successfully', async () => {
        const mockData = {
            id_usuario: 1,
            titulo: 'Caso de prueba',
            id_tipo_caso: 2,
        };
        prisma.casos.create.mockResolvedValue(mockData);

        const result = await casoService.createCaso(mockData);

        expect(result).toEqual(ok(mockData));
    });

    it('should return an error when createCaso fails due to validation', async () => {
        const invalidData = {};

        const result = await casoService.createCaso(invalidData);

        expect(result).toEqual(
            err({
                tag: 'ValidationError',
                message: expect.any(String),
                field: expect.any(String),
            })
        );
    });

    it('should get all casos successfully', async () => {
        const mockCasos = [{}, {}];
        prisma.casos.findMany.mockResolvedValue(mockCasos);

        const result = await casoService.getCasos();

        expect(result).toEqual(ok(mockCasos));
    });

    it('should return a single caso by ID', async () => {
        const mockCaso = {};
        prisma.casos.findUnique.mockResolvedValue(mockCaso);

        const result = await casoService.getCasoById(1);

        expect(result).toEqual(ok(mockCaso));
    });

    it('should return null if no caso is found by ID', async () => {
        prisma.casos.findUnique.mockResolvedValue(null);

        const result = await casoService.getCasoById(999);

        expect(result).toEqual(ok(null));
    });

    it('should update a caso successfully', async () => {
        const updatedCaso = {
            id_usuario: 1,
            titulo: 'Caso actualizado',
            id_tipo_caso: 2,
        };
        prisma.casos.update.mockResolvedValue(updatedCaso);

        const result = await casoService.updateCaso(1, updatedCaso);

        expect(result).toEqual(ok(updatedCaso));
    });

    it('should delete a caso successfully', async () => {
        const deletedCaso = {};
        prisma.casos.delete.mockResolvedValue(deletedCaso);

        const result = await casoService.deleteCaso(1);

        expect(result).toEqual(ok(deletedCaso));
    });
});
