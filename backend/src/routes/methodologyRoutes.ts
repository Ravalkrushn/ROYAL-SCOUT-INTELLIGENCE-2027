import { Router } from 'express';
import { getMethodology, getEvidence } from '../controllers/methodologyController.js';

const router = Router();

router.get('/', getMethodology);
router.get('/evidence', getEvidence);

export default router;
