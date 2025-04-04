import { Router } from 'express';  
import { getIndex, getPing, testDB } from '../controllers/index.controllers.js';

const router = Router();

router.get('/', getIndex);
router.get('/ping', getPing);
router.get('/test-db', testDB);

export default router;

