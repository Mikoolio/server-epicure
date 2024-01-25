import mongoose from 'mongoose';
import Chef, { IChefModel } from '../models/Chef';

const createChef = async (name: string, image: string, restaurant: string[], info: string) => {
    const chef = new Chef({
        _id: new mongoose.Types.ObjectId(),
        name,
        image,
        restaurant,
        info
    });

    return await chef.save();
};

const readChef = async (chefId: string) => {
    return await Chef.findById(chefId);
};

const readAllChefs = async () => {
    return await Chef.find();
};

const updateChef = async (chefId: string, updates: Partial<IChefModel>) => {
    const chef = await Chef.findById(chefId);
    if (chef) {
        for (const field in updates) {
            if (field === 'name' || field === 'image' || field === 'restaurant' || field === 'info') {
                chef[field] = updates[field] as any;
            }
        }
        return await chef.save();
    }
    return null;
};

const deleteChef = async (chefId: string) => {
    return await Chef.findByIdAndDelete(chefId);
};

export default { createChef, readChef, readAllChefs, updateChef, deleteChef };
