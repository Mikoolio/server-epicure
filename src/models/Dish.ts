import mongoose, { Document, Schema } from 'mongoose';
import { IRestaurantModel } from './Restaurant';

export interface IDish {
    name: string;
    restaurant_id: IRestaurantModel['_id'];
    ingredients: string[];
    price: number;
    image: string;
    icon: string;
}

export interface IDishModel extends IDish, Document {}

const dishSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        restaurant_id: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
        ingredients: { type: [String], required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        icon: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IDishModel>('Dish', dishSchema);
