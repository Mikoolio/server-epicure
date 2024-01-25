import mongoose from 'mongoose';
import Restaurant, { IRestaurantModel } from '../models/Restaurant';

const createRestaurant = async (
    name: string,
    chef: string,
    openingDate: string,
    openingHours: string,
    rating: { ratingImg: string; ratingNumber: number }
) => {
    const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        name,
        chef,
        openingDate,
        openingHours,
        rating
    });

    return await restaurant.save();
};

const readRestaurant = async (restaurantId: string) => {
    return await Restaurant.findById(restaurantId).populate('chef');
};

const readAllRestaurants = async () => {
    return await Restaurant.find().populate('chef');
};

const updateRestaurant = async (restaurantId: string, updates: Partial<IRestaurantModel>) => {
    const restaurant = await Restaurant.findById(restaurantId);
    if (restaurant) {
        for (const field in updates) {
            if (field === 'name' || field === 'chef' || field === 'openingDate' || field === 'openingHours' || field === 'rating') {
                restaurant[field] = updates[field] as any;
            }
        }
        return await restaurant.save();
    }
    return null;
};

const deleteRestaurant = async (restaurantId: string) => {
    return await Restaurant.findByIdAndDelete(restaurantId);
};

export default { createRestaurant, readRestaurant, readAllRestaurants, updateRestaurant, deleteRestaurant };
