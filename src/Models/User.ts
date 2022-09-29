import {model, Schema } from 'mongoose';
const bcrypt = require("bcrypt");
import { IUser } from '../Interface/IUser';

const UserSchema = new Schema<IUser>({
    name:{ 
        type: String,
        required: true
    },
    email:{ 
        type: String,
        required: true
    },
    password:{ 
        type: String,
        required: true
    },
    role:{ 
        type: String,
        required: true
    },
})
UserSchema.pre('save', async function (next) {
    const passwordHash = await bcrypt.hash(this.password, 10);
    this.password = passwordHash
});

export default model<IUser>('User', UserSchema);