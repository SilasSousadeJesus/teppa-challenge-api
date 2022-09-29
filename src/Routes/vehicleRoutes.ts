import { Router } from 'express';
import VehicleController from '../Controller/Vehicle';
const router = Router();
    router.post('/createVehicle/:id', VehicleController.createVehicle);
    router.get('/listVehicle/:id', VehicleController.listVehicle);
    router.get('/findVehicle/:vehicle_id', VehicleController.findVehicle);
    router.put('/:id/:vehicle_id', VehicleController.editVehicle)
    router.put('/isfavorite/:id/:vehicle_id', VehicleController.isFavorite)
    router.delete('/:id/:vehicle_id', VehicleController.deleteVehicle)

export default router