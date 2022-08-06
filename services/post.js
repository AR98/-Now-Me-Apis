import {Posts} from "../models/PostModel.js";
import { ObjectId } from 'mongodb';

// Saving Post
export const savePost = async(obj) => {
    try{
        let data = await obj.save();
        return data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

// Deleting Post
export const removePost = async(id) => {
    try{console.log("cfsr");
        let data = await Posts.findByIdAndDelete({_id: ObjectId(id)});
        return data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

// Search post by id
export const getPostById = async(id) => {
    try{
        let data = await Posts.findOne({_id:  ObjectId(id) });
        return data;
    }
    catch (err) {
        throw err;
    }
}

// Get User Posts
export const getUserPost = async(id, page, limit) => {
    try{
        let data = await Posts.find({authorId:  ObjectId(id) }).sort({_id: -1}).skip(Number(limit*(page-1))).limit(limit).lean();
        return data;
    }
    catch (err) {
        throw err;
    }
}

// Get All Posts
export const getAllPost = async(page, limit) => {
    try{
        let data = await Posts.find({}).sort({_id: -1}).skip(Number(limit*(page-1))).limit(limit).lean();
        return data;
    }
    catch (err) {
        throw err;
    }
}