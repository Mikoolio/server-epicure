import mongoose, { Document, Schema } from 'mongoose';
import { IChef, IChefModel } from './Chef';

interface IRating {
    ratingImg: string;
    ratingNumber: number;
}

export interface IRestaurant {
    name: string;
    chef: IChef | IChefModel['_id'];
    openingDate: string;
    openingHours: string;
    rating: IRating;
}

export interface IRestaurantModel extends IRestaurant, Document {}

const RestaurantSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        chef: { type: Schema.Types.ObjectId, ref: 'Chef', required: true },
        openingDate: { type: String, required: true },
        openingHours: { type: String, required: true },
        rating: {
            ratingImg: { type: String, required: true },
            ratingNumber: { type: Number, required: true }
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IRestaurantModel>('Restaurant', RestaurantSchema);
