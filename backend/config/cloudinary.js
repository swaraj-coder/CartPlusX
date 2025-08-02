import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const uploadOnCloudinary =async (filePath) => {
     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:  process.env.CLOUDINARY_API_SECRET 
    });
    try {
        
    if(!filePath){
        return null
    }
    const uploadResult = await cloudinary.uploader.upload(filePath)
    fs.unlinkSync(filePath)
    return uploadResult.secure_url
        
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(error)
        throw new Error("Cloudinary upload failed");
        
    }

}
export default uploadOnCloudinary