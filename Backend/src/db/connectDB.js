import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

 
const connectDB = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log("MongoDb Connected")
    } 
    catch(err){
        console.log("Mongodb connection error" , err)
        process.exit(1);
    }
}

export default connectDB  