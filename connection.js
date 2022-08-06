import  mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const DB = async() =>{
   await mongoose.connect(process.env.DB_CONNECTION_URL).then( data=>{
       console.log("Successfully connected with DB");
   }).catch( err => {
       console.log(err);
   })
}

export default DB;
