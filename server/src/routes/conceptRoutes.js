import { Router } from 'express';

import { conceptById, listConcepts } from '../controllers/conceptController.js';

const router = Router();

router.get('/', listConcepts);
router.get('/:id', conceptById);

export default router;

