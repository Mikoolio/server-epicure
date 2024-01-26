import express from 'express';
import controller from '../controllers/Dish';

const router = express.Router();

router.post('/', controller.createDish);
router.get('/:dishId', controller.readDish);
router.get('/', controller.readAllDishes);
router.get('/restaurantId/dishes', controller.getAllDishesForRestaurant);
router.delete('/:dishId', controller.deleteDish);

export = router;
