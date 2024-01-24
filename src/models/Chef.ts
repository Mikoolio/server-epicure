import mongoose, { Document, Schema } from 'mongoose';

export interface IChef {
    name: string;
}

export interface IChefModel extends IChef, Document {}

const ChefSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IChefModel>('Chef', ChefSchema);
