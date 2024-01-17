const express = require("express")

const registerUser =require("../controllers/userController.js")
const userRouter=express.Router()

userRouter.route("/register").post(registerUser) 

//http://localhost:8000/api/v1/users/register

module.exports=userRouter