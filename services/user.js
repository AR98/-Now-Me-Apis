import {Users} from "../models/UserModel.js";
import { ObjectId } from 'mongodb';

export const registerUser = async(obj) => {
    try{
        let data = await obj.save();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export const findUserByEmail = async(email) => {
    try{
        const user = await Users.findOne({email: email});
        return user;
    }
    catch (err) {
        return err;    
    }
}

export const getUserData = async(id) => {
    try{
        const user = await Users.findOne({_id: ObjectId(id)});
        return user;
    }
    catch (err) {
        return err;    
    }
}

