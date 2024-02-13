import express from 'express';
import controller from '../controllers/Chef';
import { ValidateSchema, chefCreateSchema, chefUpdateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(chefCreateSchema), controller.createChef);
router.get('/:chefId', controller.readChef);
router.get('/', controller.readAllChefs);
router.get('/:chefId/restaurants', controller.getChefRestaurants);
router.patch('/:chefId', ValidateSchema(chefUpdateSchema), controller.updateChef);
router.delete('/:chefId', controller.deleteChef);

export = router;
