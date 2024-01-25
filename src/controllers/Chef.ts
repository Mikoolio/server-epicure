import { NextFunction, Request, Response } from 'express';
import chefService from '../services/chefService';

const createChef = async (req: Request, res: Response, next: NextFunction) => {
    const { name, image, restaurant, info } = req.body;
    try {
        const savedChef = await chefService.createChef(name, image, restaurant, info);
        res.status(201).json({ chef: savedChef });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;
    try {
        const chef = await chefService.readChef(chefId);
        if (chef) {
            res.status(200).json({ chef });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readAllChefs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chefs = await chefService.readAllChefs();
        res.status(200).json({ chefs });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;
    try {
        const updatedChef = await chefService.updateChef(chefId, req.body);
        if (updatedChef) {
            res.status(201).json({ chef: updatedChef });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;
    try {
        const deletedChef = await chefService.deleteChef(chefId);
        if (deletedChef) {
            res.status(201).json({ chef: deletedChef, message: 'Deleted' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { createChef, readChef, readAllChefs, updateChef, deleteChef };
