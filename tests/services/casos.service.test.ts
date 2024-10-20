import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../src/db';
import { CasoService } from '../../src/services/casos.service';
import { isErr, isOk } from '../../src/errors/resultUtils';

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

describe('CasoService', () => {
    let casoService: CasoService;

    beforeEach(() => {
        casoService = new CasoService();
        vi.clearAllMocks();
    });

    // it('should create a caso successfully', async () => {
    //     const mockData = {};
    //     const mockCaso = { id_caso: 1 };
    //     (prisma.casos.create as vi.Mock).mockResolvedValue(mockCaso);

    //     const result = await casoService.createCaso(mockData);

    //     expect(isOk(result)).toBe(true);
    //     if (isOk(result)) {
    //         expect(result.value).toEqual(mockCaso);
    //     }
    // });

    it('should return validation error when creating a caso with invalid data', async () => {
        const invalidData = {};

        const result = await casoService.createCaso(invalidData);

        expect(isErr(result)).toBe(true);
        if (isErr(result)) {
            expect(result.error.tag).toBe('ValidationError');
        }
    });

    it('should get all casos successfully', async () => {
        const mockCasos = [{ id_caso: 1 }];
        (prisma.casos.findMany as vi.Mock).mockResolvedValue(mockCasos);

        const result = await casoService.getCasos();

        expect(isOk(result)).toBe(true);
        if (isOk(result)) {
            expect(result.value).toEqual(mockCasos);
        }
    });

    it('should get a caso by id successfully', async () => {
        const mockCaso = { id_caso: 1 };
        (prisma.casos.findUnique as vi.Mock).mockResolvedValue(mockCaso);

        const result = await casoService.getCasoById(1);

        expect(isOk(result)).toBe(true);
        if (isOk(result)) {
            expect(result.value).toEqual(mockCaso);
        }
    });

    // it('should update a caso successfully', async () => {
    //     const mockData = {
    //         /* valid data according to CasosSchema */
    //     };
    //     const mockCaso: Casos = { id_caso: 1 /* other fields */ };
    //     (prisma.casos.update as vi.Mock).mockResolvedValue(mockCaso);

    //     const result = await casoService.updateCaso(1, mockData);

    //     expect(isOk(result)).toBe(true);
    //     if (isOk(result)) {
    //         expect(result.value).toEqual(mockCaso);
    //     }
    // });

    it('should delete a caso successfully', async () => {
        const mockCaso = { id_caso: 1 };
        (prisma.casos.delete as vi.Mock).mockResolvedValue(mockCaso);

        const result = await casoService.deleteCaso(1);

        expect(isOk(result)).toBe(true);
        if (isOk(result)) {
            expect(result.value).toEqual(mockCaso);
        }
    });
});
