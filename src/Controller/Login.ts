import {  Request, Response  } from 'express';
import jwt from 'jsonwebtoken';
import  User from '../Models/User';
const authConfig = require('../Config/auth');
import  bcrypt from 'bcrypt'


class LoginController {
    
    public async login(req:Request, res:Response):Promise<Response> {

        const {  email, password  } = req.body;

        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({message: "email or password invalid"})
        }

        const checkPassword =  await bcrypt.compare(password, user.password) 
        if(!checkPassword){
            return res.status(401).json({message: 'Incorrect password or email'})
        }

        const {id, name, role} = user;
        const token = jwt.sign({id}, authConfig.SECRET, {
            expiresIn: authConfig.expiresIn
        })

        return res.status(200).json({
            user:{id, email, name, token, role}, 
        });

    }

}

export default new LoginController();