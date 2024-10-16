import { Router } from 'express';
import {
    crearCasoHandler,
    obtenerCasoHandler,
    obtenerTodosCasosHandler,
    actualizarCasoHandler,
    eliminarCasoHandler,
} from '../controllers/casos.controller';

export const casosRouter = Router();

casosRouter.post('/', crearCasoHandler);
casosRouter.get('/', obtenerTodosCasosHandler);
casosRouter.get('/:id', obtenerCasoHandler);
casosRouter.put('/:id', actualizarCasoHandler);
casosRouter.delete('/:id', eliminarCasoHandler);
