const express = require("express")
const verifyJWT=require("../middlewares/authMiddleware.js")
const{getUserDetails,putUserDetails} =require("../controllers/settingsController.js")

const userRouter=express.Router()

userRouter.route("/getUserDetails").get(getUserDetails) 
userRouter.route("/putUserDetails").patch(putUserDetails) 
 


module.exports=userRouter