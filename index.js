import express from "express";
import dotenv from "dotenv";
import DB from "./connection.js";
import Users from "./routes/user.js";
import Posts from "./routes/post.js";
import Reply from "./routes/reply.js";


DB();
const app = express();
dotenv.config();
app.use(express.json());

app.use('/users', Users);
app.use('/posts', Posts);
app.use('/replies', Reply);


const port = 8082;

app.listen(port, function (){
    console.log(`server is running on port ${port}`);
})