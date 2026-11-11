import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import rankingsRoutes from './rankingsRoutes.js';
import playerRoutes from './playerRoutes.js';
import statsRoutes from './statsRoutes.js';
import methodologyRoutes from './methodologyRoutes.js';
import { getEvidence } from '../controllers/methodologyController.js';

const router = Router();

// Mount Health Check
router.use('/', healthRoutes);

// Mount Business Modules
router.use('/dashboard', dashboardRoutes);
router.use('/rankings', rankingsRoutes);
router.use('/players', playerRoutes);
router.use('/stats', statsRoutes);
router.use('/methodology', methodologyRoutes);
router.get('/evidence', getEvidence);

export default router;
