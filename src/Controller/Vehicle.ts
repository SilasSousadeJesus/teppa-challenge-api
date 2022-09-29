import { Request, Response } from "express";
import { IVehicle } from "../Interface/IVehicle";
import Vehicle from "../Models/Vehicle";

class VehicleController {
  public async createVehicle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const {
        name,
        description,
        plate,
        year,
        color,
        price,
      } = req.body;

      if ( 
        name === "" ||
        name === undefined ||
        name === null ||
        description === "" ||
        description === undefined ||
        description === null ||
        plate === "" ||
        plate === undefined ||
        plate === null ||
        year === "" ||
        year === undefined ||
        year === null ||
        color === "" ||
        color === undefined ||
        color === null ||
        price === "" ||
        price === undefined ||
        price === null
      ) {
        return res.status(400).json({ message: "required field empty" });
      }

      const vehicle = await Vehicle.create({
        name,
        description,
        plate,
        year,
        color,
        price,
        user_id: id,
      });

      return res.status(200).json({ message: "vehicle created", vehicle });
    } catch (error) {
      return res.status(400).json({message:"Erro no servidor, tente mais tarde"})
    }
  }

  public async listVehicle(req: Request, res: Response): Promise<Response> {
    try {
      const { q } = req.query;
      const { id } = req.params;

      if (!q) {
        const vehicles: IVehicle[] = await Vehicle.find({ user_id: id });
        return res.status(200).json(vehicles);
      }

      const search = [
        { name: { $regex: `${q}`, $options: "i" } },
        { description: { $regex: `${q}`, $options: "i" } },
        { plate: { $regex: `${q}`, $options: "i" } },
        { color: { $regex: `${q}`, $options: "i" } },
      ];

      const queryVehicles = await Vehicle.find({ $or: search , user_id: id});
      if (queryVehicles.length === 0) {
        return res.json([]);
      }

      return res.status(200).json(queryVehicles);
    } catch (error) {
      return res.status(400).json({message:"Erro no servidor, tente mais tarde"})
    }
  }

  public async findVehicle(req: Request, res: Response): Promise<Response>{
    try {
      const { vehicle_id } = req.params;

      const vehicle = await Vehicle.findById(vehicle_id);

      return res.status(200).json(vehicle);
      
    } catch (error) {
      return res.status(400).json({message:"Erro no servidor, tente mais tarde"})
    }
  }

  public async editVehicle(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name,
        description,
        plate,
        year,
        color,
        price,
      } = req.body;

      const { id, vehicle_id } = req.params;

      await Vehicle.findByIdAndUpdate(vehicle_id, {
        name,
        description,
        plate,
        year,
        color,
        price,
      });

      const validatingUser = await Vehicle.find({_id: vehicle_id, user_id: id})
      if(!validatingUser){
        return res.status(401).json({ message: "unauthorized user" });
      }

      return res.status(200).json({ message: "Vehicle updated successfully" });
    } catch (error) {
        return res.status(401).json({ message: "unauthorized user" });
    }
  }

  public async deleteVehicle(req: Request, res: Response): Promise<Response> {
    try {
      const { id, vehicle_id } = req.params;

      const validatingUser = await Vehicle.find({_id: vehicle_id, user_id: id})
      if(!validatingUser){
        return res.status(401).json({ message: "unauthorized user" });
      }
      await Vehicle.findByIdAndDelete(vehicle_id);

      return res.status(200).json({ message: "deleted user" });
    } catch (error) {
        return res.status(401).json({ message: "unauthorized user" });
    }
  }

  public async isFavorite(req: Request, res: Response): Promise<Response> {
    try {
      const { isFavorite } = req.body;
      const { id, vehicle_id } = req.params;

      const validatingUser = await Vehicle.find({_id: vehicle_id, user_id: id})
      if(!validatingUser){
        return res.status(401).json({ message: "unauthorized user" });
      }

      await Vehicle.findByIdAndUpdate(vehicle_id, { isFavorite: isFavorite });
      return res.status(200).json({ message: "favorite vehicle" });
    } catch (error) {
        return res.status(401).json({ message: "unauthorized user" });
    }
  }
}

export default new VehicleController();
