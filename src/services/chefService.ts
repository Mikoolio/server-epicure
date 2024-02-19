import mongoose from 'mongoose';
import Chef, { IChefModel } from '../models/Chef';

const createChef = async (name: string, image: string, restaurants: string[], info: string, rating: number, date_added: string) => {
    const chef = new Chef({
        _id: new mongoose.Types.ObjectId(),
        name,
        image,
        rating,
        date_added,
        restaurants,
        info
    });

    return await chef.save();
};

const readChef = async (chefId: string) => {
    return await Chef.findById(chefId);
};

const readAllChefs = async (filterBy: string) => {
    const criteria = _buildCriteria(filterBy);
    return await Chef.find(criteria);
};

const updateChef = async (chefId: string, updates: Partial<IChefModel>) => {
    const chef = await Chef.findById(chefId);
    if (chef) {
        for (const field in updates) {
            if (
                field === 'name' ||
                field === 'image' ||
                field === 'restaurants' ||
                field === 'info' ||
                field === 'rating' ||
                field === 'date_added'
            ) {
                (chef as any)[field] = updates[field];
            }
        }
        return await chef.save();
    }
    return null;
};

const deleteChef = async (chefId: string) => {
    return await Chef.findByIdAndDelete(chefId);
};

const getChefRestaurants = async (chefId: string) => {
    const chef = await Chef.findById(chefId);
    if (chef) {
        return chef.restaurants;
    }
    return null;
};

const _buildCriteria = (filterBy: string) => {
    const lastYear = new Date().getFullYear() - 1;

    switch (filterBy) {
        case 'New':
            return {
                $expr: {
                    $eq: [
                        {
                            $year: {
                                $dateFromString: {
                                    dateString: '$date_added',
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
                rating: { $gte: 4, $lte: 5 }
            };

        default:
            return {};
    }
};

export default { createChef, readChef, readAllChefs, updateChef, deleteChef, getChefRestaurants };
