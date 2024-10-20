import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { CasoController } from '../../src/controllers/casos.controller';
import { CasoService } from '../../src/services/casos.service';
import { isErr } from '../../src/errors/resultUtils';

vi.mock('../../src/services/casos.service');
vi.mock('../../src/errors/resultUtils');

describe('CasoController', () => {
    let casoController: CasoController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        casoController = new CasoController();
        req = {};
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
    });

    describe('createCaso', () => {
        it('should return 201 and the created caso', async () => {
            const mockCaso = { id: 1, name: 'Test Caso' };
            (CasoService.prototype.createCaso as any).mockResolvedValue({
                value: mockCaso,
            });
            (isErr as any).mockReturnValue(false);

            req.body = mockCaso;

            await casoController.createCaso(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCaso);
        });

        it('should return 400 if there is an error', async () => {
            const mockError = { error: { message: 'Error' } };
            (CasoService.prototype.createCaso as any).mockResolvedValue(
                mockError
            );
            (isErr as any).mockReturnValue(true);

            req.body = {};

            await casoController.createCaso(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
        });
    });

    describe('getCasos', () => {
        it('should return 200 and the list of casos', async () => {
            const mockCasos = [{ id: 1, name: 'Test Caso' }];
            (CasoService.prototype.getCasos as any).mockResolvedValue({
                value: mockCasos,
            });
            (isErr as any).mockReturnValue(false);

            await casoController.getCasos(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCasos);
        });

        it('should return 500 if there is an error', async () => {
            const mockError = { error: { message: 'Error' } };
            (CasoService.prototype.getCasos as any).mockResolvedValue(
                mockError
            );
            (isErr as any).mockReturnValue(true);

            await casoController.getCasos(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
        });
    });

    describe('getCasoById', () => {
        it('should return 200 and the caso if found', async () => {
            const mockCaso = { id: 1, name: 'Test Caso' };
            (CasoService.prototype.getCasoById as any).mockResolvedValue({
                value: mockCaso,
            });
            (isErr as any).mockReturnValue(false);

            req.params = { id: '1' };

            await casoController.getCasoById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCaso);
        });

        it('should return 404 if the caso is not found', async () => {
            (CasoService.prototype.getCasoById as any).mockResolvedValue({
                value: null,
            });
            (isErr as any).mockReturnValue(false);

            req.params = { id: '1' };

            await casoController.getCasoById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Caso no encontrado',
            });
        });

        it('should return 500 if there is an error', async () => {
            const mockError = { error: { message: 'Error' } };
            (CasoService.prototype.getCasoById as any).mockResolvedValue(
                mockError
            );
            (isErr as any).mockReturnValue(true);

            req.params = { id: '1' };

            await casoController.getCasoById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
        });
    });

    describe('updateCaso', () => {
        it('should return 200 and the updated caso', async () => {
            const mockCaso = { id: 1, name: 'Updated Caso' };
            (CasoService.prototype.updateCaso as any).mockResolvedValue({
                value: mockCaso,
            });
            (isErr as any).mockReturnValue(false);

            req.params = { id: '1' };
            req.body = mockCaso;

            await casoController.updateCaso(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCaso);
        });

        it('should return 400 if there is an error', async () => {
            const mockError = { error: { message: 'Error' } };
            (CasoService.prototype.updateCaso as any).mockResolvedValue(
                mockError
            );
            (isErr as any).mockReturnValue(true);

            req.params = { id: '1' };
            req.body = {};

            await casoController.updateCaso(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
        });
    });

    describe('deleteCaso', () => {
        it('should return 204 if the caso is deleted', async () => {
            (CasoService.prototype.deleteCaso as any).mockResolvedValue({
                value: true,
            });
            (isErr as any).mockReturnValue(false);

            req.params = { id: '1' };

            await casoController.deleteCaso(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Caso eliminado con éxito',
            });
        });

        it('should return 500 if there is an error', async () => {
            const mockError = { error: { message: 'Error' } };
            (CasoService.prototype.deleteCaso as any).mockResolvedValue(
                mockError
            );
            (isErr as any).mockReturnValue(true);

            req.params = { id: '1' };

            await casoController.deleteCaso(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
        });
    });
});
