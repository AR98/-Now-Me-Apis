import express from "express";
import { verifyAuth } from "../auth.js";
import {register, login} from "../controllers/user.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


export default router;