import mongoose from 'mongoose';
import Dish, { IDishModel } from '../models/Dish';

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

const getDishesByRestaurantId = async (restaurantId: string): Promise<IDishModel[]> => {
    const dishes = await Dish.find({ restaurant_id: restaurantId }).exec();
    return dishes;
};

export default { createDish, readDish, readAllDishes, deleteDish, getDishesByRestaurantId };
