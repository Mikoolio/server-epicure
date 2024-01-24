import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Restaurant from '../models/Restaurant';

const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const { name, chef, openingDate, openingHours, rating } = req.body;
    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        name,
        chef,
        openingDate,
        openingHours,
        rating
    });

    try {
        const savedRestaurant = await restaurant.save();
        res.status(201).json({ restaurant: savedRestaurant });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;

    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (restaurant) {
            res.status(200).json({ restaurant });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readAllRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json({ restaurants });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.restaurantId;

    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (restaurant) {
            restaurant.set(req.body);
            const updatedRestaurant = await restaurant.save();
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
        const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
        if (deletedRestaurant) {
            res.status(201).json({ restaurant: deletedRestaurant, message: 'Deleted' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { createRestaurant, readAllRestaurant, readRestaurant, updateRestaurant, deleteRestaurant };
