import { Router } from 'express';
import { getBatterStats, getBowlerStats } from '../controllers/statsController.js';
import { validateRequest } from '../middleware/validate.js';
import { PaginationQuerySchema } from '../validators/index.js';

const router = Router();

router.get('/batters', validateRequest({ query: PaginationQuerySchema }), getBatterStats);
router.get('/bowlers', validateRequest({ query: PaginationQuerySchema }), getBowlerStats);

export default router;
