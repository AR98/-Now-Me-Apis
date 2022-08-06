import express from "express";
import { verifyAuth } from "../auth.js";
import { addReply, deleteReply } from "../controllers/reply.js";

const router = express.Router();

router.post('/add',verifyAuth,addReply);
router.delete('/delete/:id',verifyAuth,deleteReply);


export default router;