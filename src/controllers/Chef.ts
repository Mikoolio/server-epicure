import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Chef from '../models/Chef';

const createChef = async (req: Request, res: Response, next: NextFunction) => {
    const { name, image, info } = req.body;
    const chef = new Chef({
        _id: new mongoose.Types.ObjectId(),
        name,
        image,
        info
    });

    try {
        const savedChef = await chef.save();
        res.status(201).json({ chef: savedChef });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;

    try {
        const chef = await Chef.findById(chefId);
        if (chef) {
            res.status(200).json({ chef });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const readAllChef = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chefs = await Chef.find();
        res.status(200).json({ chefs });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;

    try {
        const chef = await Chef.findById(chefId);
        if (chef) {
            chef.set(req.body);
            const updatedChef = await chef.save();
            res.status(201).json({ chef: updatedChef });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteChef = async (req: Request, res: Response, next: NextFunction) => {
    const chefId = req.params.chefId;

    try {
        const deletedChef = await Chef.findByIdAndDelete(chefId);
        if (deletedChef) {
            res.status(201).json({ chef: deletedChef, message: 'Deleted' });
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default { createChef, readAllChef, readChef, updateChef, deleteChef };
