import { Replies } from "../models/replyModel.js";
import { ObjectId } from 'mongodb';

// Saving Reply
export const saveReply = async(obj) => {
    try{
        let data = await obj.save();
        return data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

// Deleting Reply
export const removeReply = async(id) => {
    try{
        let data = await Replies.findByIdAndDelete({_id: ObjectId(id)});
        return data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

// Search Reply by id
export const getReplyById = async(id) => {
    try{
        let data = await Replies.findOne({_id:  ObjectId(id) });
        return data;
    }
    catch (err) {
        throw err;
    }
}

// Delete Reply by postId
export const deleteReplyByPostId = async(id) => {
    try{
        let data = await Replies.deleteMany({postId:  ObjectId(id) });
        return data;
    }
    catch (err) {
        throw err;
    }
}

// Delete Reply by postId
export const getRepliesByPostId = async(id) => {
    try{ console.log(id);
        let data = await Replies.find({postId:  ObjectId(id)}).lean();
        return data;
    }
    catch (err) {
        throw err;
    }
}

