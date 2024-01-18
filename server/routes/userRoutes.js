const express = require("express")

const {registerUser,loginUser,logoutUser,refreshAccessToken,updateLangPref} =require("../controllers/userController.js")
const verifyJWT=require("../middlewares/authMiddleware.js")

const userRouter=express.Router()

userRouter.route("/register").post(registerUser) 
//http://localhost:8000/api/v1/users/register

userRouter.route("/login").post(loginUser)

userRouter.route("/update-preference").patch(updateLangPref)


//secured routes
userRouter.route("/logout").post(verifyJWT,logoutUser)
userRouter.route("/refresh-token").post(refreshAccessToken)



module.exports=userRouter