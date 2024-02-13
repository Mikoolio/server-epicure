import { NextFunction, Request, Response } from 'express';
import restaurantService from '../services/restaurantService';

const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const { name, chef, openingDate, openingHours, rating } = req.body;
    try {
        const savedRestaurant = await restaurantService.createRestaurant(name, chef, openingDate, openingHours, rating);
        res.status(201).send({ restaurant: savedRestaurant });
    } catch (error) {
        next(error);
    }
};

const readRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;
    try {
        const restaurant = await restaurantService.readRestaurant(restaurantId);
        if (restaurant) {
            res.status(200).send({ restaurant });
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (error) {
        next(error);
    }
};
const readAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filterBy = req.query.filterBy as string;
        const offset = parseInt(req.query.offset as string) || 0;
        const limit = parseInt(req.query.limit as string) || 12;
        const restaurants = await restaurantService.readAllRestaurants(filterBy, offset, limit);
        res.status(200).send({ restaurants });
    } catch (error) {
        next(error);
    }
};

const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;
    try {
        const updatedRestaurant = await restaurantService.updateRestaurant(restaurantId, req.body);
        if (updatedRestaurant) {
            res.status(201).send({ restaurant: updatedRestaurant });
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (error) {
        next(error);
    }
};

const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;
    try {
        const deletedRestaurant = await restaurantService.deleteRestaurant(restaurantId);
        if (deletedRestaurant) {
            res.status(201).send({ restaurant: deletedRestaurant, message: 'Deleted' });
        } else {
            res.status(404).send({ message: 'Not found' });
        }
    } catch (error) {
        next(error);
    }
};

export default { createRestaurant, readAllRestaurants, readRestaurant, updateRestaurant, deleteRestaurant };
