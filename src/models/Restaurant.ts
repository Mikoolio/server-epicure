import mongoose, { Document, Schema } from 'mongoose';
import { IChef } from './Chef';

interface IRating {
    ratingImg: string;
    ratingNumber: number;
}

export interface IRestaurant {
    name: string;
    chef: IChef;
    openingDate: string;
    openingHours: string;
    rating: IRating;
}

export interface IRestaurantModel extends IRestaurant, Document {}

const RestaurantSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        chef: { type: String, required: true },
        openingDate: { type: String, required: true },
        openingHours: { type: String, required: true },
        rating: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IRestaurantModel>('Chef', RestaurantSchema);
