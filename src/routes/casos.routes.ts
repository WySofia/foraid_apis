import { Router } from 'express';
import { CasoController } from '../controllers/casos.controller';
import { auth } from '../middlewares/auth.middleware';

const casosRouter = Router();
const casoController = new CasoController();

casosRouter.post('/casos', auth, (req, res) =>
    casoController.createCaso(req, res)
);

casosRouter.get('/casos', auth, (req, res) =>
    casoController.getCasos(req, res)
);

casosRouter.get('/casos/:id', auth, (req, res) =>
    casoController.getCasoById(req, res)
);

casosRouter.put('/casos/:id', auth, (req, res) =>
    casoController.updateCaso(req, res)
);

casosRouter.delete('/casos/:id', auth, (req, res) =>
    casoController.deleteCaso(req, res)
);
