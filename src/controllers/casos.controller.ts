import { Request, Response } from 'express';
import { isErr } from '../errors/resultUtils';
import { CasoService } from '../services/casos.service';

const casoService = new CasoService();

export class CasoController {
    async createCaso(req: Request, res: Response): Promise<void> {
        const result = await casoService.createCaso(req.body);

        if (isErr(result)) {
            res.status(400).json({ error: result.error.message });
            return;
        }

        res.status(201).json(result.value);
    }

    async getCasos(req: Request, res: Response): Promise<void> {
        const result = await casoService.getCasos();

        if (isErr(result)) {
            res.status(500).json({ error: result.error.message });
            return;
        }

        res.status(200).json(result.value);
    }

    async getCasoById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const result = await casoService.getCasoById(Number(id));

        if (isErr(result)) {
            res.status(500).json({ error: result.error.message });
            return;
        }

        if (!result.value) {
            res.status(404).json({ error: 'Caso no encontrado' });
            return;
        }

        res.status(200).json(result.value);
    }

    async updateCaso(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const result = await casoService.updateCaso(Number(id), req.body);

        if (isErr(result)) {
            res.status(400).json({ error: result.error.message });
            return;
        }

        res.status(200).json(result.value);
    }

    async deleteCaso(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const result = await casoService.deleteCaso(Number(id));

        if (isErr(result)) {
            res.status(500).json({ error: result.error.message });
            return;
        }

        res.status(204).json({
            message: 'Caso eliminado con éxito',
        });
    }
}
