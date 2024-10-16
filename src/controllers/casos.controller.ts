import { handleControllerError } from '../errors/apiResponseError';
import { isOk } from '../errors/resultUtils';
import {
    createCaso,
    deleteCaso,
    getAllCasos,
    getCasoById,
    updateCaso,
} from '../services/casos.service';
import { Request, Response } from 'express';

export const crearCasoHandler = async (req: Request, res: Response) => {
    const result = await createCaso(req.body);
    if (isOk(result)) {
        res.status(201).json(result.value);
    } else {
        handleControllerError(res, result.error);
    }
};

export const obtenerCasoHandler = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const result = await getCasoById(id);
    if (isOk(result)) {
        res.status(200).json(result.value);
    } else {
        handleControllerError(res, result.error);
    }
};

export const obtenerTodosCasosHandler = async (
    _req: Request,
    res: Response
) => {
    const result = await getAllCasos();
    if (isOk(result)) {
        res.status(200).json(result.value);
    } else {
        handleControllerError(res, result.error);
    }
};

export const actualizarCasoHandler = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const data = { ...req.body, id_caso: id };
    const result = await updateCaso(data);
    if (isOk(result)) {
        res.status(200).json(result.value);
    } else {
        handleControllerError(res, result.error);
    }
};

export const eliminarCasoHandler = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const result = await deleteCaso(id);
    if (isOk(result)) {
        res.status(200).json(result.value);
    } else {
        handleControllerError(res, result.error);
    }
};
