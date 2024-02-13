import mongoose from 'mongoose';
import Restaurant, { IRestaurantModel } from '../models/Restaurant';
import Chef from '../models/Chef';

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
    return await Restaurant.findById(restaurantId);
};

const readAllRestaurants = async (filterBy: string, offset: number, limit: number) => {
    const criteria = _buildCriteria(filterBy);
    const restaurants = await Restaurant.find(criteria).skip(offset).limit(limit).populate('chef', 'name');
    return restaurants;
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

const _buildCriteria = (filterBy: string) => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    switch (filterBy) {
        case 'Open Now':
            const specificHours = ['14:00', '20:00'];
            return {
                $expr: {
                    $let: {
                        vars: {
                            opening_hours: {
                                $split: ['$opening_hours', ' - ']
                            }
                        },
                        in: {
                            $and: [
                                {
                                    $gte: [currentTime, specificHours[0]]
                                },
                                {
                                    $lte: [currentTime, specificHours[1]]
                                }
                            ]
                        }
                    }
                }
            };

        case 'New':
            return {
                $expr: {
                    $eq: [
                        {
                            $year: {
                                $dateFromString: {
                                    dateString: '$opening_date',
                                    format: '%Y-%m-%d'
                                }
                            }
                        },
                        lastYear
                    ]
                }
            };

        case 'Most Popular':
            return {
                'rating.number': 5
            };

        default:
            return {};
    }
};

export default { createRestaurant, readRestaurant, readAllRestaurants, updateRestaurant, deleteRestaurant };
