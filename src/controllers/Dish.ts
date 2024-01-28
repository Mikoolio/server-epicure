import { NextFunction, Request, Response } from 'express';
import dishService from '../services/dishService';
import mongoose from 'mongoose';

const createDish = async (req: Request, res: Response, next: NextFunction) => {
    const { name, restaurant, ingredients, price, image, icon } = req.body;
    try {
        const savedDish = await dishService.createDish(name, restaurant, ingredients, price, image, icon);
        res.status(201).json({ dish: savedDish });
    } catch (error) {
        next(error);
    }
};

const readDish = async (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;
    try {
        const dish = await dishService.readDish(dishId);
        if (dish) {
            res.status(200).json({ dish });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        next(error);
    }
};

const readAllDishes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dishes = await dishService.readAllDishes();
        res.status(200).json({ dishes });
    } catch (error) {
        next(error);
    }
};

const deleteDish = async (req: Request, res: Response, next: NextFunction) => {
    const dishId = req.params.dishId;
    try {
        const deletedDish = await dishService.deleteDish(dishId);
        if (deletedDish) {
            res.status(201).json({ dish: deletedDish, message: 'Deleted' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        next(error);
    }
};

const getDishesByRestaurantId = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;
    try {
        const dishes = await dishService.getDishesByRestaurantId(restaurantId);
        res.status(200).json({ dishes });
    } catch (error) {
        console.error('Error getting dishes:', error);
        next(error);
    }
};

export default { createDish, readDish, readAllDishes, deleteDish, getDishesByRestaurantId };
