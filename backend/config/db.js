 import mongoose from "mongoose";
 const connectDb =async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL)
         console.log("DB connected")
    } catch(error){
        console.error("DB error",error.message);

    }
 }
 export default connectDb;