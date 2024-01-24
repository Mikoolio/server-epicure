import express from 'express';
import controller from '../controllers/Chef';

const router = express.Router();

router.post('/', controller.createChef);
router.get('/:chefId', controller.readChef);
router.get('/', controller.readAllChef);
router.patch('/:chefId', controller.updateChef);
router.delete('/:chefId', controller.deleteChef);

export = router;
