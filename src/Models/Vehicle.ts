import mongoose, { model, Schema, Document } from "mongoose";
import { IVehicle } from "../Interface/IVehicle";

interface VehicleModel extends IVehicle, Document {}

const VehicleSchema = new Schema<VehicleModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  plate: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model<VehicleModel>("Vehicle", VehicleSchema);
