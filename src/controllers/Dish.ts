import { NextFunction, Request, Response } from 'express';
import dishService from '../services/dishService';

const createDish = async (req: Request, res: Response) => {
    const { name, restaurant, ingredients, price, image, icon } = req.body;
    try {
        const savedDish = await dishService.createDish(name, restaurant, ingredients, price, image, icon);
        res.status(201).json({ dish: savedDish });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readDish = async (req: Request, res: Response) => {
    const dishId = req.params.dishId;
    try {
        const dish = await dishService.readDish(dishId);
        if (dish) {
            res.status(200).json({ dish });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readAllDishes = async (req: Request, res: Response) => {
    try {
        const dishes = await dishService.readAllDishes();
        res.status(200).json({ dishes });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteDish = async (req: Request, res: Response) => {
    const dishId = req.params.dishId;
    try {
        const deletedDish = await dishService.deleteDish(dishId);
        if (deletedDish) {
            res.status(201).json({ dish: deletedDish, message: 'Deleted' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getAllDishesForRestaurant = async (req: Request, res: Response) => {
    const restaurantId = req.params.restaurantId;
    try {
        const dishes = await dishService.getAllDishesForRestaurant(restaurantId);
        res.status(200).json({ dishes });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { createDish, readDish, readAllDishes, deleteDish, getAllDishesForRestaurant };
