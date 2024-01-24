import express from 'express';
import controller from '../controllers/Chef';

const router = express.Router();

router.post('/create', controller.createChef);
router.get('/get/:chefId', controller.readChef);
router.get('/get', controller.readAllChef);
router.patch('/update/:chefId', controller.updateChef);
router.delete('/delete/:chefId', controller.deleteChef);

export = router;
