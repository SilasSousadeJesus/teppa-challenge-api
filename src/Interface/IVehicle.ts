import { ObjectId } from "mongodb";

export interface IVehicle   {
    name: string;
    description: string;
    plate: string;
    isFavorite: boolean;
    year: number;
    color: string;
    price: number;
    user_id: ObjectId;
    createdAt: Date;
}
