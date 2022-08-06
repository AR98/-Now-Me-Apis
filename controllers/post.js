import { json } from "express";
import { Posts } from "../models/PostModel.js";
import { savePost, removePost, getPostById, getUserPost, getAllPost} from "../services/post.js";
import { deleteReplyByPostId, getRepliesByPostId } from "../services/reply.js";
import {getUserData} from "../services/user.js";

// Create Post
export const addPost = async(req,res) => {
    try{
        if (!req.body.title || !req.body.description)
            res.status(400).json({msg: "required field missing"});
        let userData = await getUserData(req.user.id);

        let newPost = new Posts({
            title: req.body.title,
            description: req.body.description,
            authorId: req.user.id,
            autorName: userData.name,
            isAuthorAnonymous: req.body.isAuthorAnonymous || false
        });

        let data = await savePost(newPost);
        res.status(200).json(data);

    }
    catch (err){
        res.status(500).json({msg: err});
    }
}

// Deleting Post
export const deletePost = async(req, res) => {
    try{
        let postData = await getPostById(req.params.id);
        if(postData.authorId.toString() == req.user.id){
            
            let data = await removePost(req.params.id);
            deleteReplyByPostId(req.params.id);
            res.status(200).json(data);
        }
        
        res.status(403).json({msg: "You cann't delete others post"});  
    }
    catch (err){
        res.status(500).json({msg: err});     
    }
}

// Get User all Posts
export const getUserPosts = async(req,res) => {
    try{
        let data = await getUserPost(req.user.id, req.query.page?req.query.page:1, req.query.limit?req.query.limit:2);
        if(data){
            for(let i=0;i<data.length;i++){
                // data[i].replies =[];
                if(data[i].isAuthorAnonymous){
                    data[i].authorId = "N/A";
                    data[i].name = "Anonymous";
                }
                let getAllReplyOnPost = await getRepliesByPostId(data[i]._id.toString());
                if(getAllReplyOnPost){
                    for(let j=0;j<getAllReplyOnPost.length;j++){
                        if(getAllReplyOnPost[j].isAuthorAnonymous){
                            getAllReplyOnPost[j].authorId = "N/A";
                        }
                    }

                    data[i].replies = [...getAllReplyOnPost];
                }
            }
        }

        res.status(200).json(data);

    }
    catch (err){
        res.status(500).json({msg: err});
    }
}

// Get all Posts
export const getAllPosts = async(req,res) => {
    try{
        let data = await getAllPost(req.query.page?req.query.page:1, req.query.limit?req.query.limit:2);
        if(data){
            for(let i=0;i<data.length;i++){
                data[i].replies = [];
                if(data[i].isAuthorAnonymous){
                    data[i].authorId = "N/A";
                    data[i].name = "Anonymous";
                }
                let getAllReplyOnPost = await getRepliesByPostId(data[i]._id.toString());
                console.log(getAllReplyOnPost.length);
                if(getAllReplyOnPost){
                    for(let j=0;j<getAllReplyOnPost.length;j++){
                        if(getAllReplyOnPost[j].isAuthorAnonymous){
                            getAllReplyOnPost[j].authorId = "N/A";
                        }
                    }

                    data[i].replies = [...getAllReplyOnPost];
                }
            }
        }
        res.status(200).json(data);

    }
    catch (err){
        res.status(500).json({msg: err});
    }
}
