import mongoose from 'mongoose';
import Dish from '../models/Dish';

const createDish = async (name: string, restaurant: string, ingredients: string[], price: number, image: string, icon: string) => {
    const dish = new Dish({
        _id: new mongoose.Types.ObjectId(),
        name,
        restaurant,
        ingredients,
        price,
        image,
        icon
    });

    return await dish.save();
};

const readDish = async (dishId: string) => {
    return await Dish.findById(dishId);
};

const readAllDishes = async () => {
    return await Dish.find();
};

const deleteDish = async (dishId: string) => {
    return await Dish.findByIdAndDelete(dishId);
};

const getAllDishesForRestaurant = async (restaurantId: string) => {
    return await Dish.find({ restaurant: new mongoose.Types.ObjectId(restaurantId) });
};

export default { createDish, readDish, readAllDishes, deleteDish, getAllDishesForRestaurant };
