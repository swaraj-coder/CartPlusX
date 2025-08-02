import jwt from 'jsonwebtoken'


const isAuth =async (req,res,next)=>{
    try {
         let {token} =req.cookies
         console.log("token from cooke",token)
         if(!token){
            return res.status(400).json({message:"user does not token"})
         }
         let verifyToken =jwt.verify(token,process.env.JWT_SECRET)

         if(!verifyToken){
             return res.status(400).json({message:"user does not have a valid token"})
         }
         req.userId=verifyToken.userId
         next()
    } catch (error) {
         console.log("isAuth  error", error.message);
    return res.status(500).json({ message: `isAuth  error: ${error.message}` });
        
    }
}

export default isAuth

