const ApiError =require("../utils/ApiError");
const asyncHandler=require("../utils/asyncHandler");
const jwt=require("jsonwebtoken")
const User=require("../models/userModel.js")

const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
    
        if(!token){
            throw new ApiError(401,"unauthorized request")
        }
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            
            throw new ApiError(401,"invalid access token")
        }
    
        req.user=user;
        next()

    } catch (error) {
        throw new ApiError(401,error?.message||"invalid access token")
    }
})

module.exports=verifyJWT