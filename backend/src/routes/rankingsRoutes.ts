import { Router } from 'express';
import { getTop10Batters, getTop10Bowlers } from '../controllers/rankingsController.js';

const router = Router();

router.get('/batters/top10', getTop10Batters);
router.get('/bowlers/top10', getTop10Bowlers);

export default router;
