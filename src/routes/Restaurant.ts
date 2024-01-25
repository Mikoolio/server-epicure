import express from 'express';
import controller from '../controllers/Restaurant';

const router = express.Router();

router.post('/', controller.createRestaurant);
router.get('/:restaurantId', controller.readRestaurant);
router.get('/', controller.readAllRestaurants);
router.patch('/:restaurantId', controller.updateRestaurant);
router.delete('/:restaurantId', controller.deleteRestaurant);

export = router;
