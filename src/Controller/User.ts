import {  Request, Response  } from 'express';
import Vehicle from "../Models/Vehicle";
import { IVehicle } from "../Interface/IVehicle";
import jwt from 'jsonwebtoken';
import  User from '../Models/User';
const authConfig = require('../Config/auth');


class UserController {


public async registration(req: Request, res:Response):Promise<Response> {
   
    try {
            
        const {name, email, password} = req.body;
    
        if ( 
            name === "" ||
            name === undefined ||
            name === null ||
            email === "" ||
            email === undefined ||
            email === null ||
            password === "" ||
            password === undefined ||
            password === null             
          ) {
            return res.status(401).json({ message: "required field empty" });
          }
        const userFind = await User.findOne({email})

        if(userFind){
            return res
            .status(422)
            .json({message: `User ${email} already exists.`})
        }
        const role = 'customer'
        const newUser = await User.create({name, email, password, role});

        return res.status(200).json(newUser)

        } catch (error) {
           return res
           .status(400)
           .json({message:"Erro no servidor, tente mais tarde"})
        }
}
public async teste(req: Request, res:Response):Promise<Response> {
    return res.json({message:"testando heroku"})
}
public async ediUser(req: Request, res:Response):Promise<Response> {
    try {
        const {id} = req.params;
        const {name, email} = req.body;

        const userFind = await User.findOne({email})

        if(userFind){
            return res
            .status(422)
            .json({message: `User ${email} already exists.`})
        }

        const user = await User.findByIdAndUpdate(id, {
            name,
            email
          });

        const updateUser = await User.findById(id)

        const role = updateUser!.role
    
        const token = jwt.sign({id}, authConfig.SECRET, {
            expiresIn: authConfig.expiresIn
        })

        return res.status(200).json({
            user:{id, email, name, token, role}, 
        })

    } catch (error) {
        return res.status(400).json({message: 'unauthorized action'})
    }
}
public async deleteUser(req: Request, res:Response):Promise<Response> {
    try {
        const {id} = req.params;
        const vehicles: IVehicle[] = await Vehicle.find({ user_id: id });
        
        if(vehicles){
             await Vehicle.deleteMany({user_id:id})
             await User.findByIdAndDelete(id);
             return res.status(200).json({message: 'deleted user'})
        }
        
        await User.findByIdAndDelete(id);

        return res.status(200).json({message: 'deleted user'})
    } catch (error) {
        return res.status(401).json({message: 'unauthorized action'})
    }
}






}


export default new UserController();