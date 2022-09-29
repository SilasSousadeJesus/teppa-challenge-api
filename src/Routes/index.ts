import { Router } from 'express';
import vehicleRoutes from './vehicleRoutes';
import userRoutes from './userRoutes';


const router = Router();

router.use(userRoutes)
router.use(vehicleRoutes)


export default router