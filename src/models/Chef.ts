import mongoose, { Document, Schema, Types } from 'mongoose';

interface IChefRestaurant {
    res_name: string;
    _id: Types.ObjectId['_id'];
}

export interface IChef {
    name: string;
    image: string;
    restaurants: IChefRestaurant[];
    info: string;
}

export interface IChefModel extends IChef, Document {}

const chefSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        restaurants: [
            {
                res_name: { type: String, required: true },
                _id: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true }
            }
        ],
        info: { type: String, required: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IChefModel>('Chef', chefSchema);
