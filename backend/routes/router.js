import {Router} from "express";
import {methods as routerMethods} from '../controllers/controller.js';

const router = Router();

router.get('/', routerMethods.getAllPlans);
router.get('/plans', routerMethods.getPlan);

export default router;