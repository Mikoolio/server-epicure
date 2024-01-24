import { NextFunction, Request, Response } from 'express';
import mongoose, { Mongoose } from 'mongoose';
import Chef from '../models/Chef';

const createChef = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const chef = new Chef({
        _id: new mongoose.Types.ObjectId(),
        name
    });
    return chef
        .save()
        .then((chef) => res.status(201).json({ chef }))
        .catch((error) => {
            res.status(500).json({ error });
        });
};
const readChef = (req: Request, res: Response, next: NextFunction) => {};
const readAllChef = (req: Request, res: Response, next: NextFunction) => {};
const updateChef = (req: Request, res: Response, next: NextFunction) => {};
const deleteChef = (req: Request, res: Response, next: NextFunction) => {};
