import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import { IChef } from '../models/Chef';
import { IRestaurant } from '../models/Restaurant';
import { IDishModel } from '../models/Dish';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).send({ error });
        }
    };
};

export const chefCreateSchema: ObjectSchema = Joi.object<IChef>({
    name: Joi.string().required().min(3).max(50),
    image: Joi.string().uri().allow(''),
    restaurants: Joi.array().items(Joi.string()),
    info: Joi.string().allow('')
});

export const chefUpdateSchema: ObjectSchema = Joi.object<IChef>({
    name: Joi.string().required().min(3).max(50),
    image: Joi.string().uri().allow(''),
    restaurants: Joi.array().items(Joi.string()),
    info: Joi.string().allow('')
});

export const restaurantCreateSchema: ObjectSchema = Joi.object<IRestaurant>({
    name: Joi.string().required().min(3).max(50),
    chef: Joi.string().required(),
    openingDate: Joi.string().required().isoDate(),
    openingHours: Joi.string().required(),
    rating: Joi.object({
        ratingImg: Joi.string().uri(),
        ratingNumber: Joi.number().min(0).max(5)
    }).required()
});

export const restaurantUpdateSchema: ObjectSchema = Joi.object<IRestaurant>({
    name: Joi.string().required().min(3).max(50),
    chef: Joi.string().required(),
    openingDate: Joi.string().required().isoDate(),
    openingHours: Joi.string().required(),
    rating: Joi.object({
        ratingImg: Joi.string().uri(),
        ratingNumber: Joi.number().min(0).max(5)
    }).required()
});

export const dishCreateSchema: ObjectSchema = Joi.object<IDishModel>({
    name: Joi.string().required().min(3).max(50),
    restaurant_id: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    price: Joi.number().required().min(0),
    image: Joi.string().required().uri(),
    icon: Joi.string().required().uri()
});
