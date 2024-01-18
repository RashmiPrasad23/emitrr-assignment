const express = require("express")
const verifyJWT=require("../middlewares/authMiddleware.js")
const{getAllQuestions} =require("../controllers/quizController.js")

const userRouter=express.Router()

userRouter.route("/getAllQuestion").get(getAllQuestions)  


module.exports=userRouter