import express from 'express';
import controller from '../controllers/Dish';
import { ValidateSchema, dishCreateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(dishCreateSchema), controller.createDish);
router.get('/:dishId', controller.readDish);
router.get('/', controller.readAllDishes);
router.get('/:restaurantId/dishes', controller.getDishesByRestaurantId);
router.delete('/:dishId', controller.deleteDish);

export = router;
