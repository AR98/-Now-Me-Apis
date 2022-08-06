import { Replies } from "../models/ReplyModel.js";
import { ObjectId } from 'mongodb';
import { saveReply, removeReply, getReplyById } from "../services/reply.js";

// Create Post
export const addReply = async(req,res) => {
    try{
        if (!req.body.message || !req.body.postId)
            res.status(400).json({msg: "required field missing"});

        let newPost = new Replies({
            message: req.body.message,
            postId: req.body.postId,
            authorId: req.user.id,
            isAuthorAnonymous: req.body.isAuthorAnonymous || false
        });

        let data = await saveReply(newPost);
        res.status(200).json(data);

    }
    catch (err){
        res.status(500).json({msg: err});
    }
}

// Deleting Post
export const deleteReply = async(req, res) => {
    try{
        let replyData = await getReplyById(req.params.id);
        if(replyData.authorId.toString() == req.user.id){
            
            let data = await removeReply(req.params.id);
            res.status(200).json(data);
        }
        
        res.status(403).json({msg: "You cann't delete others reply"});  
    }
    catch (err){
        res.status(500).json({msg: err});     
    }
}