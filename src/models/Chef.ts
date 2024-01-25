import mongoose, { Document, Schema } from 'mongoose';

export interface IChef {
    name: string;
    image: string;
    restaurant: string[];
    info: string;
}

export interface IChefModel extends IChef, Document {}

const chefSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        restaurant: { type: [String], required: true },
        image: { type: String, required: true },
        info: { type: String, required: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IChefModel>('Chef', chefSchema);
