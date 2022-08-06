import express from "express";
import { verifyAuth} from "../auth.js";
import { addPost, deletePost, getUserPosts, getAllPosts } from "../controllers/post.js";

const router = express.Router();

router.post('/add',verifyAuth,addPost);
router.delete('/delete/:id',verifyAuth,deletePost);
router.get('/',verifyAuth,getUserPosts);
router.get('/all', getAllPosts); // posts are visible to all user


export default router;