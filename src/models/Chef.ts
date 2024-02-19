import mongoose, { Document, Schema, Types } from 'mongoose';

interface IChefRestaurant {
    _id: Types.ObjectId['_id'];
}

export interface IChef {
    name: string;
    image: string;
    rating: number;
    date_added: string;
    restaurants: IChefRestaurant[];
    info: string;
}

export interface IChefModel extends IChef, Document {}

const chefSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        rating: { type: Number, required: true },
        date_added: { type: String, required: true },
        restaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant', required: false }],
        info: { type: String, required: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IChefModel>('Chef', chefSchema);
