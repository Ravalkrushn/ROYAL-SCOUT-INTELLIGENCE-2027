import { Router } from 'express';
import { getPlayers, getPlayerProfile } from '../controllers/playerController.js';
import { comparePlayers } from '../controllers/comparisonController.js';
import { validateRequest } from '../middleware/validate.js';
import { PlayerSearchQuerySchema, PlayerIdParamSchema } from '../validators/index.js';

const router = Router();

// Compare players route (must be before /:id)
router.get('/compare', comparePlayers);

// Player search
router.get('/', validateRequest({ query: PlayerSearchQuerySchema }), getPlayers);

// Individual player profile
router.get('/:id', validateRequest({ params: PlayerIdParamSchema }), getPlayerProfile);

export default router;
