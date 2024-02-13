import express from 'express';
import controller from '../controllers/Restaurant';
import { ValidateSchema, restaurantCreateSchema, restaurantUpdateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(restaurantCreateSchema), controller.createRestaurant);
router.get('/:restaurantId', controller.readRestaurant);
router.get('/', controller.readAllRestaurants);
router.patch('/:restaurantId', ValidateSchema(restaurantUpdateSchema), controller.updateRestaurant);
router.delete('/:restaurantId', controller.deleteRestaurant);

export = router;
