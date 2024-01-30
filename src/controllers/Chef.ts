import { NextFunction, Request, Response } from 'express';
import chefService from '../services/chefService';

const createChef = async (req: Request, res: Response, next: NextFunction) => {
    const { name, image, restaurant, info } = req.body;
    try {
        const savedChef = await chefService.createChef(name, image, restaurant, info);
        res.status(201).send({ chef: savedChef });
    } catch (error) {
        next(error);
    }
};

const readChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;
    try {
        const chef = await chefService.readChef(chefId);
        if (chef) {
            console.log(chef);
            res.status(200).send({ chef });
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (error) {
        next(error);
    }
};

const readAllChefs = async (req: Request, res: Response) => {
    try {
        const chefs = await chefService.readAllChefs();
        res.status(200).send({ chefs });
    } catch (error) {
        res.status(500).send({ error });
    }
};

const updateChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;
    try {
        const updatedChef = await chefService.updateChef(chefId, req.body);
        if (updatedChef) {
            res.status(201).send({ chef: updatedChef });
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (error) {
        next(error);
    }
};

const deleteChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;
    try {
        const deletedChef = await chefService.deleteChef(chefId);
        if (deletedChef) {
            res.status(201).send({ chef: deletedChef, message: 'Deleted' });
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (error) {
        next(error);
    }
};

const getChefRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;
    try {
        const restaurants = await chefService.getChefRestaurants(chefId);
        if (restaurants) {
            res.status(200).send({ restaurants });
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (error) {
        next(error);
    }
};

export default { createChef, readChef, readAllChefs, updateChef, deleteChef, getChefRestaurants };
