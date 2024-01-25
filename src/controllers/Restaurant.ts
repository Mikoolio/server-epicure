import { NextFunction, Request, Response } from 'express';
import restaurantService from '../services/restaurantService';

const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const { name, chef, openingDate, openingHours, rating } = req.body;
    try {
        const savedRestaurant = await restaurantService.createRestaurant(name, chef, openingDate, openingHours, rating);
        res.status(201).json({ restaurant: savedRestaurant });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;
    try {
        const restaurant = await restaurantService.readRestaurant(restaurantId);
        if (restaurant) {
            res.status(200).json({ restaurant });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurants = await restaurantService.readAllRestaurants();
        res.status(200).json({ restaurants });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;
    try {
        const updatedRestaurant = await restaurantService.updateRestaurant(restaurantId, req.body);
        if (updatedRestaurant) {
            res.status(201).json({ restaurant: updatedRestaurant });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;
    try {
        const deletedRestaurant = await restaurantService.deleteRestaurant(restaurantId);
        if (deletedRestaurant) {
            res.status(201).json({ restaurant: deletedRestaurant, message: 'Deleted' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { createRestaurant, readAllRestaurants, readRestaurant, updateRestaurant, deleteRestaurant };
